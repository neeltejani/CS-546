const dbConnection = require("./config/mongoConnection");
const restaurants = require("./data/restaurants");
const connection = require("./config/mongoConnection");

const main = async () => {
    const deplaLaunge = await restaurants.create(
        "the depla launge",
        "depla , jesar",
        "123-456-7890",
        "http://www.depla.com",
        "$$$$",
        ["neel", "Italian"],

        { dineIn: true, takeOut: true, delivery: false }
    );
    const jesarLaunge = await restaurants.create(
        "the Jesar launge",
        "jesar , dhandhuka",
        "201-884-4201",
        "http://www.jesar.com",
        "$$$",
        ["kenil", "lasbian"],
        { dineIn: false, takeOut: true, delivery: false }
    );
    console.log(jesarLaunge);

    const allResturants = await restaurants.getAll();
    console.log(allResturants);

    const baapLaunge = await restaurants.create(
        "the baap launge",
        "surat , navsari",
        "486-123-8581",
        "http://www.baapoo.com",
        "$",
        ["trident", "indian"],
        { dineIn: true, takeOut: false, delivery: true }
    );
    console.log(baapLaunge);

    try {
        const a = await restaurants.rename(
            deplaLaunge._id.toString(),
            "http://www.neellllll.com"
        );
        console.log(a);
    } catch (e) {
        console.log(e);
    }

    try {
        const a = await restaurants.remove(jesarLaunge._id.toString());
        console.log(a);
        const allResturants1 = await restaurants.getAll();
        console.log(allResturants1);
        // console.log(jesarLaunge._id.toString());
    } catch (e) {
        console.log(e);
    }

    try {
        const deplaLaunge = await restaurants.create(
            "the depla launge",
            "depla , jesar",
            "123-456-7890",
            "http://www.depla",
            "$$$$",
            ["neel", "Italian"],
            3,
            { dineIn: true, takeOut: true, delivery: false }
        );
        console.log(deplaLaunge);
    } catch (e) {
        console.log(e);
    }

    try {
        const a = await restaurants.remove("615c8c4d300c274dfebcb973");
        console.log(a);
        const allResturants1 = await restaurants.getAll();
        console.log(allResturants1);
        // console.log(jesarLaunge._id.toString());
    } catch (e) {
        console.log(e);
    }

    try {
        const a = await restaurants.update(
            "617a1c839b209d07d8308c38",
            "the vaghri launge",
            "kskksk , notntt",
            "123-542-9302",
            "http://www.kethhy.com",
            "$$$",
            ["nbenr", "frfw"],
            { dineIn: true, takeOut: false, delivery: true }
        );
        console.log(a);
    } catch (e) {
        console.log(e);
    }

    
    try {
        const a = await restaurants.get("615c8c4d300c374dfebcb972");
        console.log(a);
    } catch (e) {
        console.log(e);
    }

    const db = await connection();
    await db.serverConfig.close();
};
main();
