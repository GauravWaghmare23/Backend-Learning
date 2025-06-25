import { readFileSync, writeFileSync } from "fs";
const filePath = "todo/tasks.json";

const loadTask = () => {
    try {
        const data = readFileSync(filePath);
        const dataJSON = data.toString();
        return JSON.parse(dataJSON);
    } catch (error) {
        return [];
    }
}

const saveTask = (tasks) => {
    const dataJSON = JSON.stringify(tasks, null, 2); 
    writeFileSync(filePath, dataJSON);
}

const addTask = (task) => {
    const tasks = loadTask();
    tasks.push({ task });
    saveTask(tasks);
    console.log("Task added successfully");
}

const listTasks = () => {
    const tasks = loadTask();
    if (tasks.length === 0) {
        console.log("No tasks found.");
    } else {
        tasks.forEach((task, index) => {
            console.log(`${index + 1} - ${task.task}`);
        });
    }
}

const removeTask = (index) => {
    const tasks = loadTask();
    if (index > 0 && index <= tasks.length) {
        const removed = tasks.splice(index - 1, 1);
        saveTask(tasks);
        console.log(`Successfully removed: ${removed[0].task}`);
    } else {
        console.log("Invalid task index");
    }
}

const command = process.argv[2];
const argument = process.argv[3];

if (command === "add") {
    addTask(argument);
} else if (command === "list") {
    listTasks();
} else if (command === "remove") {
    removeTask(parseInt(argument));
} else {
    console.log("Unknown command. Please use add, list, or remove.");
}
