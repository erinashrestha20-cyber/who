let number=0;
function increaseCount(){
    number = number + 1;
    document.getElementById("count").innerText = number;
    document.getElementById("count").style.color= "navy";
    document.getElementById("count").style.fontSize = "80px";
}