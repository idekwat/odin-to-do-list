
import "./styles.css";
import Project from "./projects.js";
import Task from "./tasks.js";

const contentDiv = document.getElementById("content");
const sideBarDiv = document.getElementById("sidebar");
const projectList = [];
mainDisplay()

function mainDisplay() {
    contentDiv.replaceChildren();
    sideBarDiv.replaceChildren();
    const homePageButton = document.createElement("button");
    homePageButton.textContent = "Home";
    const addProjectButton = document.createElement("button");
    addProjectButton.textContent = "add project";
    addProjectButton.disabled = false;
    sideBarDiv.appendChild(homePageButton);
    sideBarDiv.appendChild(addProjectButton);

    homePageButton.onclick = (e) => {
        contentDiv.replaceChildren();
        sideBarDiv.replaceChildren();
        console.log(projectList);
        mainDisplay();
    }

    addProjectButton.onclick = (e) => {
        addProjectButton.disabled = true;
        createNewProject();
    }
    
    projectList.forEach((project) => {
        const projectClickable = document.createElement("button");
        projectClickable.textContent = project.projectName;
        sideBarDiv.appendChild(projectClickable);
    });
}

function createNewProject() {
    const newProjectPrompts = document.createElement("div");
    newProjectPrompts.innerHTML =   '<form id = "newProjectForm">' + 
                                    '<input type = "text" id ="projectName" placeholder = "Project Name">' +
                                    '<input type = "submit" id ="submitBtn"></form>' +
                                    '<button id = "cancelBtn">cancel</button';
    
    sideBarDiv.appendChild(newProjectPrompts);

    cancelBtn.onclick = (e) => {
        newProjectPrompts.remove();
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