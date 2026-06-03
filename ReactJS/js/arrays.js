// const numbers = [4,12,7,23,9,18];
// function findLargest(arr){
//     let largest = arr[0];

//     for (let i=1; i < arr.length; i++){
//         if (arr[i]>largest){
//             largest = arr[i];
//         }
//     }
//     return largest;
// }
// console.log(findLargest(numbers));


const values = [1,2,3,4,5,6,7,8];
console.log(countEvens(values));
function countEvens(arr){
    let count = 0;
    for (let i=0; i<arr.length; i++){
        if (arr[i] % 2 == 0){
            count++;
        }
    }
    return count;
}