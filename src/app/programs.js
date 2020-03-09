;
const api = require('./api');

function generateDefaultProgram() {
    let result = {};
    for (let i = 0; i < 5; i++) {
        result[i] = {
            "ad_id": i,
            "url": `assets/default${i}.jpg`,
            "type": "IM",
            "duration": 5
        }
    }
    return result;
}

function get_program_or_default() {
    let currentHourData = generateDefaultProgram();
    try {
        let program = api.getHourProgram();
        if (program != null) {
            let busyHour = program[new Date().getHours()];
            if (typeof busyHour != "undefined") {
                currentHourData = busyHour;
            }
            return currentHourData
        }
    } catch (e) {
        console.log(e);
        return currentHourData;
    }
}


exports.get_program = get_program_or_default;