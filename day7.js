let tasks = [
  { id: 1, title: "Study JS", priority: "high" },
  { id: 2, title: "Go Gym", priority: "medium" },
  { id: 3, title: "Watch Movie", priority: "low" },
  { id: 4, title: "Practice Coding", priority: "high" }
];
function addTask(task) {
  tasks.push(task);
}
function removeTask(id) {
  tasks = tasks.filter(function(t) {
    return t.id !== id;
  });
}
function updateTask(id, newData) {
  tasks = tasks.map(function(t) {
    if (t.id === id) {
      return { ...t, ...newData };
    }
    return t;
  });
}
function sortByPriority() {
  const priorityOrder = {
    high: 1,
    medium: 2,
    low: 3
  };

  return [...tasks].sort(function(a, b) {
    return priorityOrder[a.priority] - priorityOrder[b.priority];
  });
}
addTask({ id: 5, title: "Read Book", priority: "medium" });
console.log("Sorted Tasks:");
console.log(sortByPriority());