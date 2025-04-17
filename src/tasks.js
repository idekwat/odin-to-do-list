//task constructor

export class Task {
    constructor(title, description, dueDate, priority) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
    }

    get title() {
        return this.title;
    }

    set title(val) {
        this.title = val;
    }

    get title() {
        return this.description;
    }

    set description(val) {
        this.description = val;
    }

    get dueDate() {
        return this.dueDate;
    }

    set dueDate(val) {
        this.dueDate = val;
    }

    get priority() {
        return this.priority;
    }

    set priority(val) {
        this.priority = val;
    }
}