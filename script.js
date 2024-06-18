let tasks = [];
let addTask = document.querySelector(".addTask")
let userTask = document.querySelector(".userTask")
let currentDate = new Date();
let readableTime = currentDate.toLocaleDateString()
let showComplete = document.querySelector(".showComplete")
let ShowAll = document.querySelector(".showAll")
let showIncomplete = document.querySelector(".showIncomplete")


if (localStorage.taskStringified) {
    tasks = JSON.parse(localStorage.getItem("taskStringified"))
    displayTasks()
}

function addTodo(){
    if (userTask.value == "") {
        alert("Please input your todo task")
    }else {
        tasks.push({
            description: userTask.value,
            completed: false
        })
        console.log(tasks);
        localStorage.setItem('taskStringified', JSON.stringify(tasks))
       
        userTask.value = ""
        displayTasks("all");
        userTask.focus();

        
        
    }
}

function displayTasks(filter){
    let filteredTasks = tasks
    if (filter === "Completed"){
        filteredTasks =  tasks.filter(task => task.completed)
    }else if (filter === "Incomplete") {
        filteredTasks = tasks.filter(task => !task.completed)
    }

    show.innerHTML = filteredTasks.map((distask, index) => {
        return`
        
        <p style="background-color: rgb(175, 87, 150); padding:  5px; font-size: 12px; font-weight: bolder; color: white;" class="practice">
        <input type="checkbox" ${distask.completed ? 'checked' : ''}  onclick="toggleComplete(${index})" style = "margin-marginLeft: 10px;" >

        <span>${distask.description}</span>
        <span>
        <img src="images/icons8-edit-30.png" alt="" onclick = "edit(${index})" >
        <img src="images/icons8-delete-30.png" alt="" onclick = "deleteTask(${index})" style="margin-left: 30px;" >
        </span> 
        <span>${readableTime}</span>
        </p>
        `
    }).join('');
}
function toggleComplete(index) {
    tasks[index].completed = !tasks[index].completed
   localStorage.setItem('taskStringified', JSON.stringify(tasks))
    displayTasks("all")
}

addTask.addEventListener("click", addTodo)

    function edit(index){
        let editedTask = prompt('enter New Task');
        if (editedTask == "") {
            alert('Please enter a new task')
        }else {
            tasks[index].description = editedTask;
            localStorage.setItem('taskStringified', JSON.stringify(tasks))
            displayTasks("All")

        }
    }

function deleteTask(index){
   tasks.splice(index, 1)
   localStorage.setItem('taskStringified', JSON.stringify(tasks))
   displayTasks();


}


showComplete.addEventListener("click", () => displayTasks("Completed"))
showIncomplete.addEventListener("click",() => displayTasks("Incomplete"))
ShowAll.addEventListener("click", () => displayTasks("All"))
