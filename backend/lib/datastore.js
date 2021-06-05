import fs from 'fs';
import regeneratorRuntime from "regenerator-runtime"
const dataFolder = "./data/COVID-19/csse_covid_19_data/csse_covid_19_time_series";
const parse = require('csv-parse/lib/sync')
// https://csv.js.org/parse/api/sync/
const sampleFilter = {
    'Province/State': '',
    'Country/Region': 'Zambia',
    Lat: -13.133897,
    Long: 27.849332};
var alldata = {};

function readFileDataSync(filename, key) {
    let file_buffer = fs.readFileSync(`${dataFolder}/${filename}`);
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
        if ( !(country in alldata)) {
            alldata[country] = {};
        }
        for (const property in record) {
            if (property in sampleFilter) {
                continue;
            }
            let date = property;
            if(!(date in alldata[country])) {
                alldata[country][date] = {};
            }
            alldata[country][date][key] = Number.parseInt(record[date]);
        }
    }

};
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
    for(let country in alldata) {
        for(let key in alldata[country]) {
            // Format: Month/Date/YearInShort
            // e.g. 10/7/20
            let yesterday_str = getDateWithOffset(key, -1);
            var yesterday_data = {
                'confirmed_total': 0,
                'deaths_total': 0,
                'recovered_total': 0
            };
            if(yesterday_str in alldata[country]) {
                yesterday_data = alldata[country][yesterday_str];
            }
            alldata[country][key]['confirmed_daily'] = alldata[country][key]['confirmed_total'] - yesterday_data['confirmed_total'];
            alldata[country][key]['deaths_daily'] = alldata[country][key]['deaths_total'] - yesterday_data['deaths_total'];
            alldata[country][key]['recovered_daily'] = alldata[country][key]['recovered_total'] - yesterday_data['recovered_total'];
        }
    }
}

readFileDataSync('time_series_covid19_confirmed_global.csv', 'confirmed_total');
readFileDataSync('time_series_covid19_deaths_global.csv', 'deaths_total');
readFileDataSync('time_series_covid19_recovered_global.csv', 'recovered_total');

fillDailyData();
// OK, normalize name
alldata['Taiwan'] = alldata['Taiwan*'];
delete alldata['Taiwan*'];
const TAIWAN = 'Taiwan';
export default alldata;