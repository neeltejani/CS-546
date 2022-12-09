const axios = require("axios");

async function getPeople() {
    let { data } = await axios.get(
        "https://gist.githubusercontent.com/graffixnyc/a1196cbf008e85a8e808dc60d4db7261/raw/9fd0d1a4d7846b19e52ab3551339c5b0b37cac71/people.json"
    );
    return data;
}
async function getPersonById(id) {
    let a;
    let data = await getPeople();
    let count = 0;
    for (i = 0; i < data.length; i++) {
        if (data[i].id === id) {
            a = data[i];
            count++;
        }
    }
    if (count == 0) throw "there is no person with that ID";
    return a;
}

module.exports = {
    getPeople,
    getPersonById,
};
