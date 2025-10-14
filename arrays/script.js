const tasks = ['Task 1'];

const addTask = (taskArray, taskName) => taskArray.push(taskName);

const findTask = (taskArray, taskName) => taskArray.indexOf(taskName);

const removeTask = (taskArray, taskName) => {
    const index = findTask(taskArray, taskName);
    if(index === -1) {
        return;
    }
    return taskArray.splice(index, 1);
}

const changeTaskPlace = (taskArray, taskName) => {
    const res = removeTask(taskArray, taskName);
    if(!res) {
        return;
    }
    taskArray.unshift(res[0]);
}

addTask(tasks, "lol1");
addTask(tasks, "lol2");
addTask(tasks, "lol3");
addTask(tasks, "lol4");
addTask(tasks, "test1");
changeTaskPlace(tasks, "lol4");

console.log(tasks);

const url = `https://school.com/course/javascript`;

const parseURL = url => {
    const [protocol, ...rest] = url.split(":");
    const [_, ...newRest] = rest.join().split("//");
    const [domen, ...path] = newRest.join().split("/");
    console.log(`Protocol: ${protocol}
Domen: ${domen}
Path: ${path.join("/")}`)  
}

parseURL(url);