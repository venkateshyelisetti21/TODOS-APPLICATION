let todoItemsContainer = document.getElementById("todoItemsContainer");
let saveTodoButton = document.getElementById("saveTodoButton");

//Array for the todo items
// let todoList = [
//     {
//         text : "Learn HTML",
//         uniqueNo :1
//     },
//     {
//         text : "Learn CSS",
//         uniqueNo :2
//     },
//     {
//         text : "Learn Bootstrap",
//         uniqueNo :3
//     },
//     {
//         text : "Learn Javascript",
//         uniqueNo :4
//     }
// ];

// saveButton onclick

//Save todo button function
saveTodoButton.onclick = function()
{
    localStorage.setItem("todoList",JSON.stringify(todoList));
}

//getting todo list from local storage
function getTodoListFromLocalStroage()
{
    let stringifiedTodoList = localStorage.getItem("todoList");
    let parsedTodoList = JSON.parse(stringifiedTodoList);

    if(parsedTodoList === null)
    {
        return [];
    }
    else
    {
        return parsedTodoList;
    }
}

//Assigning the above function to todoList
let todoList = getTodoListFromLocalStroage();

//onTodoStatusChange function
function onTodoStatusChange(checkboxId, labelId,todoId)
{
    let checkboxElement =document.getElementById(checkboxId);
    let labelEl = document.getElementById(labelId);

    ////if-else condition
    // if(checkboxElement.checked === true)
    // {
    //     labelEl.classList.add("checked");
    // }
    // else
    // {
    //     labelEl.classList.remove("checked");
    // }

    //toggle
    labelEl.classList.toggle("checked");

    //Finding index for checked status of todo Item
    let todoObjectIndex = todoList.findIndex(function(eachTodo)
    {
        let eachTodoId = "todo" + eachTodo.uniqueNo;
        if(eachTodoId === todoId)
        {
            return true;
        }
        else
        {
            return false;
        }
    });
    //Retrieving todoItem based on index
    let todoObject = todoList[todoObjectIndex];

    //Changing the status of the todoItem
    if(todoObject.isChecked === true)
    {
        todoObject.isChecked = false;
    }
    else
    {
        todoObject.isChecked = true;
    }

}

//onDeleteTodo function
function onDeleteTodo(todoId)
{
    let todoEl = document.getElementById(todoId);
    todoItemsContainer.removeChild(todoEl);
    //Deleting item in todoList array using splice() and findIndex() functions
    let deleteElementIndex = todoList.findIndex(function(eachTodo)
    {
        let eachTodoId = "todo" + eachTodo.uniqueNo;
        if(eachTodoId === eachTodo) return true;
        else return false;
    });
    todoList.splice(deleteElementIndex,1);
}

//function for each item
function createTodoItem(todo)
{
    let checkboxId = "checkbox" + todo.uniqueNo;
    let labelId = "label" + todo.uniqueNo;
    let todoId = "todo" + todo.uniqueNo;
    
    let todoElement = document.createElement("li");
    todoElement.classList.add("todo-item-container","d-flex","flex-row");
    todoElement.id = todoId;
    todoItemsContainer.appendChild(todoElement);

    let inputElement = document.createElement("input");
    inputElement.type = "checkbox";
    inputElement.id = checkboxId;
    inputElement.checked = todo.isChecked;
    inputElement.onclick = function()
    {
        onTodoStatusChange(checkboxId,labelId,todoId);
    };
    inputElement.classList.add("checkbox-input");
    todoElement.appendChild(inputElement);

    let labelContainer = document.createElement("div");
    labelContainer.classList.add("label-container","d-flex","flex-row");
    todoElement.appendChild(labelContainer);

    let labelElement = document.createElement("label");
    labelElement.setAttribute("for", checkboxId);
    labelElement.id = labelId;
    labelElement.classList.add("checkbox-label");
    labelElement.textContent = todo.text;
    if(todo.isChecked === true)
        {
            labelElement.classList.add("checked");
        }
    labelContainer.appendChild(labelElement);

    let DelElement = document.createElement("i");
    DelElement.classList.add("far","fa-trash-alt","delete-icon");
    DelElement.onclick = function()
    {
        onDeleteTodo(todoId);
    };
    labelContainer.appendChild(DelElement);
}

//for..of loop on todoList
for(let i of todoList)
{
    createTodoItem(i);
}


//Adding new todo Elements
let addTodoButton = document.getElementById("addTodoButton");
addTodoButton.onclick = function()
{
    onAddTodo();
};

//Previous count of todo elements
let todosCount = todoList.length;

//onAddTodo function
function onAddTodo()
{
    let userInputElement = document.getElementById("todoUserInput");
    let userInputValue = userInputElement.value;
    if(userInputValue === "")
    {
        alert("Enter Valid Input");
        return;
    }
    todosCount += 1;
    let newTodo = 
    {
        text : userInputValue,
        uniqueNo : todosCount,
        isChecked : false
    };
    todoList.push(newTodo);  //Pushing the new todo Element to todoList
    createTodoItem(newTodo);
    userInputElement = "";
}


