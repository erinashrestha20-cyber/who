function popFromArray() {
    let arr = [10, 20, 30, 40];

    try {
        if (arr.length === 0) {
            throw new Error("Array is empty.");
        }

        arr.pop();

        console.log(arr);

    } catch (error) {
        console.log(error.message);
    }
}

popFromArray();