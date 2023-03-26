// removes an element from the array and returns whether the element was successfully deleted
export function removeElement(arr, elem) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === elem) {
            arr.splice(i, 1);
            return true;
        }
    }
    return false;
}

// checks whether each entry of the array is a string 
export function isArrayOfStrings(arr) {
    if (!Array.isArray(arr)) {
        return false;
    }
    for (let i = 0; i < arr.length; i++) {
        if (typeof arr[i] !== 'string') {
            return false;
        }
    }
    return true;
}

// checks whether the entries of the given array (of strings) are unique
export function hasDuplicates(arr) {
    var valuesSoFar = Object.create(null);
    for (var i = 0; i < arr.length; i++) {
        var value = arr[i];
        if (value in valuesSoFar) {
            return true;
        }
        valuesSoFar[value] = true;
    }
    return false;
}

// returns true if every element in arr1 is in arr2
export function isContained(arr1, arr2) {
    for (let i = 0; i < arr1.length; i++) {
        if (!arr2.includes(arr1[i])) {
            return false;
        }
    }
    return true;
}

// returns whether the given variable is a JSON object
const isObject = (variable) => typeof variable === 'object' && !Array.isArray(variable) && variable !== null;

// returns an object in the arr with the given key value pair if it exists
export function getObject(arr, key, value) {
    for (let i = 0; i < arr.length; i++) {
        if (isObject(arr[i]) && arr[i][key] === value) {
            return arr[i];
        }
    }
    return null;
}

// returns an object in the arr with the given key value pair if it exists
export function getObjectIndex(arr, key, value) {
    for (let i = 0; i < arr.length; i++) {
        if (isObject(arr[i]) && arr[i][key] === value) {
            return i;
        }
    }
    return -1;
}