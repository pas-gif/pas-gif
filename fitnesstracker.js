// Function to add a goal and save it to local storage
function addGoal() {
    const goal = document.getElementById('goal').value;
    const progress = document.getElementById('progress').value;

    if (goal && progress) {
        const goals = JSON.parse(localStorage.getItem('fitnessGoals')) || [];
        const newGoal = {
            goal: goal,
            progress: progress,
            completed: false
        };

        goals.push(newGoal);
        localStorage.setItem('fitnessGoals', JSON.stringify(goals));

        document.getElementById('goal').value = '';
        document.getElementById('progress').value = '';

        displayGoals();
    } else {
        alert('Please fill out both the goal and progress fields.');
    }
}

// Function to display goals in the table
function displayGoals() {
    const goals = JSON.parse(localStorage.getItem('fitnessGoals')) || [];
    const tableBody = document.querySelector('#goalTable tbody');
    tableBody.innerHTML = ''; // Clear existing rows

    goals.forEach((goal, index) => {
        const row = document.createElement('tr');
        const completion = goal.completed ? 'Completed' : 'In Progress';

        row.innerHTML = `
            <td>${goal.goal}</td>
            <td>${goal.progress}</td>
            <td>${completion}</td>
            <td>
                <button onclick="markAsCompleted(${index})">Mark as Completed</button>
                <button onclick="deleteGoal(${index})">Delete</button>
            </td>
        `;

        tableBody.appendChild(row);
    });
}

// Function to mark a goal as completed
function markAsCompleted(index) {
    const goals = JSON.parse(localStorage.getItem('fitnessGoals')) || [];
    goals[index].completed = true;
    localStorage.setItem('fitnessGoals', JSON.stringify(goals));

    displayGoals();
}

// Function to delete a goal
function deleteGoal(index) {
    const goals = JSON.parse(localStorage.getItem('fitnessGoals')) || [];
    goals.splice(index, 1);
    localStorage.setItem('fitnessGoals', JSON.stringify(goals));

    displayGoals();
}

// Display goals on page load
window.onload = displayGoals;
