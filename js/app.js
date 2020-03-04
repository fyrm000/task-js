if (JSON.parse(localStorage.getItem("task")) === null) {
  var tasks = [];
  var taskCompleted = {
    total: 0,
    completed: 0
  };
} else {
  var tasks = JSON.parse(localStorage.getItem("task"));
  var taskCompleted = JSON.parse(localStorage.getItem("taskCompleted"));
}

let task = {}; //Objetos
let validN = true;
let validS = true;
console.log(taskCompleted);
console.log("ok");

const bar = () => {
  let template = `<div class="progress">
  <div
    class="progress-bar progress-bar-striped progress-bar-animated"
    role="progressbar"
    aria-valuenow="75"
    aria-valuemin="0"
    aria-valuemax="100"
    style="width: 75%"
  ></div>
</div>`;

  $("#progress").html(template);
};

const start = () => {
  $("#title").html("Tareas :)");

  let template = `


                <form id="formTask">
                <ul class="list-group">
                <h4>Agregar Tarea:</h4>
                <div class="form-group has-danger">
                  <label class="form-control-label">Nombre de la tarea:</label>
                  <input type="text" placeholder="Nombre de la tarea" class="form-control" id="name">
                  <div class="invalid-feedback">Favor introducir el nombre de la tarea...</div>
                </div> 
                <div class="form-group">
                <select class="custom-select" id="pri">
                  <option selected="">Open this select menu</option>
                  <option value="1">Leve</option>
                  <option value="2">Normal</option>
                  <option value="3">Alta</option>
                </select>
                <div class="invalid-feedback">Favor de seleccionar el nivel de prioridad...</div>
              </div>  
                </div>
                </li>
                </ul>
                <button type="submit" class="btn btn-success btn-block">Agregar Tarea</button>
                <form>
              
    `;

  $("#addTask").html(template);
};

//Validar Campos
//TODO crear variable que almacene el nombre y select y los vuelva a cargar para evitar volver a escribir los datos correctos
const isValid = (name, select) => {
  if (name === "") {
    validN = false;
    $("#name").addClass("is-invalid");
  } else {
    validN = true;
    $("#name").removeClass("is-invalid");
  }

  if (select.length > 1) {
    validS = false;
    $("#pri").addClass("is-invalid");
  } else {
    validS = true;
    $("#pri").removeClass("is-invalid");
  }
};

//End validar campos

//Funcion que muestra los datos almacenados en el localStorage

const getTask = () => {
  if (!localStorage.getItem("task")) {
    console.log("sin task");
  } else {
    let taskList = JSON.parse(localStorage.getItem("task"));

    let template = ``;

    taskList.forEach(task => {
      template += `
        <tr> 
        <td style="display:none" class="idTask">${task.id}</td>
        <td>${task.name}</td>
        <td><span class="badge badge-warning">${task.priority}</span>
        </td>
        <td><button id="completeTask" class="btn btn-outline-primary btn-sm"><i class="icono-check"></i></button>&nbsp;<button id="deleteTask" class="btn btn-outline-danger btn-sm"><i class="icono-cross"></i></button></td>
        </tr>
        `;
    });

    $("#tableTask").html(template);
  }

  //Fin funcion de muestra de datos del localStorage
};

$(document).ready(function() {
  //Agregar nueva tarea

  $("#formTask").submit(function(e) {
    e.preventDefault();
    console.log(taskCompleted);
    let name = $("#name").val();
    let pri = $("#pri").val();
    let id = uuidv4();
    isValid(name, pri);
    if (validN === true && validS === true) {
      start();

      if(taskCompleted.total == 0){
        taskCompleted.total = 1;
      }else{
        taskCompleted.total = taskCompleted.total+1;
      }

      task.id = id;
      task.name = name;
      task.priority = pri;
      tasks.push(task);
      localStorage.setItem("taskCompleted", JSON.stringify(taskCompleted));
      localStorage.setItem("task", JSON.stringify(tasks));
      getTask();
    } else {
      $("#name").val(name);
      $("#pri").val(pri);
    }
  });

  //End Agregar nueva tarea
});

$(document).on("click", "#deleteTask", function() {
  let iid = $(this)
    .closest("tr")
    .children("td.idTask")
    .text();
  deleteTask(iid);
});

const deleteTask = iid => {
  let i = tasks.findIndex(task => task.id == iid);
  if (i !== -1) {
    tasks.splice(i, 1);
    taskCompleted.total - 1;
    localStorage.setItem("taskCompleted", JSON.stringify(taskCompleted))
    localStorage.setItem("task", JSON.stringify(tasks));
    getTask();
  } else {
    console.log("error al eliminar");
  }
};

$(document).on("click", "#completeTask", function() {});

const completeTask = () => {};

//Ejecutables

getTask();
start();
bar();
