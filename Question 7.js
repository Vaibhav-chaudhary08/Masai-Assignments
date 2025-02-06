let tasks = ["Grocery Shopping", "Pay Bills", "Schedule Appointment", "Walk the Dog", "Finish Project Proposal"];

console.log("Initial tasks:", tasks);

for (let i = 0; i < tasks.length - 1; i++) {
  tasks[i] = tasks[i + 1];
}
tasks.length = tasks.length - 1; 
let highPriorityTask1 = "Urgent Report Submission";
let highPriorityTask2 = "Client Meeting Preparation";

for (let i = tasks.length - 1; i >= 0; i--) {
  tasks[i + 2] = tasks[i];
}

tasks[0] = highPriorityTask2;
tasks[1] = highPriorityTask1;


let newTask = "Team Brainstorming Session";
tasks[tasks.length - 1] = newTask;

console.log("Updated tasks:", tasks);
