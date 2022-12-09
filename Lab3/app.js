const people = require("./people");
const stocks = require("./stocks");
async function main() {
    try {
        let peopledata = await people.getPersonById(1);

        console.dir(peopledata, { depth: null });
    } catch (e) {
        console.log(e);
    }
    console.log("////////////////////////////////////////////////////////");
    try {
        let peopledata = await people.sameStreet("Crownhardt", "Park");

        console.dir(peopledata, { depth: null });
    } catch (e) {
        console.log(e);
    }
    console.log("///////////////////////////////////////////////////");
    try {
        let peopledata = await people.manipulateSsn();

        console.dir(peopledata, { depth: null });
    } catch (e) {
        console.log(e);
    }
    console.log("////////////////////////////////////////////////////////");
    try {
        let peopledata = await people.sameBirthday(" ", "   ");

        console.dir(peopledata, { depth: null });
    } catch (e) {
        console.log(e);
    }
    console.log("////////////////////////////////////////////////////////");
    try {
        //let peopledata = await people.sameBirthday("   ", "1");
        let stocksdata = await stocks.listShareholders();
        console.dir(stocksdata, { depth: null });
    } catch (e) {
        console.log(e);
    }
    console.log("////////////////////////////////////////////////////////");
    try {
        let stocksdata = await stocks.topShareholder();
        console.dir(stocksdata, { depth: null });
    } catch (e) {
        console.log(e);
    }
    console.log("////////////////////////////////////////////////////////");
    try {
        let stocksdata = await stocks.listStocks("Grenville", "Pawelke");
        console.dir(stocksdata, { depth: null });
    } catch (e) {
        console.log(e);
    }
    console.log("////////////////////////////////////////////////////////");
    try {
        let stocksdata = await stocks.getStockById(
            "f652f797-7ca0-4382-befb-2ab8be914ff0"
        );
        console.dir(stocksdata, { depth: null });
    } catch (e) {
        console.log(e);
    }
    console.log("////////////////////////////////////////////////////////");
}
main();
