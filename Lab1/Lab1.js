const questionOne = function questionOne(arr) {
  let y = [];
  let z = {};
  if (!Array.isArray(arr)) {
    return z;
  }

  for (let i = 0; i < arr.length; i++) {
    let z = Math.abs(Math.pow(arr[i], 2) - 7);
    y.push(z);
  }

  y.forEach(function (element) {
    const primestatus = primenumbercheck(element);
    //console.log(primestatus);
    z[element] = primestatus;
  });
  return z;
  // z.y[i]= primestatus;
};

function primenumbercheck(anynumber) {
  if (anynumber == 1) {
    return false;
  } else {
    for (let i = 2; i < anynumber; i++) {
      if (anynumber % i == 0) {
        return false;
      }
    }
    return true;
  }
}
const questionTwo = function questionTwo(arr) {
  let a = [];

  arr.forEach((element) => {
    if (a.includes(element) == false) {
      a.push(element);
    }
  });

  return a;
};

const questionThree = function questionThree(arr) {
  let y = {};
  // ["car", "arc", "kite", "eitk"]
  for (let i = 0; i < arr.length; i++) {
    let anagramArray = [];

    for (let j = 0; j < arr.length; j++) {
      if (
        anagramArray.includes(arr[j]) == false &&
        arr[i].split("").sort().join("") === arr[j].split("").sort().join("")
      ) {
        anagramArray.push(arr[j]);
      }
    }
    let key = arr[i].split("").sort().join("");

    if (anagramArray.length > 1) {
      y[key] = anagramArray;
    }
  }

  return y;
};

const questionFour = function questionFour(num1, num2, num3) {
  let aaavg = (num1 + num2 + num3) / 3;
  let a = factorial(num1);
  let b = factorial(num2);
  let c = factorial(num3);
  let total = Math.floor((a + b + c) / aaavg);

  return total;

  // Implement question 4 here
};

function factorial(number) {
  if (number == 0) return 1;
  else return number * factorial(number - 1);
}

module.exports = {
  firstName: "NEEL",
  lastName: "TEJANI",
  studentId: "10474518",
  questionOne,
  questionTwo,
  questionThree,
  questionFour,
};
