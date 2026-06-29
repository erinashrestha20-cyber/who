
try{
    //this line causes a referenceError
    console.log(myName);
} catch(error){
    console.log("Error caught:" + error.message);
    let myName = "john";
    console.log(myName);
    // console.log("Error caught:" + error.message);
}




