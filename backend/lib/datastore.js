import fs from 'fs';
import regeneratorRuntime from "regenerator-runtime"
const dataFolder = "./data/COVID-19/csse_covid_19_data/csse_covid_19_time_series";
const parse = require('csv-parse');
var datastore = {};

const processFile = async() => {
    let records = [];
    console.log(`${dataFolder}/time_series_covid19_confirmed_global.csv`);
    var parser = fs.createReadStream(`${dataFolder}/time_series_covid19_confirmed_global.csv`)
    .pipe(parse({
        columns: true,
        cast: true
    }));
    parser.on('readable', function () {
        let record;
        while (record = parser.read()) {
            console.log(record);
            records.push(record);
        }
    });
    // await finished(parser);
    return records;
}

const records = processFile();
console.info(records);

export default datastore;