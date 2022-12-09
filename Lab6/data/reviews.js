const mongoCollections = require("../config/mongoCollections");
const restaurants = mongoCollections.restaurants;
let { ObjectId } = require("mongodb");

const create = async (
    restaurantId,
    title,
    reviewer,
    rating,
    dateOfReview,
    review
) => {
    //  let restaurantscount = 0;
    if (
        !restaurantId ||
        !title ||
        !reviewer ||
        !rating ||
        !dateOfReview ||
        !review
    ) {
        throw "All fields need to have valid values";
    }

    if (
        typeof restaurantId != "string" ||
        typeof title != "string" ||
        typeof reviewer != "string" ||
        typeof rating != "number" ||
        typeof dateOfReview != "string" ||
        typeof review != "string" ||
        restaurantId.trim().length == 0 ||
        title.trim().length == 0 ||
        reviewer.trim().length == 0 ||
        dateOfReview.trim().length == 0 ||
        review.trim().length == 0
    ) {
        throw "parameters are not strings or are empty strings,";
    }

    if (rating < 1 || rating > 5) {
        throw "not valid rating";
    }

    // if (!Array.isArray(cuisines)) {
    //     throw "Not an Array";
    // } else if (cuisines.length == 0) {
    //     throw "Its empty";
    // } else {
    //     for (let i = 0; i < cuisines.length; i++) {
    //         if (
    //             typeof cuisines[i] != "string" ||
    //             cuisines[i].trim().length == 0
    //         ) {
    //             throw " it does have at least one element in it that is not a valid";
    //         }
    //     }
    // }

    // try {
    id1 = ObjectId(restaurantId);
    // } catch (e) {
    //     throw "Invalid Id Type";
    // }
    const restCollection = await restaurants();

    const newreview = {
        _id: ObjectId(),
        title: title,
        reviewer: reviewer,
        rating: rating,
        dateOfReview: dateOfReview,
        review: review,
    };
    const uprest = await restCollection.updateOne(
        { _id: id1 },
        { $push: { reviews: newreview } }
    );
    // if (restaurantscount == 0) throw "Restaurant with this id doesnt exist .";
    const restaurants1 = await restCollection.findOne({
        _id: id1,
    });
    let sum = 0;
    let avg;
    for (let i = 0; i < restaurants1.reviews.length; i++) {
        sum = sum + restaurants1.reviews[i].rating;
    }
    avg = sum / restaurants1.reviews.length;
    // const rest1 = await restaurants1.updateOne(
    //     { _id: id1 },
    //     { $set: { overallRating: avg } }
    // );
    const updatedRest = await restCollection.updateOne(
        { _id: id1 },
        { $set: { overallRating: avg } }
    );
    // await restCollection.updateOne(
    //     { _id: id1 },
    //     { $set: { overallRating: avg } }
    // );
    const restaurant = await restCollection.findOne({
        _id: id1,
    });
    return restaurant;
    // console.log(avg);
    // return rest1;

    // const restaurants1 = await restCollection.findOne({ _id: id1 });

    // const insertInfo = await reviewCollection.insertOne(newreview);

    // const newId = insertInfo.insertedId;

    // const restaurant3 = await get(newId.toString());
};

const getAll = async (restaurantId) => {
    if (!restaurantId) {
        throw "id need to have valid values";
    }
    if (typeof restaurantId != "string" || restaurantId.trim().length == 0) {
        throw "id is not string or is empty string,";
    }
    try {
        id1 = ObjectId(restaurantId);
    } catch (e) {
        throw "id format wrong";
    }
    //let finallist = [];
    const restCollection = await restaurants();
    const restList = await restCollection.find({}).toArray();
    // console.log(typeof restList);
    const restaurants1 = await restCollection.findOne({
        _id: ObjectId(id1),
    });
    if (restaurants1 == null)
        throw "Restaurant not exist with that restaurantId";
    return restaurants1.reviews;
    // for (let i = 0; i < restList.length; i++) {
    //     let idndnamelist = {};
    //     restList[i]._id = restList[i]._id.toString();
    //     idndnamelist["_id"] = restList[i]._id;
    //     idndnamelist["name"] = restList[i].name;
    //     finallist.push(idndnamelist);
    // }

    //  return restList;
};
const get = async (reviewId) => {
    if (!reviewId) {
        throw "id need to have valid values";
    }
    if (typeof reviewId != "string" || reviewId.trim().length == 0) {
        throw "id is not string or is empty string,";
    }
    try {
        id1 = ObjectId(reviewId);
    } catch (e) {
        throw "id format wrong";
    }
    // if (!id) throw "You must provide an id to search for";
    // if (typeof id != "string" || id.trim().length == 0)
    //     throw "the id provided is not a string or is an  empty string";

    const restCollection = await restaurants();
    const restaurants1 = await restCollection.findOne({
        "reviews._id": ObjectId(id1),
    });
    if (restaurants1 == null) throw "Review doesn't exist.";
    // console.log(restaurants1.reviews._id.tostring());
    // console.log("k");
    // console.log(id.tostring());

    // return review;

    // console.log(typeof restaurants1);
    // restaurants1.id1 = restaurants1.id1.toString();
    // restaurants1._id = restaurants1._id.toString();
    // if (restaurants1 == null) {
    //     throw "No restaurant found on this id";
    // }
};
const remove = async (reviewId) => {
    if (!reviewId) {
        throw "id need to have valid values";
    }
    if (typeof reviewId != "string" || reviewId.trim().length == 0) {
        throw "id is not string or is empty string,";
    }
    try {
        id1 = ObjectId(reviewId);
    } catch (e) {
        throw "id format wrong";
    }
    // if (!id) throw "You must provide an id to search for";
    // if (typeof id != "string" || id.trim().length == 0)
    //     throw "the id provided is not a string or is an  empty string";
    // const restCollection = await restaurants();
    const restCollection = await restaurants();
    const restaurants1 = await restCollection.findOne({
        "reviews._id": id1,
    });

    if (restaurants1 == null) throw "Review doesn't exist";
    // console.log(restaurants1.reviews._id.tostring());
    // console.log("k");
    // console.log(id.tostring());
    for (let i = 0; i < restaurants1.reviews.length; i++) {
        if (restaurants1.reviews[i]._id == id1) {
            reviewcount = reviewcount + 1;
        }
        //return restaurants1.reviews[i];
        const jipgo = await restCollection.updateOne(
            { "reviews._id": ObjectId(reviewId) },
            { $pull: { reviews: restaurants1.reviews[i ] } }
        );
        return jipgo;
    }

    // let dd = 0;
    // for (let i = 0; i < restaurants1.reviews.length; i++) {
    //     if (restaurants1.reviews[i]._id.toString() != id1.toString()) {
    //         dd = dd + restaurants1.reviews[i].rating;
    //         //return restaurants1.reviews[i];
    //     }
    //     avg = dd / (restaurants1.reviews.length - 1);
    // }

    // let sum = 0;
    // let avg;
    // for (let i = 0; i < restaurants1.reviews.length; i++) {
    //     sum = sum + restaurants1.reviews[i].rating;
    // }
    // avg = sum / restaurants1.reviews.length;
    // const updatedRest = await restCollection.updateOne(
    //     { _id: id1 },
    //     { $set: { overallRating: avg } }
    // );
    // // await restCollection.updateOne(
    // //     { _id: id1 },
    // //     { $set: { overallRating: avg } }
    // // );
    // const restaurant = await restCollection.findOne({
    //     _id: id1,
    // });
    //  return restaurant;
    if (reviewcount == 0) throw "review doesn't exists with this reviewId,";

    // const restaurants1 = await restCollection.findOne({
    //     "reviews._id": ObjectId(id),
    // });
    // return jigpo;
};

module.exports = {
    create,
    getAll,
    get,
    remove,
};



const updateComment = async (userId, commentId, comments) => {
    if (!userId || !commentId) throw "You must provide an id to search for";

    try {
        parsedUserId = ObjectId(userId);
    } catch (e) {
        throw "User id format wrong";
    }

    try {
        parsedCommentId = ObjectId(commentId);
    } catch (e) {
        throw "comment id format wrong";
    }
    if (!comments) {
        throw "Comments need to have valid values";
    }

    if (typeof comments != "string" || comments.trim().length == 0) {
        throw "parameter is not strings or are empty strings,";
    }

    const eventCollection = await events();

    // const updatedComment = {
    //     comments: comments,
    // };
    await eventCollectionupdate(
        {
            "comments._id": ObjectId(commentId),
        },
        {
            $set: { "updatedComment.$.comments": comments },
        }
    );
    // { "comments._id": ObjectId(commentId) },
    // { projection: { _id: 0, "comments.$": 1 } },
    //   {   $set: {"updatedComment.$.comments" }}

    return `comment has been updated`;
};