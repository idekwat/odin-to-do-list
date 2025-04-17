//project constructor

export class Project {
    constructor(projectName, todos=[]) {
        this.projectName = projectName;
        this.todos = todos;
    }
}