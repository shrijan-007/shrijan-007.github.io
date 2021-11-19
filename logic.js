var add_btn = document.getElementById("addTask-btn");
var toadd_title = document.querySelector("#title-input");
var toadd_desc = document.querySelector("#description-input");
var tasks_frame = document.querySelector(".tasks-list");

if (add_btn) {
  add_btn.addEventListener("click", (e) => {
    e.preventdefault;
    if (toadd_title.value) {
      var list_el;
      list_el = setTask(toadd_title.value, toadd_desc.value,document.getElementsByClassName('task').length);
      tasks_frame.appendChild(list_el);
      refreshForm(toadd_title, toadd_desc);
    } else {
      alert("Task title cannot be empty");
    }
  });
}

function setTask(a, b, id_num) {
  var createli = document.createElement("li");
  createli.classList.add("task");
  var base =
    '<span class="task-head">title</span><span class="task-desc">description</span><span class="task-option"><button class="options-btn"><img src="icons/can-white.svg" alt="delete"></button><button class="options-btn"><img src="icons/edit.svg" alt="Edit"></button><button class="options-btn"><img src="icons/markdone.svg" alt="Mark done"></button><button class="options-btn reveal-task" id = "id_xx" onclick = "revealer(this.id)"><img src="icons/downarrow.svg" alt="Mark done"></button></span>';
  var base_id = base.replace("_xx",id_num+1)
    var base_with_title = base_id.replace("title", a);
  var base_with_desc = base_with_title.replace("description", b);
  createli.innerHTML = base_with_desc;
  return createli;
}
function refreshForm(input1, input2) {
  input1.value = "";
  input2.value = "";
  return input1, input2;
}
