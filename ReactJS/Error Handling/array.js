function popFromEmptyArray(arr) {
    try {
        if (arr.length === 0) {
            throw new Error("Array is empty. Cannot pop.");
        }

        let removed = arr.pop();
        console.log("Removed:", removed);
        console.log("Remaining:", arr);

    } catch (error) {
        console.log(error.message);
    }
}

popFromEmptyArray([]);
popFromEmptyArray([10,20,30,40]);