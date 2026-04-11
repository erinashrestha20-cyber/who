//// here function and return is syntax

//How to create function in JS
function myFirstFunc(){    ///function declaration
    return"Hello World"
}

let message = myFirstFunc()    ///function invocation(calling function)
console.log({message})

//How to pass parameters to function

function addTwoNumbers(a,b){
    return a+b
}

let sum = addTwoNumbers(5,6)
console.log({sum})

//// function keywords
/// 1. return
/// 2.curly braces
/// 3.parenthesis


function multiplyTwoNumbers(a,b){
   // let a = 2  // since a has already been declared it cannot be declared again
 //  a = 2
   //b = 3
    let c = a*b
    /// return "good " ==== here good is string
 //   return "c"/// it shows c as ans bcuz it is string
 return c
}

let mul = multiplyTwoNumbers(5,6) /// variable declaration of (a,b) in let c=a*b =(5*6)
console.log({mul})