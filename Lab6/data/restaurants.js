const mongoCollections = require("../config/mongoCollections");
const restaurants = mongoCollections.restaurants;
let { ObjectId } = require("mongodb");
var phoneno = /\d{3}[-]\d{3}[-]\d{4}$/g;
var web = /^(http:\/\/www.)[A-Za-z0-9]{5,}(.com)$/g;
var prizqq = /^[$]{1,4}$/g;

const remove = async (id) => {
    try {
        id1 = ObjectId(id);
    } catch (e) {
        throw "id format wrong";
    }
    if (!id) throw "You must provide an id to search for";
    if (typeof id != "string" || id.trim().length == 0)
        throw "the id provided is not a string or is an  empty string";
    const restCollection = await restaurants();
    const restaurant11 = await restCollection.findOne({ _id: id1 });
    if (restaurant11 === null) throw "No Restaurent Found for this ID";
    const restaurants2 = await restCollection.deleteOne({ _id: id1 });
    restaurant11._id = restaurant11._id.toString();
    return `${restaurant11.name} has been successfully removed`;
};
const getAll = async () => {
    let finallist = [];
    const restCollection = await restaurants();
    const restList = await restCollection.find({}).toArray();
    // console.log(typeof restList);

    for (let i = 0; i < restList.length; i++) {
        let idndnamelist = {};
        restList[i]._id = restList[i]._id.toString();
        idndnamelist["_id"] = restList[i]._id;
        idndnamelist["name"] = restList[i].name;
        finallist.push(idndnamelist);
    }

    return finallist;
};

const get = async (id) => {
    try {
        id1 = ObjectId(id);
    } catch (e) {
        throw "id format wrong";
    }
    if (!id) throw "You must provide an id to search for";
    if (typeof id != "string" || id.trim().length == 0)
        throw "the id provided is not a string or is an  empty string";
    const restCollection = await restaurants();
    const restaurants1 = await restCollection.findOne({ _id: id1 });
    
    return restaurants1;
};
const create = async (
    name,
    location,
    phoneNumber,
    website,
    priceRange,
    cuisines,
    serviceOptions
) => {
    if (
        !name ||
        !location ||
        !phoneNumber ||
        !website ||
        !priceRange ||
        !cuisines ||
        !serviceOptions
    ) {
        throw "All fields need to have valid values";
    }

    if (
        typeof name != "string" ||
        typeof location != "string" ||
        typeof phoneNumber != "string" ||
        typeof website != "string" ||
        typeof priceRange != "string" ||
        name.trim().length == 0 ||
        location.trim().length == 0 ||
        phoneNumber.trim().length == 0 ||
        website.trim().length == 0 ||
        priceRange.trim().length == 0
    ) {
        throw "parameters are not strings or are empty strings,";
    }

    if (!phoneNumber.match(phoneno)) {
        throw "not valid format of phone number";
    }

    if (!website.match(web)) {
        throw "not valid Website";
    }

    if (!priceRange.match(prizqq)) {
        throw "invalid PriceRange";
    }

    if (!Array.isArray(cuisines)) {
        throw "Not an Array";
    } else if (cuisines.length == 0) {
        throw "Its empty";
    } else {
        for (let i = 0; i < cuisines.length; i++) {
            if (
                typeof cuisines[i] != "string" ||
                cuisines[i].trim().length == 0
            ) {
                throw " it does have at least one element in it that is not a valid";
            }
        }
    }

    if (typeof serviceOptions != "object" || Array.isArray(serviceOptions)) {
        throw " serviceOptions is not a object";
    }

    for (let key in serviceOptions) {
        if (typeof serviceOptions[key] != "boolean") {
            throw " Not a boolean";
        } else if (
            !serviceOptions.hasOwnProperty("dineIn") ||
            !serviceOptions.hasOwnProperty("takeOut") ||
            !serviceOptions.hasOwnProperty("delivery")
        ) {
            throw "problem in serviceOptions parameter";
        }
    }
    const restCollection = await restaurants();

    let newres = {
        name: name,
        location: location,
        phoneNumber: phoneNumber,
        website: website,
        priceRange: priceRange,
        cuisines: cuisines,
        overallRating: 0,
        serviceOptions: serviceOptions,
        reviews: [],
    };

    const insertInfo = await restCollection.insertOne(newres);

    const newId = insertInfo.insertedId;

    const restaurant3 = await get(newId.toString());

    return restaurant3;
};
const update = async (
    id,
    name,
    location,
    phoneNumber,
    website,
    priceRange,
    cuisines,
    //  overallRating,
    serviceOptions
    // reviews
) => {
    try {
        id1 = ObjectId(id);
    } catch (e) {
        throw "id format wrong";
    }
    if (!id) throw "You must provide an id to search for";
    // if (typeof id != "string" || id.trim().length == 0)
    //     throw "the id provided is not a string or is an  empty string";
    if (!name) throw "You must provide a name";
    if (!location) throw "You must provide a location";
    if (!phoneNumber) throw "You must provide a phonenumber";
    if (!website) throw "You must provide a website";
    if (!priceRange) throw "You must provide a pricerange";
    if (!cuisines) throw "You must provide a cuisines";
    if (!serviceOptions) throw "You must provide a service provider";
    // if (typeof newwebsite != "string" || newwebsite.trim().length == 0)
    //     throw "the website provided is not a string or is an  empty string";
    // if (!newwebsite.match(web)) {
    //     throw " Website format is not valid";
    // }
    if (
        typeof name != "string" ||
        typeof location != "string" ||
        typeof phoneNumber != "string" ||
        typeof website != "string" ||
        typeof priceRange != "string" ||
        name.trim().length == 0 ||
        location.trim().length == 0 ||
        phoneNumber.trim().length == 0 ||
        website.trim().length == 0 ||
        priceRange.trim().length == 0
    ) {
        throw "parameters are not strings or are empty strings,";
    }

    if (!phoneNumber.match(phoneno)) {
        throw "not valid format of phone number";
    }

    if (!website.match(web)) {
        throw "not valid Website";
    }

    if (!priceRange.match(prizqq)) {
        throw "invalid PriceRange";
    }

    if (!Array.isArray(cuisines)) {
        throw "Not an Array";
    } else if (cuisines.length == 0) {
        throw "Its empty";
    } else {
        for (let i = 0; i < cuisines.length; i++) {
            if (
                typeof cuisines[i] != "string" ||
                cuisines[i].trim().length == 0
            ) {
                throw " it does have at least one element in it that is not a valid";
            }
        }
    }

    if (typeof serviceOptions != "object" || Array.isArray(serviceOptions)) {
        throw " serviceOptions is not a object";
    }

    for (let key in serviceOptions) {
        if (typeof serviceOptions[key] != "boolean") {
            throw " Not a boolean";
        } else if (
            !serviceOptions.hasOwnProperty("dineIn") ||
            !serviceOptions.hasOwnProperty("takeOut") ||
            !serviceOptions.hasOwnProperty("delivery")
        ) {
            throw "problem in serviceOptions parameter";
        }
    }
    // for (let i = 0; i < serviceOptions.length; i++) {
    //     if (typeof serviceOptions[i] != "boolean" ) {
    //         // if (
    //         //     typeof serviceOptions.dineIn != "boolean" ||
    //         //     typeof serviceOptions.takeOut != "boolean" ||
    //         //     typeof serviceOptions.delivery != "boolean"
    //         // )
    //         throw " Not A Boolean";
    //     }
    // }
    const restCollection = await restaurants();

    const updatedrest = {
        name: name,
        location: location,
        phoneNumber: phoneNumber,
        website: website,
        priceRange: priceRange,
        cuisines: cuisines,
        //  overallRating : overallRating,
        serviceOptions: serviceOptions,
        reviews: [],
    };
    await restCollection.updateOne(
        { _id: ObjectId(id) },
        { $set: updatedrest }
    );
    return await get(id);
    // const restaurant1111 = await restCollection.findOne({ _id: id1 });
    // restaurant1111._id = restaurant1111._id.toString();
    // if (updatedInfo == null)
    //     throw "Restaurent is not exist so it can not be updated";
    // return restaurant1111;
};
module.exports = {
    create,
    getAll,
    get,
    remove,
    update,
};
