import fs from 'fs';
import regeneratorRuntime from "regenerator-runtime"
import { setTimeout } from 'timers';
const DATA_FOLDER = "./data/COVID-19/csse_covid_19_data/csse_covid_19_time_series";
const JHU_URL_PREFIX = "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/";
const BEGIN_DATE_STR = '1/22/20';
const parse = require('csv-parse/lib/sync');
const axios = require('axios');
// https://csv.js.org/parse/api/sync/
// https://raw.githubusercontent.com/owid/covid-19-data/master/public/data/vaccinations/vaccinations.csv
const SAMPLE_FILTER = {
    'Province/State': '',
    'Country/Region': 'Zambia',
    Lat: -13.133897,
    Long: 27.849332};
var all_data_cache = {};
var all_data = {};

async function readFileDataSync(filename, key) {
    // let file_buffer = fs.readFileSync(`${DATA_FOLDER}/${filename}`);
    let file_response = await axios.get(`${JHU_URL_PREFIX}${filename}`);
    console.log("type: " + typeof(file_response.data));
    let file_buffer = Buffer.from(file_response.data);
    return parseJHURecord(file_buffer, key);
};

function parseJHURecord(file_buffer, key) {
    let records = parse(file_buffer, {
        columns: true,
        skip_empty_lines: true
      })
    for(var record of records) {
        let country = record['Country/Region'];
        let region = record['Province/State'];
        // we only take the country data, skip those special region.
        if (Boolean(region.trim())) {
            continue;
        }
        if ( !(country in all_data_cache)) {
            all_data_cache[country] = {};
        }
        for (const property in record) {
            if (property in SAMPLE_FILTER) {
                continue;
            }
            let date = property;
            if(!(date in all_data_cache[country])) {
                all_data_cache[country][date] = {};
            }
            all_data_cache[country][date][key] = Number.parseInt(record[date]);
        }
    }
}

// TODO: move this to another file
/**
 * 
 * @param {string} input the input string
 * @returns {string} a corresponding string used as a part of RESTful API URL
 */
function getFormalAPICategory(input) {
    return input.trim().toLowerCase().replaceAll(' ', '_');
}

function convertFromDictToList() {
    for (let country in all_data_cache) {
        let new_list = [];
        let curr_date_str = BEGIN_DATE_STR;
        while(all_data_cache[country][curr_date_str]) {
            all_data_cache[country][curr_date_str]['date_str'] = curr_date_str;
            new_list.push(all_data_cache[country][curr_date_str]);
            curr_date_str = getDateWithOffset(curr_date_str, 1);
        }
        all_data_cache[getFormalAPICategory(country)] = new_list;
        delete all_data_cache[country];
    }
}

/**
 * 
 * @param {string} date A string representing date in m/d/y-in-short format.
 *                 e.g. 10/7/20
 * @param {number} offset Offset(by date) of the date you want to assign.
 *        e.g. you can provide -1 to get the value of one day before the given date
 * @returns {string} return a calculated date by date + offset(days) in m/d/y-in-short format.
 *          e.g. 10/6/20
 */
function getDateWithOffset(date, offset) {
    // Format: Month/Date/YearInShort
    // e.g. 10/7/20
    let base_date_fields = date.split('/');
    let base_date = new Date(`20${base_date_fields[2]}-${base_date_fields[0]}-${base_date_fields[1]}`);
    let new_date = new Date(base_date.getTime() + offset * 86400 * 1000);
    let new_date_str = `${new_date.getMonth() + 1}/${new_date.getDate()}/${new_date.getFullYear() - 2000}`;
    return new_date_str;
}

function fillDailyData() {
    for(let country in all_data_cache) {
        for (var i = 0; i < all_data_cache[country].length; i++) {
            var yesterday_data = {
                'confirmed_total': 0,
                'deaths_total': 0,
                'recovered_total': 0
            }
            if (i > 0) {
                yesterday_data = all_data_cache[country][i-1];
            }
            all_data_cache[country][i]['confirmed_daily'] = all_data_cache[country][i]['confirmed_total'] - yesterday_data['confirmed_total'];
            all_data_cache[country][i]['deaths_daily'] = all_data_cache[country][i]['deaths_total'] - yesterday_data['deaths_total'];
            all_data_cache[country][i]['recovered_daily'] = all_data_cache[country][i]['recovered_total'] - yesterday_data['recovered_total'];
        }
    }
}

async function updateAllData() {
    await readFileDataSync('time_series_covid19_confirmed_global.csv', 'confirmed_total');
    await readFileDataSync('time_series_covid19_deaths_global.csv', 'deaths_total');
    await readFileDataSync('time_series_covid19_recovered_global.csv', 'recovered_total');
    convertFromDictToList();
    fillDailyData();
    // OK, normalize name from JHU
    all_data_cache['taiwan'] = all_data_cache['taiwan*'];
    delete all_data_cache['taiwan*'];
    const TAIWAN = 'taiwan';
    console.log(all_data_cache[TAIWAN]);



    all_data = all_data_cache;
    all_data_cache = {};

    setTimeout(updateAllData, 1000 * 60);
}

updateAllData();

export default all_data;