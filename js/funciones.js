//*ARRAY BASE

let tasks = new Array(
  {
    idTask: 0,
    titulo: "Estudiar Javascript",
    filtros: "diaria",
  },
  {
    idTask: 1,
    titulo: "Salir de fiesta",
    filtros: "urgente",
  },
  {
    idTask: 2,
    titulo: "Ver Netflix",
    filtros: "diaria",
  },
  {
    idTask: 3,
    titulo: "Viajar",
    filtros: "mensual",
  }
);

const inputTask = document.getElementById("inputTask");
const selectTarea = document.getElementById("selectTarea");

const divtasks = document.querySelector(".listaTareas");
const btnTarea = document.getElementById("btnTarea");

if (localStorage.getItem("arrayTasks")) {
  tasks = JSON.parse(localStorage.getItem("arrayTasks"));
}

const pintartasks = (array) => {
  divtasks.innerHTML = " ";

  for (let task of array) {
    const article = document.createElement("article");
    const h4 = document.createElement("h4");
    const inputEliminar = document.createElement("input");

    article.classList.add(task.filtros);
    h4.innerText = task.titulo;
    inputEliminar.type = "button";
    inputEliminar.value = "X";
    inputEliminar.dataset.idTask = task.idTask;
    article.append(h4, inputEliminar);
    divtasks.append(article);

    inputEliminar.addEventListener("click", (event) => {
      event.target.parentNode.remove();
      tasks = array.filter(
        (task) =>
          parseInt(event.target.dataset.idTask) !== parseInt(task.idTask)
      );
    });
  }
};
pintartasks(tasks);

const taskFilter = (array) => {
  selectfiltros.addEventListener("keydown", (event) => {
    let predeterminada = "Elige un filtro";

    if (event.target.value !== predeterminada) {
      let listatasks = array.filter(
        (task) => task.filtros === event.target.value
      );
      pintartasks(listatasks);
    } else {
      pintartasks(array);
    }
  });
};

taskFilter(tasks);

let i = 1;
btnTarea.addEventListener("click", () => {
  if (selectTarea.value === "Elige un filtro" || inputTask.value === " ") {
  } else {
    tasks.push({
      idTask: 2 + i,
      titulo: `${inputTask.value}`,
      filtros: `${selectTarea.value}`,
    });
    const strTask = JSON.stringify(tasks);
    localStorage.setItem("arrayTasks", strTask);
    const prsTask = JSON.parse(localStorage.getItem("arrayTasks"));
    i++;
    inputTask.value = " ";
    pintartasks(prsTask);
  }
});
