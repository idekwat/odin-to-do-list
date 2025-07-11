
import "./styles.css";
import Project from "./projects.js";
import Task from "./tasks.js";
import {projectStorage} from "./localStorage.js";
import {compareAsc, compareDesc, format, getTime, setDate} from "date-fns";
import { el } from "date-fns/locale";

const contentDiv = document.getElementById("content");
const sideBarDiv = document.getElementById("sidebar");
let projectList = [];
mainDisplay()

//first thing user sees
function mainDisplay() {

    if(localStorage.getItem("arrayStored") != null) {
        projectList = JSON.parse(localStorage.getItem("arrayStored"));
    }
    let isOnProject = false;

    contentDiv.replaceChildren();
    sideBarDiv.replaceChildren();
    const homePageButton = document.createElement("button");
    homePageButton.textContent = "Home";
    const addProjectButton = document.createElement("button");
    addProjectButton.textContent = "add project";
    addProjectButton.disabled = false;
    const newProjectPrompt = document.createElement("div");
    newProjectPrompt.id = "projectFormDiv";
    const sideBarConstant = document.createElement("div");
    sideBarConstant.id = "sidebarConst";
    sideBarConstant.appendChild(homePageButton);
    sideBarConstant.appendChild(addProjectButton);
    sideBarDiv.appendChild(sideBarConstant);
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
        const projectDiv = document.createElement("div");
        projectDiv.className = "project-div";
        const projectClickable = document.createElement("button");
        projectClickable.textContent = project.projectName;
        projectClickable.className = "project-btn";
        const projectDelete = document.createElement("button");
        projectDelete.textContent = "del";
        projectDelete.className = "project-del-btn";

        projectDiv.appendChild(projectClickable);
        projectDiv.appendChild(projectDelete);
        sideBarDiv.appendChild(projectDiv);

        projectClickable.onclick = (e) => {
            displayProjectContents(project);
            
            addProjectButton.onclick = (e) => {
                isOnProject = true;
                addProjectButton.disabled = true;
                createNewProject(newProjectPrompt, isOnProject, project); 
                displayProjectContents(project);
            }
        }

        projectDelete.onclick = (e) => {
            alert(project.projectName + " will be deleted");

            let index = projectList.indexOf(project);
            if(index !== -1) {
                projectList.splice(index, 1);
                projectStorage(projectList);
                mainDisplay();
            }
        }
    });

    if(projectList.length < 1) {
        contentDiv.replaceChildren();
        const noProjectsYet = document.createElement("h1");
        noProjectsYet.id = "projectEmpty";
        noProjectsYet.textContent = "NO PROJECTS YET, CREATE ONE";
        contentDiv.appendChild(noProjectsYet);
    }
    else {
        contentDiv.replaceChildren();
        const noProjectsYet = document.createElement("h1");
        noProjectsYet.id = "projectEmpty";
        noProjectsYet.textContent = "CLICK ON THE PROJECT TO ADD TASKS";
        contentDiv.appendChild(noProjectsYet);
    }

}

//funtion for creating new projects
function createNewProject(newProjectPrompt, isOnProject, currentProject) {
    newProjectPrompt.innerHTML =   '<form id = "newProjectForm">' + 
                                    '<input type = "text" id ="projectName" placeholder = "Project Name">' +
                                    '<input type = "submit" id ="submitBtn"></form>' +
                                    '<button id = "cancelBtn">cancel</button';
    newProjectPrompt.id = "projectPrompt";
    
    cancelBtn.onclick = (e) => {
        newProjectPrompt.remove();

        if(!isOnProject) {
            mainDisplay();
        }
        else {
            displayProjectContents(currentProject);
        }
    }

    submitBtn.onclick = (e) => {
        e.preventDefault();
        let name = projectName.value;
        const newProject = new Project(name);
        projectList.push(newProject);
        projectStorage(projectList);

        if(!isOnProject) {
            mainDisplay();
        }
        else {
            mainDisplay();
            displayProjectContents(currentProject);
        }
    }
}

//displaying all to-dos of project
function displayProjectContents(currentProject) {
    contentDiv.replaceChildren();
    const projectConstants = document.createElement("div");
    projectConstants.id = "projectConst";

    const projectTitleHeading = document.createElement("h1");
    projectTitleHeading.id = "projectTitle";
    projectTitleHeading.textContent = currentProject.projectName;

    const addTaskButton = document.createElement("button");
    addTaskButton.id = "addTaskBtn";
    addTaskButton.textContent = "Add Task";

    projectConstants.appendChild(projectTitleHeading);
    projectConstants.appendChild(addTaskButton);
    contentDiv.appendChild(projectConstants);

    addTaskButton.onclick = (e) => {
        addTaskButton.disabled = true;
        addNewTask(currentProject);
    }

    currentProject.todos.forEach((task) => {
        const taskDiv = document.createElement("div");
        taskDiv.className = "task-div";
        const taskClickable = document.createElement("button");
        taskClickable.className = "task-btn";
        const deleteTask = document.createElement("button");
        deleteTask.className = "delete-task-btn";

        let formatDate = format(new Date(task.dueDate), "MMM/dd/yyyy")
        taskClickable.textContent = task.title + " due on " + formatDate;
        deleteTask.textContent = "del";
        contentDiv.appendChild(taskDiv);
        taskDiv.appendChild(taskClickable);
        taskDiv.appendChild(deleteTask);
        switch(task.priority) {
            case("low"):
            taskClickable.style.backgroundColor = "green";
            break;
            case("med"):
            taskClickable.style.backgroundColor = "yellow";
            break;
            case("high"):
            taskClickable.style.backgroundColor = "red";
            break;
        }

        taskClickable.onclick = (e) => {
            console.log(task);
            displayTaskDetails(task, currentProject);
        }

        deleteTask.onclick = (e) => {
            alert(task.title + " is now deleted");
            
            let index = currentProject.todos.indexOf(task);
            if(index !== -1) {
                currentProject.todos.splice(index, 1);
                displayProjectContents(currentProject);
            }
            projectStorage(projectList);
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

        let currentDate = format(new Date(),"MMM/dd/yyyy");
        let setDate = new Date(dueDate);

        const compareDates = compareAsc(setDate, currentDate);

        if (title.trim() != "" && compareDates >= 0){
            const newTask = new Task(title, description, dueDate, priority);
            currentProject.todos.push(newTask);
            projectStorage(projectList);
            displayProjectContents(currentProject);
        }
             
        else if (title.trim() == "") {
            alert("Task name is needed");
        }
        else if (compareDates < 0) {
         
            alert ("Date Invalid");
        }
        
        else {
            alert("Set a date");
        }
    }

    cancelBtn.onclick = (e) => {
        newTaskPrompt.remove();
        displayProjectContents(currentProject);
    }
}

function displayTaskDetails(currentTask, currentProject) {
    const taskModal = document.createElement("dialog");
    taskModal.className = "task-modal";
    taskModal.innerHTML =   '<div>' + currentTask.title + '</div><br>' +
                            '<div>' + currentTask.description + '</div><br>' +
                            '<div>' + currentTask.dueDate + '</div><br>' +
                            '<div>' + currentTask.priority + '</div><br>' +
                            '<button id = "closeModal">close</button';
    contentDiv.appendChild(taskModal);
    const modal = document.querySelector(".task-modal");
    const closeModal = document.getElementById("closeModal");
    modal.showModal();
    
    closeModal.onclick = (e) => {
        modal.close();
        displayProjectContents(currentProject);
    }

    window.addEventListener('keydown', function (e) {
        if(e.key === 'Escape') {
            modal.close();
            displayProjectContents(currentProject);
        }
    })
}