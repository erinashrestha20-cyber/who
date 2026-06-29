function divide(a,b){
    try{
        if (b === 0){
            throw new Error("Cannot divide by zero");
        }
        console.log(a + "/" + b + "=" + (a /b));
    } catch (error) {
        console.log("Error: " + error.message);
    }
}

divide(10,0);
divide(10,3);
divide(10,-5);


function division(c,d){
    console.log(c/d);
}
division(10,0);
