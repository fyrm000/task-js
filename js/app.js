let tasks = JSON.parse(localStorage.getItem('task'))
let task = {}; //Objetos

console.log("ok");

$("#title").html("Tareas :)");

let template = `

                <form id="formTask">
                <ul class="list-group">
                <h4>Agregar Tarea:</h4>
                <li class="list-group-item d-flex justify-content-between align-items-center">Nombre de la tarea: 
                <div class="col-xs-3">
                <input type=text class="form-control input-sm" id="name">
                </div>
                </li>
                <li class="list-group-item d-flex justify-content-between align-items-center">Prioridad:
                <div class="col-xs-3">
                <select class="browser-default custom-select input-sm" id="pri">
                    <option selected>Open this select menu</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                </select>

                
                </div>
                </li>
                </ul>
                <button type="submit" class="btn btn-success btn-block">Agregar Tarea</button>
                <form>
    `;

$("#addTask").html(template);

$("#formTask").submit(function(e) {
  e.preventDefault();

  let name = $("#name").val();
  let pri = $("#pri").val();
  task.name = name;
  task.priority = pri;
  tasks.push(task);
  localStorage.setItem("task", JSON.stringify(tasks));
  getTask();
});

const getTask = () => {
  if (!localStorage.getItem("task")) {
    console.log("sin task");
  } else {
    let taskList = JSON.parse(localStorage.getItem("task"));

    let template = ``;

    taskList.forEach(task => {
      console.log(task.priority);

      template += `
        <tr> 
        <td>${task.name}</td>
        <td>${task.priority}</td>
        </tr>
        `;
    });

    console.log(template);

    $("#tableTask").html(template);
  }

  // console.log(taskList);
};

getTask();
