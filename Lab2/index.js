const arrayUtils = require("./arrayUtils");
const stringUtils = require("./stringUtils");
const objUtils = require("./objUtils");

try {
    // should pass
    const averageOne = arrayUtils.average([[1], [2], [3]]);
    console.log(`${averageOne}`);
    console.log(`average passed successfully`);
} catch (e) {
    console.log(e);
    console.error("failed test case");
}
console.log("     ");
try {
    //should fail
    const averageTwo = arrayUtils.average([[1, 3], []]);
    console.error(`average did not error`);
} catch (e) {
    console.log(e);
    console.log("average failed successfully");
}

try {
    // should pass
    const modeSquaredone = arrayUtils.modeSquared([1, 2, 3, 3]);
    console.log(`${modeSquaredone}`);
    console.log(`mode passed successfully`);
} catch (e) {
    console.log(e);
    console.error("failed test case");
}
console.log("     ");
try {
    //should fail
    const modeSquaredtwo = arrayUtils.modeSquared("banana");
    console.error(`mode did not error`);
} catch (e) {
    console.log(e);
    console.log("mode failed successfully");
}
try {
    //should fail
    const modeSquaredthree = arrayUtils.modeSquared(["guitar", 1, 3, "apple"]);
    console.error(`mode did not error`);
} catch (e) {
    console.log(e);
    console.log("mode failed successfully");
}

try {
    // should pass
    console.log(arrayUtils.medianElement([5, 6, 7]));
    // console.log(`${medianElementone}`);
    console.log(`median passed successfully`);
} catch (e) {
    console.log(e);
    console.error("failed test case");
}
console.log("     ");
try {
    //should fail
    const medianElementtwo = arrayUtils.medianElement("test");
    console.error(`median did not error`);
} catch (e) {
    console.log(e);
    console.log("median failed successfully");
}

try {
    // should pass
    const mergeone = arrayUtils.merge([1, 2, 3, "g"], ["d", "a", "s"]);
    console.log(`${mergeone}`);
    console.log(`merge passed successfully`);
} catch (e) {
    console.log(e);
    console.error("failed test case");
}
console.log("     ");
try {
    //should fail
    const mergetwo = arrayUtils.merge([null, null, null], [null, null, null]);
    console.error(`merge did not error`);
} catch (e) {
    console.log(e);
    console.log("merge failed successfully");
}

try {
    // should pass
    const sortone = stringUtils.sortString("123 FOO BAR!");
    console.log(`${sortone}`);
    console.log(`sort passed successfully`);
} catch (e) {
    console.log(e);
    console.error("failed test case");
}
console.log("     ");
try {
    //should fail
    const sorttwo = stringUtils.sortString(123);
    console.error(`sort did not error`);
} catch (e) {
    console.log(e);
    console.log("sort failed successfully");
}
try {
    //should fail
    const sortthree = stringUtils.sortString("");
    console.error(`sort did not error`);
} catch (e) {
    console.log(e);
    console.log("sort failed successfully");
}

try {
    // should pass
    const replacecharone = stringUtils.replaceChar("Daddy", 2);
    console.log(`${replacecharone}`);
    console.log(`sort passed successfully`);
} catch (e) {
    console.log(e);
    console.error("failed test case");
}
console.log("     ");
try {
    //should fail
    const replacechartwo = stringUtils.replaceChar(123);
    console.error(`sort did not error`);
} catch (e) {
    console.log(e);
    console.log("sort failed successfully");
}

try {
    // should pass
    const mashUpone = stringUtils.mashUp("Patrick", "Hill", "$");
    console.log(`${mashUpone}`);
    console.log(`sort passed successfully`);
} catch (e) {
    console.log(e);
    console.error("failed test case");
}
console.log("     ");
try {
    // should pass
    const mashUponetwo = stringUtils.mashUp("hello", "world", "#");
    console.log(`${mashUponetwo}`);
    console.log(`sort passed successfully`);
} catch (e) {
    console.log(e);
    console.error("failed test case");
}
console.log("     ");
try {
    //should fail
    const mashUptwo = stringUtils.mashUp();
    console.error(`sort did not error`);
} catch (e) {
    console.log(e);
    console.log("sort failed successfully");
}
try {
    //should fail
    const mashUptwoone = stringUtils.mashUp("h", "e");
    console.error(`sort did not error`);
} catch (e) {
    console.log(e);
    console.log("sort failed successfully");
}

try {
    // should pass
    // console.log(objutilsone);
    console.log(
        objUtils.computeObjects(
            [
                { x: 2, y: 3 },
                { a: 70, x: 4, z: 5 },
            ],
            (x) => x * 2
        )
    );
    //  console.log(`${objutilsone}`)
    console.log(`compute passed successfully`);
} catch (e) {
    console.log(e);
    console.error("failed test case");
}
console.log("     ");
try {
    // should pass
    const objutilstwo = objUtils.computeObjects({ x: 2 }, (x) => 1);
    console.log(`${objutilstwo}`);
    console.log(`compute passed successfully`);
} catch (e) {
    console.log(e);
    console.error("failed test case");
}
console.log("     ");

try {
    // should pass
    console.log(objUtils.commonkeys({ a: 2, b: 4 }, { a: 5, b: 4 }));
    // console.log(`${commonkeysone}`)
    console.log(`sort passed successfully`);
} catch (e) {
    console.log(e);
    console.error("failed test case");
}
console.log("     ");
try {
    //should fail
    const commonkeystwo = objUtils.commonkeys();
    console.error(`sort did not error`);
} catch (e) {
    console.log(e);
    console.log("sort failed successfully");
}

try {
    // should pass
    console.log(objUtils.flipObjects({ a: 3, b: 7, c: 5 }));
    // console.log(`${flipObjectsone}`)
    console.log(`sort passed successfully`);
} catch (e) {
    console.log(e);
    console.error("failed test case");
}
console.log("     ");
try {
    // should pass
    console.log(objUtils.flipObjects({ a: 3, b: 7, c: { x: 1 } }));
    // console.log(`${flipObjectsone}`)
    console.log(`sort passed successfully`);
} catch (e) {
    console.log(e);
    console.error("failed test case");
}
console.log("     ");
try {
    //should fail
    const flipObjectstwo = objUtils.flipObjects();
    console.error(`sort did not error`);
} catch (e) {
    console.log(e);
    console.log("sort failed successfully");
}
