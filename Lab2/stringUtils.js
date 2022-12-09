function isstringenteredornot(string) {
    if (string == undefined) {
        throw "string  is undefined";
    }
}

function isstringempty(string) {
    if (string == "") {
        throw "string  is empty";
    }
}

function ispropertype(str) {
    if (typeof str != "string") {
        throw "invalid type";
    }
}

function ischardefineornot(char) {
    if (char == undefined) {
        throw "character is undefined";
    }
}

function isUpperLetter(str) {
    var letters = /^[A-Z]/;

    if (str.match(letters)) {
        //console.log("neel");
        return true;
    } else {
        return false;
    }
}

function isLowerLetter(str) {
    var letters = /^[a-z]/;

    if (str.match(letters)) {
        return true;
    } else {
        return false;
    }
}

function isSpecialCharacter(str) {
    var SpecialCharacter = /^[.\+*?[^]$(){}=!<>|:-%]$/;
    if (isSpace(str)) {
        return false;
    }

    if (str.match(SpecialCharacter) == null) {
        return true;
    } else {
        return false;
    }
}

function isNumber(str) {
    var numbers = /^[0-9]/;

    if (str.match(numbers)) {
        return true;
    } else {
        return false;
    }
}

function isSpace(str) {
    if (str == " ") {
        return true;
    } else {
        return false;
    }
}
//function isSpecialChar(str) {}

const sortString = function sortString(string) {
    isstringenteredornot(string);
    isstringempty(string);
    ispropertype(string);
    let array = string.split("");

    // console.log(array);
    // console.log(isLowerLetter('e'))
    // console.log(isUpperLetter('E'))
    // console.log(isNumber('2'))
    // console.log(isSpecialCharacter('%'))
    // console.log(isSpace(' '))
    return array
        .sort((a, b) => {
            if (isUpperLetter(a) && isUpperLetter(b)) {
                return a.localeCompare(b);
            } else if (isUpperLetter(a) && isLowerLetter(b)) {
                return -1;
            } else if (isUpperLetter(a) && isSpecialCharacter(b)) {
                return -1;
            } else if (isUpperLetter(a) && isNumber(b)) {
                return -1;
            } else if (isUpperLetter(a) && isSpace(b)) {
                return -1;
            } else if (isLowerLetter(a) && isUpperLetter(b)) {
                return 1;
            } else if (isLowerLetter(a) && isLowerLetter(b)) {
                return a.localeCompare(b);
            } else if (isLowerLetter(a) && isSpecialCharacter(b)) {
                return -1;
            } else if (isLowerLetter(a) && isNumber(b)) {
                return -1;
            } else if (isLowerLetter(a) && isSpace(b)) {
                return -1;
            } else if (isSpecialCharacter(a) && isUpperLetter(b)) {
                return 1;
            } else if (isSpecialCharacter(a) && isLowerLetter(b)) {
                return 1;
            } else if (isSpecialCharacter(a) && isSpecialCharacter(b)) {
                return a.localeCompare(b);
            } else if (isSpecialCharacter(a) && isNumber(b)) {
                return -1;
            } else if (isSpecialCharacter(a) && isSpace(b)) {
                return -1;
            } else if (isNumber(a) && isUpperLetter(b)) {
                return 1;
            } else if (isNumber(a) && isLowerLetter(b)) {
                return 1;
            } else if (isNumber(a) && isSpecialCharacter(b)) {
                return 1;
            } else if (isNumber(a) && isNumber(b)) {
                return a - b;
            } else if (isNumber(a) && isSpace(b)) {
                return -1;
            } else if (isSpace(a) && isUpperLetter(b)) {
                return 1;
            } else if (isSpace(a) && isLowerLetter(b)) {
                return 1;
            } else if (isSpace(a) && isSpecialCharacter(b)) {
                return 1;
            } else if (isSpace(a) && isNumber(b)) {
                return 1;
            } else if (isSpace(a) && isSpace(b)) {
                return 0;
            }
        })

        .join("");
};
const mashUp = function (string1, string2, char) {
    isstringenteredornot(string1);
    isstringenteredornot(string2);
    isstringempty(string1);
    isstringempty(string2);
    ischardefineornot(char);
    let count = 0;
    let count1 = 0;
    let firststr = string1.split("");
    let secondstr = string2.split("");
    let difference = string1.length - string2.length;
    let addition = string1.length - string2.length;

    if (string1.length != string2.length) {
        if (string1.length > string2.length) {
            for (let i = 0; i <= string2.length - 1; i++) {
                firststr[i] = firststr[i] + secondstr[i];
                count++;
            }
            for (let i = count; i < string1.length; i++) {
                firststr[count] = firststr[count] + char;
                count++;
            }
        } else {
            for (let i = 0; i <= string1.length - 1; i++) {
                firststr[i] = firststr[i] + secondstr[i];
                count++;
            }

            for (let i = count; i < string2.length; i++) {
                firststr[count] = secondstr[count] + char;
                count++;
            }
        }
    } else {
        if (string1.length > string2.length) {
            for (let i = 0; i <= string2.length - 1; i++) {
                firststr[i] = firststr[i] + secondstr[i];
                count++;
            }
        } else {
            for (let i = 0; i <= string1.length - 1; i++) {
                firststr[i] = firststr[i] + secondstr[i];
                count++;
            }
        }
    }
    console.log(count1);
    // if(string1.length > string2.length){
    // for(let i = count ; i<string1.length; i++){
    //             firststr[count] = (firststr[count]+char);
    //             count++;
    // }}
    // else{
    //     for(let i = count ; i<string2.length; i++){
    //                 firststr[count] = (firststr[count]+char);
    //                 count++;
    //     }}
    return `"${firststr.join("")}"`;
};

const replaceChar = function (string, x) {
    ispropertype(string);
    let a = string.split("");
    let count = 0;
    let mainCharacter = a[x];
    let prevCharacter = a[x - 1];
    let nextCharacter = a[x + 1];

    for (let i = 0; i <= a.length; i++) {
        if (i != x) {
            if (a[i] == mainCharacter) {
                if (count % 2 == 0) {
                    a[i] = prevCharacter;

                    //   overflow = false;
                } else {
                    a[i] = nextCharacter;

                    //overflow = false;
                }
                count++;
            }

            // overflow = false;
        }
    }
    console.log(count);

    return a;
};

module.exports = {
    sortString,
    replaceChar,
    mashUp,
};
