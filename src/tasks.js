//task constructor

export default class Task {
    constructor(title, description, dueDate, priority) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
    }

    get thisTitle() {
        return this.title;
    }

    set thisTitle(val) {
        this.title = val;
    }

    get thisDescription() {
        return this.description
    }

    set thisDescription(val) {
        this.description = val;
    }

    get thisDueDate() {
        return this.dueDate;
    }

    set thisDueDate(val) {
        this.dueDate = val;
    }

    get thisPriority() {
        return this.priority;
    }

    set thisPriority(val) {
        this.priority = val;
    }
}