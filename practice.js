// 🔹Q: Write a function to find the first non-repeating character in a string.
function findFirstNonRepetingChar(str) {
    let strChar = {}

    for (let char of str) {
        strChar[char] = (strChar[char] || 0) + 1
    }

    // console.log(strChar)
    for (let char of str) {
        if (strChar[char] == 1) {
            console.log(char)
            return char
        }
    }

    //     let strArr = str.split("")
    //     let m = strArr.forEach((elm, i) => {
    //         let resultArr = strArr.filter((e) => e == elm)
    //         if (resultArr.length == 1) {
    //             console.log(elm)
    //             return elm // return will not works in forEach
    //         }
    //     })
}

findFirstNonRepetingChar("aabbccde")

// Q: Create a function that counts the number of vowels in a string.

// 1st version

// let vowels = ['a', 'e', 'i', 'o', 'u']
// function findVowels(str) {
//     let vowelsCount = 0
//     for(let char of str) {
//         if(vowels.includes(char)) {
//             vowelsCount+=1
//         }
//     }
//     return vowelsCount
// }

// console.log(findVowels("chiragsinh"))

// 2nd version

function countVowels(str) {
    const matches = str.match(/[aeiou]/gi);
    return matches ? matches.length : 0;
}

console.log(countVowels("chiragsinh")); // Output: 3

// 3rd version

// function countVowels(str) {
//     const vowels = ['a', 'e', 'i', 'o', 'u'];
//     return str.split('').reduce((count, char) => {
//         return vowels.includes(char.toLowerCase()) ? count + 1 : count;
//     }, 0);
// }

// console.log(countVowels("chiragsinh")); // Output: 3



// Q: Find the second largest number in an array without using sort()

function secondLargest(numArray) {
    let largest = numArray[numArray.length - 1]
    let secondLargest = numArray[numArray.length - 2]
    numArray.forEach((num, i) => {
        if (num > largest) {
            secondLargest = largest
            largest = num
        } else if (num < largest && num > secondLargest) {
            secondLargest = num
        }
    })

    return secondLargest
}

console.log(secondLargest([10, 5, 20, 8]))

// Q: Given an array, return the first element that occurs more than once.

// function firstDuplicate(array) {
//     let arr = []
//     let lastOne = []
//     for (let num of array) {
//         if(!arr.includes(num)) {
//             arr.push(num)
//         } else {
//             // lastOne.push(num)
//             return num
//         }
//     }
//     // console.log("lastOne RETURN:", lastOne.sort())
//     // return lastOne[lastOne.length - 1]
// }

// More OPTIMAL VERSION

function firstDuplicate(arr) {
    const seen = new Set();

    for (let num of arr) {
        if (seen.has(num)) {
            return num;
        }
        seen.add(num);
    }
    return null;
}

console.log(firstDuplicate([2, 5, 1, 2, 3, 5, 1, 2, 4])); // Output: 2