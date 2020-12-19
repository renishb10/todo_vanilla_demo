// Local storage name
const storageName = "todoStore";

// Array to hold (todoItems) & check if already data available in local storage (retrieve) else empty []
let todos = JSON.parse(localStorage.getItem(storageName)) || [];

// On Page Load
document.addEventListener("DOMContentLoaded", function() {
  let todoForm = document.getElementById("newTodoForm");
  let todoList = document.getElementById("todoList");

  // First thing to do is create List of items if there is already data saved in the local storage
  // If array/storage has values, then create todo items based on that
  for (let i = 0; i < todos.length; i++) {
    let newTodo = document.createElement("li");
    newTodo.innerText = todos[i].task;

    // Check if completed or not based on isDone boolean
    newTodo.isDone = todos[i].isDone ? true : false;
    if (newTodo.isDone) {
      newTodo.style.textDecoration = "line-through";
    }

    // Create Remove button as well
    let removeButton = document.createElement("button");
    removeButton.innerText = "X";

    todoList.appendChild(newTodo);
    newTodo.appendChild(removeButton);
  }


  // On Adding an item
  todoForm.addEventListener("submit", function(event) {
    event.preventDefault();

    let removeButton = document.createElement("button");
    removeButton.innerText = "X"; // Code is duplicated, you can avoid this (think of it)

    const itemText = document.getElementById("task").value;
    let newTodo = document.createElement("li");
    newTodo.innerText = itemText

    // 1. Create item <li> with remove button and append to todoList <ul>
    todoList.appendChild(newTodo);
    newTodo.appendChild(removeButton);

    // 2. Now add it to global array i.e todos = []
    todos.push({
      task: itemText,
      isDone: false // by default its false
    });

    // 3. Now we need save this array to the local storage
    localStorage.setItem(storageName, JSON.stringify(todos));

    todoForm.reset();
  });

  // On Clicking on an item (Two scenarios)
  // 1. Clicking on item text (intention: Mark as complete DOM + Array + Store)
  // 2. Clicking on remove button (intention: Delete item from DOM + Array + Store)
  todoList.addEventListener("click", function(event) {
    const targetTagToLowerCase = event.target.tagName.toLowerCase();
    if (targetTagToLowerCase === "li") {
      // We are on Item text Click

      // This time the target (where the user click) is on Item text
      const itemTxt = event.target.firstChild.textContent; // Get the todo item text (You can console log and understand event, target, children etc)

      // Update DOM
      event.target.style.textDecoration = "line-through";

      // Update the specific item in the Array & Localstorage
      markItemAsDone(itemTxt);

    } else if (targetTagToLowerCase === "button") {
      // We are on Remove button Click

      // This time the target (where the user click) is on Remove button
      // So we go backward and get parentNode i.e <li> then firstChild that is itemText (I strongly recommend you to console.log & understand)
      const itemTxt = event.target.parentNode.firstChild.textContent;

      // Remove from Array and Localstorage
      removeItem(itemTxt)

      // Remove from DOM as well
      event.target.parentNode.remove();
    }
  });


  // Utitlies
  function markItemAsDone(itemTxt) {
    // as said by SB instructor, this breaks for duplicates - another option is to have dynamic IDs

    // Update Array
    for (let i = 0; i < todos.length; i++) {
      if (todos[i].task === itemTxt) {
        todos[i].isDone = true;

        // Update Localstorage
        localStorage.setItem(storageName, JSON.stringify(todos));
      }
    }
  }

  function removeItem(itemTxt) {
    // We remove from Array and update Local Storage
    let index = -1;
    for (let i = 0; i < todos.length; i++) {
      if (todos[i].task === itemTxt) {
        index = i; // Get the index
        break; // Break the loop (assuming first time, this is not a proper solution)
      }
    }

    alert(index)
    if (index > -1) {
      todos.splice(index, 1); // splice will remove the item from array, we need pass index and number of items to be removed counting from that index
    }

    // Now we got the item removed
    // Update Localstorage as usual
    localStorage.setItem(storageName, JSON.stringify(todos));
  }

  // TODOs
  // 1. Item completion/incompletion toggle feature
  // 2. Avoid duplicate code
  // 3. Add random unique Id for each item, so proper removal can be achieved

});
