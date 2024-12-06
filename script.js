let search = document.querySelector(`[type="text"]`);
let submit = document.querySelector(`[type="submit"]`);
let manTask = document.querySelector(".tasks");
let deleteAll = document.getElementById("clear");
let tasksContainer = document.querySelector(".tasks-container");
let checkInput;
let theMainArray = [];

if (localStorage.getItem("task")) {
  theMainArray = JSON.parse(localStorage.getItem("task"));
}
checkList();
window.addEventListener("click", postList);
window.addEventListener("keydown", (e) => {
  if (e.key !== "Enter") return;
  postList();
});

function postList() {
  if (search.value !== "") {
    setArrayValues(search.value);
    search.value = "";
    checkList();
  }
}

manTask.addEventListener("click", (e) => {
  if (e.target.classList.contains("del")) {
    e.target.parentElement.remove();
    removeTheTargetFromMainTask(e.target.parentElement.getAttribute("data-id"));
    checkList();
  }
});
function setArrayValues(task) {
  let obj = {
    id: Date.now(),
    title: task,
    completed: false,
  };
  theMainArray.push(obj);
  storeToLocalStorage(theMainArray);
  addingElementToThePage(theMainArray);
}
function addingElementToThePage(task) {
  manTask.innerHTML = "";
  task.forEach((value) => {
    const containerDiv = document.createElement("div");
    containerDiv.classList.add("list-container");
    let div = document.createElement("div");
    div.classList = "task";
    containerDiv.setAttribute("data-id", value.id);
    div.appendChild(document.createTextNode(value.title));
    manTask.appendChild(containerDiv);
    containerDiv.appendChild(div);
    const inputCheck = document.createElement("input");
    inputCheck.setAttribute("type", "checkbox");
    inputCheck.setAttribute("data-id", value.id);
    if (value.completed) inputCheck.setAttribute("checked", "");
    containerDiv.appendChild(inputCheck);
    let button = document.createElement("button");
    button.appendChild(document.createTextNode("delete"));
    button.classList = "del";
    containerDiv.append(button);
  });
  checkInput = document.querySelectorAll(`[type="checkbox"]`);
  initChecking();
}

function storeToLocalStorage(task) {
  localStorage.setItem("task", JSON.stringify(task));
}

function formLocalToThePage() {
  let data = localStorage.getItem("task");
  if (data) {
    let task = JSON.parse(data);
    addingElementToThePage(task);
  }
}
formLocalToThePage();
function removeTheTargetFromMainTask(task) {
  theMainArray = theMainArray.filter((e) => e.id != task);
  storeToLocalStorage(theMainArray);
}

function checkList() {
  !theMainArray.length
    ? (tasksContainer.style.display = "none")
    : (tasksContainer.style.display = "block");
}
deleteAll.addEventListener("click", function () {
  manTask.innerHTML = "";
  theMainArray = [];
  localStorage.clear();
  checkList();
});

function initChecking() {
  runCheckList();
  function runCheckList() {
    checkInput.forEach((input) => {
      input.addEventListener("click", function () {
        if (!input.hasAttribute("checked")) {
          input.setAttribute("checked", "");
          compareListWithCheck(input.hasAttribute("checked"), input);
        } else {
          input.removeAttribute("checked");
          compareListWithCheck(input.hasAttribute("checked"), input);
        }
        storeToLocalStorage(theMainArray);
      });
    });
  }
  function compareListWithCheck(check, input) {
    theMainArray.forEach((list) => {
      if (list.id === Number(input.dataset.id)) {
        list.completed = check;
      }
    });
  }
}
