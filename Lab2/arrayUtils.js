function isarraydefinedornot(arr) {
    if (arr == undefined) {
        throw "array is undefined";
    }
}

function isarrayemptyornot(arr) {
    if (arr.length < 1) {
        throw "you have entered empty array";
    }
}

function checkispropernumber(arr) {
    if (!Array.isArray(arr)) {
        throw "is not a valid type array ";
    }
}
function checkingtype(val) {
    if (typeof val !== "number") {
        throw "invalid type";
    }
}

const average = function average(arr) {
    isarraydefinedornot(arr);
    isarrayemptyornot(arr);
    checkispropernumber(arr);
    // console.log(arr);
    let sum = 0;
    let length = 0;

    for (let i = 0; i < arr.length; i++) {
        isarraydefinedornot(arr[i]);
        isarrayemptyornot(arr[i]);
        //isArrayornot(arr[i]);

        for (let j = 0; j < arr[i].length; j++) {
            // checkispropernumber(arr[i][j]);
            checkingtype(arr[i][j]);
            sum = sum + arr[i][j];
            length = length + 1;
            // isarrayenteredornot(arr[i,j]);
        }

        // checkvalueenteredornot(arr[i]);
    }

    return Math.floor(sum / length);
};

const modeSquared = function modeSquared(arr) {
    //1,1,3,2,2,8,8,4
    isarraydefinedornot(arr);
    isarrayemptyornot(arr);
    checkispropernumber(arr);
    let count = 0;
    let mode = [];
    let sqmode = [];
    let sum = 0;
    for (let i = 0; i < arr.length; i++) {
        isarraydefinedornot(arr[i]);
        isarrayemptyornot(arr[i]);
        checkingtype(arr[i]);
        //checkispropernumber(arr[i]);
        if (arr[i] == arr[i + 1]) {
            mode[count] = arr[i + 1];
            count = count + 1;
        }
    }

    for (let i = 0; i < mode.length; i++) {
        sqmode[i] = Math.pow(mode[i], 2);
    }

    for (let i = 0; i < sqmode.length; i++) {
        sum = sum + sqmode[i];
    }
    return sum;
};
const merge = function merge(arr1, arr2) {
    isarraydefinedornot(arr1, arr2);
    isarrayemptyornot(arr1, arr2);
    checkispropernumber(arr1, arr2);
    arr3 = arr1.concat(arr2);
    //console.log(arr3);

    for (let i = 0; i < arr3.length; i++) {
        isarraydefinedornot(arr3[i]);
        isarrayemptyornot(arr3[i]);
        //checkpropertyping(arr3[i])
        // checkispropernumber(arr3[i]);
    }
    return arr3.sort((a, b) => {
        if (typeof a == "number" && typeof b == "number") {
            if (a > b) {
                return 1;
            } else {
                return -1;
            }
        } else if (typeof a == "string" && typeof b == "number") {
            return -1;
        } else if (typeof a == "number" && typeof b == "string") {
            return 1;
        } else if (typeof a == "string" && typeof b == "string") {
            if (a.localeCompare(b) == true) {
                return 1;
            } else {
                return -1;
            }
        } else {
            return 0;
        }
    });
};

// console.log(arr1[i] == arr1[i].toUpperCase());
//     if (typeof arr3[i] == "string") {
//         if (arr3[i] == arr3[i].toLowerCase) {
//             arralpha[count] = arr3[i];
//             count++;
//         } else {
//             arralpha[count2] = arr3[i];
//             count2++;
//         }
//     } else {
//         arrnum[count1] = arr3[i];
//         count1++;
//     }
// }

// return arralpha.sort().concat(arrnum.sort());

// const comparator = (a, b) => {
//     return a
//         .toString()
//         .localeCompare(b.toString(), "en", { alphabetic: true });
// };

// arralphabetically = [];
// arralphabetically = arr3.sort();

// arralphabetically = arralphabetically.sort(function (a, b) {
//     return a - b;
// });

const medianElement = function medianElement(arr) {
    isarraydefinedornot(arr);
    isarrayemptyornot(arr);
    checkispropernumber(arr);
    let length = arr.length;
    arr = arr.sort(function (a, b) {
        return a - b;
    });

    finalobj = {};
    //let forevenmedian;
    let foroddmedian;
    //odd
    if (length % 2 !== 0) {
        for (let i = 0; i < arr.length; i++) {
            // checkispropernumber(arr[i]);
            median = length + 1 / 2;
            foroddindex = Math.floor(length / 2);
            foroddmedian = arr[foroddindex];
            finalobj[foroddmedian] = foroddindex;
        }
    }
    // // //even
    else {
        lowerindex1 = Math.floor((length + 1) / 2);
        higherindex2 = Math.round((length + 1) / 2);
        let forevenmedian = (arr[lowerindex1 - 1] + arr[higherindex2 - 1]) / 2;
        finalobj[forevenmedian] = lowerindex1;
    }

    return finalobj;
};

module.exports = {
    average,
    modeSquared,
    medianElement,
    merge,
};
