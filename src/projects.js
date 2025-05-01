//project constructor

export default class Project {
    constructor(projectName, todos=[]) {
        this.projectName = projectName;
        this.todos = todos;
    }

    get thisName() {
        return this.projectName;
    }

    set thisName(val) {
        this.projectName = val;
    }
}