function isarraysuppliedornot(array1, function1) {
    if (!Array.isArray(array1)) {
        throw "Entered parameter is not an array";
    }
}

function notblankobject(length1) {
    if (length1 == 0) {
        throw "you entered empty object";
    }
}
function atleast1obj(a) {
    if (a == 0) {
        throw "you have not entered any object";
    }
}

function objdefinedornot(ob) {
    if (ob == undefined) {
        throw "object is not define";
    }
}
function objecttypeisproper(objj) {
    if (typeof objj != "object") {
        throw "object type is invalid";
    }
}

function objectisnotnull(objdd) {
    if (Object.keys(objdd).length == 0) {
        throw "object is empty";
    }
}

function valueisnumberornot(value) {
    if (typeof value !== "number") {
        throw "value is not number";
    }
}

function verifyfunction(funcc) {
    if (typeof funcc !== "function") {
        throw "second parameter is not a function";
    }
}
const computeObjects = function (arrayofobjects, func) {
    newobj = {};
    let objectsinobj = 0;
    let totalobj = 0;
    verifyfunction(func);
    isarraysuppliedornot(arrayofobjects, func);
    // console.log(objects[i].hasOwnProperty(4));
    for (let i = 0; i < arrayofobjects.length; i++) {
        //   isblankobjectornot(arrayofobjects[i]);
        // console.log(arrayofobjects[i]);
        //console.log(arrayofobjects[i].length);
        objectisnotnull(arrayofobjects[i]);
        objecttypeisproper(arrayofobjects[i]);

        for (let key in arrayofobjects[i]) {
            valueisnumberornot(arrayofobjects[i][key]);
            if (newobj.hasOwnProperty(key) == false) {
                //  console.log(newobj)
                newobj[key] = func(arrayofobjects[i][key]);
                //console.log(key, func(objects[i][key]));
            } else {
                //console.log(arrayofobjects[i])
                newobj[key] = newobj[key] + func(arrayofobjects[i][key]);
            }
            objectsinobj++;
        }
        totalobj++;
    }

    //  var size = Object.keys(newobj).length;
    //console.log(size);
    // console.log(objectsinobj);
    // console.log(totalobj);
    notblankobject(objectsinobj);
    atleast1obj(totalobj);
    // console.log(newobj);
    return newobj;
};

const commonkeys = function (object1, object2) {
    objdefinedornot(object1);
    objdefinedornot(object2);
    objecttypeisproper(object1);
    objecttypeisproper(object2);
    let newobject = {};

    for (keysinfirstobject in object1) {
        for (keysinsecondobject in object2) {
            if (keysinfirstobject == keysinsecondobject) {
                if (object1[keysinfirstobject] == object2[keysinsecondobject]) {
                    newobject[keysinfirstobject] = object1[keysinfirstobject];
                } else if (typeof object1[keysinfirstobject] == "object") {
                    newobject[keysinfirstobject] = commonkeys(
                        object1[keysinfirstobject],
                        object2[keysinsecondobject]
                    );
                }
            }
        }
    }
    return newobject;
};

const flipObjects = function (object) {
    objdefinedornot(object);
    objecttypeisproper(object);
    let newobj = {};
    // let count = 0;
    for (let key in object) {
        if (Array.isArray(object[key])) {
            object[key].forEach((element) => {
                newobj[element] = key;
            });
        } else if (typeof object[key] == "object") {
            newobj[key] = flipObjects(object[key]);
        } else {
            newobj[object[key]] = key;
            // count++;
        }
    }
    return newobj;
};
module.exports = {
    computeObjects,
    commonkeys,
    flipObjects,
};
