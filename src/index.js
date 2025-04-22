
import "./styles.css";
import Project from "./projects.js";
import Task from "./tasks.js";
import {storageAvailable} from "./localStorage.js";

const contentDiv = document.getElementById("content");
const sideBarDiv = document.getElementById("sidebar");
const projectList = [];
mainDisplay()

//first thing user sees
function mainDisplay() {
    if (storageAvailable("localStorage")) {
        console.log("Yippee! We can use localStorage awesomeness");
    } 
    else {
        console.log("Too bad, no localStorage for us");
    }

    contentDiv.replaceChildren();
    sideBarDiv.replaceChildren();
    const homePageButton = document.createElement("button");
    homePageButton.textContent = "Home";
    const addProjectButton = document.createElement("button");
    addProjectButton.textContent = "add project";
    addProjectButton.disabled = false;
    const newProjectPrompt = document.createElement("div");
    newProjectPrompt.id = "projectFormDiv";
    sideBarDiv.appendChild(homePageButton);
    sideBarDiv.appendChild(addProjectButton);
    sideBarDiv.appendChild(newProjectPrompt);
    

    homePageButton.onclick = (e) => {
        contentDiv.replaceChildren();
        sideBarDiv.replaceChildren();
        mainDisplay();
    }

    addProjectButton.onclick = (e) => {
        addProjectButton.disabled = true;
        createNewProject(newProjectPrompt);
    }
    
    projectList.forEach((project) => {
        const projectClickable = document.createElement("button");
        projectClickable.textContent = project.projectName;
        sideBarDiv.appendChild(projectClickable);

        projectClickable.onclick = (e) => {
            displayProjectContents(project);
        }
    });
}

//funtion for creating new projects
function createNewProject(newProjectPrompt) {
    newProjectPrompt.innerHTML =   '<form id = "newProjectForm">' + 
                                    '<input type = "text" id ="projectName" placeholder = "Project Name">' +
                                    '<input type = "submit" id ="submitBtn"></form>' +
                                    '<button id = "cancelBtn">cancel</button';

    cancelBtn.onclick = (e) => {
        newProjectPrompt.remove();
        mainDisplay();
    }

    submitBtn.onclick = (e) => {
        e.preventDefault();
        let name = projectName.value;
        const newProject = new Project(name);
        projectList.push(newProject);
        mainDisplay();
    }
}

//displaying all to-dos of project
function displayProjectContents(currentProject) {
    contentDiv.replaceChildren();
    const projectTitleHeading = document.createElement("h1");
    projectTitleHeading.id = "projectTitle";
    projectTitleHeading.textContent = currentProject.thisName;

    const addTaskButton = document.createElement("button");
    addTaskButton.id = "addTaskBtn";
    addTaskButton.textContent = "Add Task";

    contentDiv.appendChild(projectTitleHeading);
    contentDiv.appendChild(addTaskButton);

    addTaskButton.onclick = (e) => {
        addNewTask(currentProject);
    }

    currentProject.todos.forEach((task) => {
        const taskClickable = document.createElement("button");
        taskClickable.textContent = task.thisTitle + " due on " + task.thisDueDate;
        contentDiv.appendChild(taskClickable);
        console.log(currentProject.todos);

        taskClickable.onclick = (e) => {
            displayTaskDetails(task);
        }
    })
}

function addNewTask(currentProject) {
    const newTaskPrompt = document.createElement("div");
    newTaskPrompt.innerHTML =   '<form id = "newTaskForm">' + 
                                    '<input type = "text" id = "taskTitle" placeholder = "Task Name"><br>' +
                                    '<input type = "text" id = "taskDesc" placeholder = "Task Description(Optional)"><br>' +
                                    '<input type = "date" id = "taskDate"><br>' +
                                    '<label for = "taskPrio">Priority</label>' +
                                    '<select name = "taskPrio" id = "taskPrio">' +
                                    '<option value = "low">Low</option>' +
                                    '<option value = "med">Medium</option>' +
                                    '<option value = "high">High</option></select><br>' +
                                    '<input type = "submit" id ="submitBtn"></form>' +
                                    '<button id = "cancelBtn">cancel</button';
    newTaskPrompt.id = "taskPromptDiv";

    contentDiv.appendChild(newTaskPrompt);

    submitBtn.onclick = (e) => {
        e.preventDefault();
        let title = taskTitle.value;
        let description = taskDesc.value;
        let dueDate = taskDate.value;
        let priority = taskPrio.value;

        const newTask = new Task(title, description, dueDate, priority);
        currentProject.todos.push(newTask);
        displayProjectContents(currentProject);
    }

    cancelBtn.onclick = (e) => {
        newTaskPrompt.remove();
        displayProjectContents(currentProject);
    }
}

function displayTaskDetails(currentTask) {
    console.log(currentTask);
}