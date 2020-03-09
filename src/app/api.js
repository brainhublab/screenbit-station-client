;
require('dotenv').config();

let station_url = process.env.MEDIA_URL;
let mac_addr = process.env.MAC_ADDR;

function getHourProgram() {
    let xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", station_url + mac_addr + "&hour=" + new Date().getHours(), false); // false for synchronous request
    xmlHttp.send(null);
    let response = xmlHttp;
    if (response.status != '200' && response.status != '304') {
        return JSON.parse(null);
    }
    return JSON.parse(response.responseText);
}

exports.getHourProgram = getHourProgram;