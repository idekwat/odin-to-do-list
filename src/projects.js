//project constructor

export class Project {
    constructor(projectName, todos=[]) {
        this.projectName = projectName;
        this.todos = todos;
    }

    get projectName() {
        return this.projectName;
    }

    set projectName(val) {
        this.projectName = val;
    }
}