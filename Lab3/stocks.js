const axios = require("axios");

function checkTypeofstockname(stockname) {
    if (typeof stockname != "string") {
        throw "Type is invalid";
    }
}
function emptyspaces(stockname) {
    if (stockname.trim().length == 0) {
        throw "Empty spaces";
    }
}
function foundStockname(count) {
    if (count == 0) {
        throw "stock not found";
    }
}
function fut(aa) {
    if (aa.length == 0) {
        throw "Data Not Found";
    }
    if (aa.length < 1) {
        throw " not for atleast 1 company";
    }
}
function definedornot(stockname) {
    if (stockname == undefined) {
        throw "Enter any Parameter";
    }
}
async function getPeople() {
    let { data } = await axios.get(
        "https://gist.githubusercontent.com/graffixnyc/a1196cbf008e85a8e808dc60d4db7261/raw/9fd0d1a4d7846b19e52ab3551339c5b0b37cac71/people.json"
    );
    return data;
}

async function getstocks() {
    let { data } = await axios.get(
        "https://gist.githubusercontent.com/graffixnyc/8c363d85e61863ac044097c0d199dbcc/raw/7d79752a9342ac97e4953bce23db0388a39642bf/stocks.json"
    );
    return data;
}

async function listShareholders() {
    if (arguments.length == 0) {
        let data1 = await getPeople();
        let data2 = await getstocks();
        for (let i = 0; i < data2.length; i++) {
            for (let j = 0; j < data2[i].shareholders.length; j++) {
                for (let k = 0; k < data1.length; k++) {
                    if (data2[i].shareholders[j].userId == data1[k].id) {
                        delete data2[i].shareholders[j].userId;
                        data2[i].shareholders[j].first_name =
                            data1[k].first_name;
                        data2[i].shareholders[j].last_name = data1[k].last_name;
                    }
                }
            }
        }
        return data2;
    }
    throw "Don't Pass any parameter";
}
async function topShareholder(stockname) {
    definedornot(stockname);
    checkTypeofstockname(stockname);
    emptyspaces(stockname);

    let data1 = await getPeople();
    let data2 = await getstocks();
    let max = 0;
    let min;
    let count = 0;
    for (let i = 0; i < data2.length; i++) {
        for (let j = 0; j < data1.length; j++) {
            if (data2[i].stock_name == stockname) {
                count++;
                for (let k = 0; k < data2[i].shareholders.length; k++) {
                    if (data2[i].shareholders[k].number_of_shares > max) {
                        max = data2[i].shareholders[k].number_of_shares;
                        min = data2[i].shareholders[k].userId;
                    }
                }
            }
            if (data1[j].id == min) {
                firstn = data1[j].first_name;
                lastn = data1[j].last_name;
            }
        }
    }

    if (count == 0) {
        throw "No Stock With This Name";
    }
    if (max == 0) {
        throw `${stockname} currently has no shareholders`;
    } else {
        return `With ${max} shares in ${stockname} , ${firstn} ${lastn} is top Shareholder`;
    }
}
async function listStocks(firstname, lastname) {
    definedornot(firstname);
    definedornot(lastname);
    checkTypeofstockname(firstname);
    checkTypeofstockname(lastname);
    emptyspaces(firstname);
    emptyspaces(lastname);

    let aa = [];
    let data1 = await getPeople();
    let data2 = await getstocks();
    for (let i = 0; i < data1.length; i++) {
        if (data1[i].first_name == firstname && data1[i].last_name == lastname)
            for (let j = 0; j < data2.length; j++) {
                {
                    for (let k = 0; k < data2[j].shareholders.length; k++) {
                        if (data2[j].shareholders[k].userId == data1[i].id) {
                            let a = {};

                            a.stock_name = data2[j].stock_name;
                            a.number_of_shares =
                                data2[j].shareholders[k].number_of_shares;
                            aa.push(a);
                        }
                    }
                }
            }
    }
    fut(aa);
    return aa;
}

async function getStockById(id) {
    definedornot(id);
    emptyspaces(id);
    let count = 0;
    checkTypeofstockname(id);
    let data2 = await getstocks();
    for (let i = 0; i < data2.length; i++) {
        if (data2[i].id == id) {
            count++;
            a = data2[i];
        }
    }
    foundStockname(count);
    return a;
}
module.exports = {
    getstocks,
    listShareholders,
    topShareholder,
    listStocks,
    getStockById,
};
