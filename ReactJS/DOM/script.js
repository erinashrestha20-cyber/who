const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
const clearCompletedBtn = document.getElementById("clearCompletedBtn");

function addTask(){
    const taskText = taskInput.value.trim();
    if (taskText === ""){
         return; //ignore empty input
    }

    const li = document.createElement("li"); //creates element in html
    li.textContent = taskText;

    li.addEventListener("click", function() {
    if(li.style.textDecoration === "line-through"){
        li.style.textDecoration = "none";
        li.style.color = "black";
    }
    else{
        li.style.textDecoration = "line-through";
        li.style.color = "gray";
    }
});

const deleteBtn = document.createElement("button");
deleteBtn.textContent = "X";
deleteBtn.style.marginLeft = "200px";
deleteBtn.addEventListener("click", function(event){
    event.stopPropagation();
    taskList.removeChild(li);
});


    li.appendChild(deleteBtn); ///button will be appended everylist item 
    taskList.appendChild(li);
    taskInput.value = ""; //reset input
}

addTaskBtn.addEventListener("click", addTask);
taskInput.addEventListener("keypress", function(event){
    if (event.key === "Enter") {
        addTask();
    }

});

clearCompletedBtn.addEventListener("click", function(){
    const tasks = taskList.getElementsByTagName("li");
    for (let i = tasks.length - 1; i >= 0; i --) {
        if (tasks[i].style.textDecoration === "line-through" && tasks[i].style.color === "gray"){
            taskList.removeChild(tasks[i]);
        }
    }
});



