
import "./styles.css";
import Project from "./projects.js";
import Task from "./tasks.js";
import {storageAvailable, projectStorage} from "./localStorage.js";

const contentDiv = document.getElementById("content");
const sideBarDiv = document.getElementById("sidebar");
let projectList = [];
mainDisplay()

//first thing user sees
function mainDisplay() {

    if(localStorage.getItem("projectStored") != null) {
        projectList = JSON.parse(localStorage.getItem("projectStored"));
    }

    let isOnProject = false;

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
        projectClickable.className = "project-btn";
        sideBarDiv.appendChild(projectClickable);

        projectClickable.onclick = (e) => {
            displayProjectContents(project);
            
            addProjectButton.onclick = (e) => {
                isOnProject = true;
                addProjectButton.disabled = true;
                createNewProject(newProjectPrompt, isOnProject, project); 
                displayProjectContents(project);
            }
        }
    });
}

//funtion for creating new projects
function createNewProject(newProjectPrompt, isOnProject, currentProject) {
    newProjectPrompt.innerHTML =   '<form id = "newProjectForm">' + 
                                    '<input type = "text" id ="projectName" placeholder = "Project Name">' +
                                    '<input type = "submit" id ="submitBtn"></form>' +
                                    '<button id = "cancelBtn">cancel</button';

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
    const projectTitleHeading = document.createElement("h1");
    projectTitleHeading.id = "projectTitle";
    projectTitleHeading.textContent = currentProject.projectName;

    const addTaskButton = document.createElement("button");
    addTaskButton.id = "addTaskBtn";
    addTaskButton.textContent = "Add Task";

    contentDiv.appendChild(projectTitleHeading);
    contentDiv.appendChild(addTaskButton);

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

        taskClickable.textContent = task.title + " due on " + task.dueDate;
        deleteTask.textContent = "del";
        contentDiv.appendChild(taskDiv);
        taskDiv.appendChild(taskClickable);
        taskDiv.appendChild(deleteTask);
        
        switch(task.thisPriority) {
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
            displayTaskDetails(task);
        }

        deleteTask.onclick = (e) => {
            alert(task.thisTitle + " is now deleted");
            
            let index = currentProject.todos.indexOf(task);
            if(index !== -1) {
                currentProject.todos.splice(index, 1);
                displayProjectContents(currentProject);
            }
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
        projectStorage(projectList);
        displayProjectContents(currentProject);
    }

    cancelBtn.onclick = (e) => {
        newTaskPrompt.remove();
        displayProjectContents(currentProject);
    }
}

function displayTaskDetails(currentTask) {
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
        contentDiv.removeChild(taskModal);
    }
}