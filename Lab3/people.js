const axios = require("axios");

async function getPeople() {
    let { data } = await axios.get(
        "https://gist.githubusercontent.com/graffixnyc/a1196cbf008e85a8e808dc60d4db7261/raw/9fd0d1a4d7846b19e52ab3551339c5b0b37cac71/people.json"
    );
    return data;
}

function trimmer(month, day) {
    if (
        month.toString().trim().length == 0 ||
        day.toString().trim().length == 0
    ) {
        throw "Parameter is empty";
    }
}
function isIddefineornot(id) {
    if (id == undefined) {
        throw "Parameter is Undefined";
    }
    if (typeof id != "string") {
        throw "Enter Proper type";
    }
}
function isIdnull(id) {
    if (id.trim().length == 0) {
        throw "Parameter is empty";
    }
}
function checkingproperId(count) {
    if (count == 0) {
        throw "Person not found";
    }
}
function parsing(month, day) {
    if (month == undefined || day == undefined) {
        throw "parameter is undefined";
    }
    if (parseInt(month) == NaN || parseInt(day) == NaN) {
        throw "Type is invalid";
    }
}

function monthanddate(month, day) {
    if (month < 12 || month > 1 || day < 31 || day > 1) {
        if (month == 1 && day > 31) {
            throw "In January there is only 31 days.";
        } else if (month == 2 && day > 28) {
            throw "In February there is only 28 days.";
        } else if (month == 3 && day > 31) {
            throw "In March there is only 31 days.";
        } else if (month == 4 && day > 30) {
            throw "In April there is only 30 days.";
        } else if (month == 5 && day > 31) {
            throw "In May there is only 31 days.";
        } else if (month == 6 && day > 30) {
            throw "In June there is only 30 days.";
        } else if (month == 7 && day > 31) {
            throw "In July there is only 31 days.";
        } else if (month == 8 && day > 31) {
            throw "In August there is only 31 days.";
        } else if (month == 9 && day > 30) {
            throw "In September there is only 30 days.";
        } else if (month == 10 && day > 31) {
            throw "In October there is only 31 days.";
        } else if (month == 11 && day > 30) {
            throw "In November there is only 30 days.";
        } else if (month == 12 && day > 31) {
            throw "In December there is only 31 days.";
        }
    }
}
async function getPersonById(id) {
    isIddefineornot(id);
    isIdnull(id);
    let a;
    let count = 0;
    // checkingproperId(id);
    let data = await getPeople();

    for (i = 0; i < data.length; i++) {
        if (data[i].id === id) {
            //checkingproperId(data);
            a = data[i];
            count++;
        }
    }
    checkingproperId(count);
    return a;
}

async function sameStreet(streetName, streetSuffix) {
    isIddefineornot(streetName);
    isIddefineornot(streetSuffix);
    isIdnull(streetName);
    isIdnull(streetSuffix);
    count = 0;
    let data = await getPeople();
    let a = [];

    for (let i = 0; i < data.length; i++) {
        if (
            (data[i].address.home.street_name.toUpperCase() ==
                streetName.toUpperCase() &&
                data[i].address.home.street_suffix.toUpperCase() ==
                    streetSuffix.toUpperCase()) ||
            (data[i].address.work.street_name.toUpperCase() ==
                streetName.toUpperCase() &&
                data[i].address.work.street_suffix.toUpperCase() ==
                    streetSuffix.toUpperCase())
        ) {
            a.push(data[i]);
            count++;
        }
    }

    if (count < 2) {
        throw `since there are not at least two people that live or work on ${streetName} ${streetSuffix}
        `;
    }
    return a;
}
async function manipulateSsn() {
    let a = {};
    let b = {};
    let c = {};
    sum = 0;
    count = 0;
    max = 0;
    min = Number.MAX_VALUE;
    let data = await getPeople();
    for (let i = 0; i < data.length; i++) {
        for (let key in data[i]) {
            if (key == "ssn") {
                let ssN = data[i][key].replace("-", "");
                let finalSsn = ssN.replace("-", "");
                let ssn = finalSsn.split("");
                let aaa = parseInt(ssn.sort().join(""));
                if (aaa > max) {
                    max = aaa;
                }

                if (max == aaa) {
                    a.first_name = data[i].first_name;
                    a.last_name = data[i].last_name;
                }
                if (aaa < min) {
                    min = aaa;
                }
                if (min == aaa) {
                    b.first_name = data[i].first_name;
                    b.last_name = data[i].last_name;
                }
                sum = sum + aaa;
            }
        }
        count++;
    }
    let average = Math.floor(sum / count);
    c.highest = a;
    c.lowest = b;
    c.average = average;
    return c;
}

async function sameBirthday(month, day) {
    monthanddate(month, day);
    parsing(month, day);
    trimmer(month, day);
    let a = [];
    let data = await getPeople();

    for (let i = 0; i < data.length; i++) {
        let firstdateObj = new Date(data[i].date_of_birth);
        let firstmonthObj = new Date(data[i].date_of_birth);

        if (
            firstdateObj.getMonth() + 1 == month &&
            firstmonthObj.getDate() == day
        ) {
            a.push(`${data[i].first_name} ${data[i].last_name}`);
        }
    }
    return a;
}
module.exports = {
    getPeople,
    getPersonById,
    sameStreet,
    manipulateSsn,
    sameBirthday,
};
