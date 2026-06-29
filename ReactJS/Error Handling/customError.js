//Custom Error
let age = -5;

try{
    if (age<0){
        throw new Error("Age cannot be negative.")
    }
    console.log("Age is: " + age);
} catch (error) {
    console.log("Caught: " + error.message);
    let agemain = Math.abs(age);    /// negative age was handled using absolute |-5| = 5;
    console.log("Corrected Age is: " + agemain);
}

let agee = 10;

