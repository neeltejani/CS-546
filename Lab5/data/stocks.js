const axios = require("axios");

async function getstocks() {
    let { data } = await axios.get(
        "https://gist.githubusercontent.com/graffixnyc/8c363d85e61863ac044097c0d199dbcc/raw/7d79752a9342ac97e4953bce23db0388a39642bf/stocks.json"
    );
    return data;
}

async function getStockById(id) {
    let count = 0;
    let data2 = await getstocks();
    for (let i = 0; i < data2.length; i++) {
        if (data2[i].id == id) {
            count++;
            a = data2[i];
        }
    }
    if (count == 0) throw "there is no stock with that ID";
    return a;
}
module.exports = {
    getstocks,
    getStockById,
};
