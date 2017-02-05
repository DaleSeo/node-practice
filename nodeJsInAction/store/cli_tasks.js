const fs = require('fs');
const path = require('path');

const file = path.join(process.cwd(), '/tasks.dat');
const args = process.argv.splice(2);

const command = args.shift();

switch (command) {
  case 'list':
    listTasks();
    break;

  case 'clear':
    clearTasks();
    break;

  case 'add':
    let taskDescription = args.join(' ');
    addTask(taskDescription);
    break;


  default:
    console.log('Usage: list|clear|add [taskDescription]');
}

function listTasks() {
  loadAsJson((tasks) => {
    if (tasks.length === 0) {
      console.log(`No tasks`);
      return;
    }

    console.log(`Tasks`);
    for (var task of tasks) {
      console.log(`- ${task}`);
    }
  });
}

function clearTasks() {
  saveAsJson([]);
  console.log('Cleared.');
}

function addTask(taskDescription) {
  loadAsJson((tasks) => {
    tasks.push(taskDescription);
    saveAsJson(tasks);
  });
  console.log('Saved.');
}

function saveAsJson(tasks) {
  let json = JSON.stringify(tasks);
  fs.writeFile(file, json, (err) => {
    if (err) throw err;
  });
}

function loadAsJson(cb) {
  fs.readFile(file, (err, data) => {
    if (err) throw err;
    let tasks = JSON.parse(data.toString() || '[]');
    cb(tasks);
  });
}
