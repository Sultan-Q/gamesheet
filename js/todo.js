window.onload = function () {
  showList();

  // Use the enter button to alternatively add a new task
  document.getElementById("taskInput").onkeydown = function (e) {
    if (e.keyCode == 13) {
      newTask();
    }
  };
};
function get_todos() {
  var todos = new Array();
  var todos_str = localStorage.getItem("todo");
  if (todos_str !== null) {
    todos = JSON.parse(todos_str);
  }
  return todos;
}
function remove() {
  var r = confirm("Are you sure?");
  if (r == true) {
    var id = this.getAttribute("id");
    var todos = get_todos();
    todos.splice(id, 1);
    localStorage.setItem("todo", JSON.stringify(todos));

    showList();
    return false;
  } else {
    txt = "You pressed Cancel!";
  }
}

function removeAll() {
  localStorage.setItem("todo", JSON.stringify([]));
  showList();
  return false;
}

// Create a new list item when clicking on the "Add" button
function showList() {
  var todos = get_todos();

  var html = "<ul>";
  for (var i = 0; i < todos.length; i++) {
    html +=
      '<li class="list">' +
      todos[i].name +
      '<span class="close" id="' +
      i +
      '">x</span></li>';
  }
  html += "</ul>";
  document.getElementById("uList").innerHTML = html;

  var buttons = document.getElementsByClassName("close");
  for (var i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", remove);
  }

  var lists = document.querySelectorAll(".list");
  for (var i = 0; i < lists.length; i++) {
    lists[i].addEventListener(
      "click",
      function (ev) {
        if (ev.target.tagName === "LI") {
          ev.target.classList.toggle("checked");
        }
      },
      false
    );
  }
}
async function newTask() {
  var inputValue = document.getElementById("taskInput").value;
  if (inputValue === "") {
    alert("You haven't added anything");
  } else {
    let response = await fetch(
      "https://chbot100.herokuapp.com/game/getSpeakers?url=" + inputValue
    );
    let data = await response.json();
    console.log(data);
    localStorage.setItem("todo", JSON.stringify(data));

    showList();
    document.getElementById("taskInput").value = "";
    return false;
  }
}
