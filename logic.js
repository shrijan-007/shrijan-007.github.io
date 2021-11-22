var add_btn = document.getElementById("addTask-btn");
var toadd_title = document.querySelector("#title-input");
var toadd_desc = document.querySelector("#description-input");
var tasks_frame = document.querySelector(".tasks-list");

if (add_btn) {
  add_btn.addEventListener("click", (e) => {
    e.preventDefault();
    if (toadd_title.value) {
      var list_el;
      list_el = setTask(
        toadd_title.value,
        toadd_desc.value,
        document.getElementsByClassName("task").length
      );
      tasks_frame.appendChild(list_el);
      refreshForm(toadd_title, toadd_desc);
    } else {
      alert("Task title cannot be empty");
    }
  });
}

function setTask(a, b, id_num, isnew = true) {
  var createli = document.createElement("li");
  createli.classList.add("task");
  var base =
    '<span class="task-head">title</span><span class="task-desc">description</span><span class="task-option"><button class="options-btn" id = "DE_yy" onclick = "deleteTask(this.id)"><img src="icons/can-white.svg"  alt="delete" ></button><button class="options-btn"><img src="icons/markdone.svg" alt="Mark done"></button><button class="options-btn reveal-task" id = "id_xx" onclick = "revealer(this.id)"><img src="icons/downarrow.svg" alt="Mark done"></button></span>';
  var base_id = base.replace("_xx", id_num + 1);
  base_id = base_id.replace("_yy", id_num + 1);
  base_id = base_id.replace("+zz",id_num + 1)
  var base_with_title = base_id.replace("title", a);
  var base_with_desc = base_with_title.replace("description", b);
  createli.innerHTML = base_with_desc;

  if (isnew) {
    var task_obj = {
      taskid: "DE" + (id_num + 1),
      title: a,
      taskDesc: b,
    };
    localStorage.setItem("task" + (id_num + 1), JSON.stringify(task_obj));
    var tasks_list = JSON.parse(
      localStorage.getItem(checkStorage_fortask("list_of_tasks"))
    );
    tasks_list.push("task" + (id_num + 1));
    localStorage.setItem("list_of_tasks", JSON.stringify(tasks_list));
  }

  return createli;
}

function checkStorage_fortask(key) {
  if (!localStorage.getItem(key)) {
    var key_lists = Array();
    localStorage.setItem(key, JSON.stringify(key_lists));
    return key;
  } else {
    return key;
  }
}

function refreshForm(input1, input2) {
  input1.value = "";
  input2.value = "";
  return input1, input2;
}
function display_storedTasks() {
  if (localStorage.getItem("list_of_tasks")) {
    var prev_storedTasks = JSON.parse(
      localStorage.getItem(checkStorage_fortask("list_of_tasks"))
    );
    for (let index = 0; index < prev_storedTasks.length; index++) {
      const taskKey = prev_storedTasks[index];
      var storedTask_object = JSON.parse(localStorage.getItem(taskKey));
      prev_list_el = setTask(
        storedTask_object.title,
        storedTask_object.taskDesc,
        index,
        false
      );
      tasks_frame.appendChild(prev_list_el);
    }
  }
}

function deleteTask(ele_id) {
  console.log(ele_id);
  var delbtn = document.getElementById(ele_id);
  var taskKeys = JSON.parse(localStorage.getItem("list_of_tasks"));
  for (let index = 0; index < taskKeys.length; index++) {
    const element = taskKeys[index];
    var this_task_id = JSON.parse(localStorage.getItem(element)).taskid;
    if (this_task_id == ele_id) {
      var stored_deleted_task = taskKeys[index];
      break;
      //  location.reload();
    }
  }
  // localStorage.setItem('list_of_tasks',JSON.stringify(taskKeys));
  for (let i = 0; i < taskKeys.length; i++) {
    const temp_key = taskKeys[i];
    if (temp_key == stored_deleted_task) {
      for (let j = i; j < taskKeys.length - 1; j++) {
        var value_to_change = JSON.parse(localStorage.getItem(taskKeys[j]));
        var value_to_set = JSON.parse(localStorage.getItem(taskKeys[j + 1]));
        value_to_change.title = value_to_set.title;
        value_to_change.taskDesc = value_to_set.taskDesc;
        localStorage.setItem(taskKeys[j], JSON.stringify(value_to_change));
      }
      localStorage.removeItem(taskKeys[taskKeys.length - 1]);
      taskKeys.pop();
      localStorage.setItem("list_of_tasks", JSON.stringify(taskKeys));
      var remove_all = document.querySelectorAll(".task");
      Array.from(remove_all).forEach((temp) => {
        temp.remove();
      });
      display_storedTasks();
      break;
    }
  }

  //   var tid = JSON.parse(localStorage.getItem(temp_key));
  //   tid.taskid  = "DE"+(i+1);
  //   localStorage.setItem(temp_key,JSON.stringify( tid));

  // var remove_all = document.querySelectorAll('.task');
  // Array.from(remove_all).forEach(temp =>{
  //   temp.remove()
  // })
  // display_storedTasks();
  // location.reload();
}



display_storedTasks();
