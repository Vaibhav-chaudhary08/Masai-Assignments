const usersContainer = document.getElementById('users-container');
const sortBySelect = document.getElementById('sort-by');
const sortButton = document.getElementById('sort-button');
const apiUrl = 'https://jsonplaceholder.typicode.com/users';

async function fetchAndDisplayUsers(sortBy = 'name') {
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        let users = await response.json();

        users.sort((a, b) => {
            const valA = a[sortBy].toLowerCase();
            const valB = b[sortBy].toLowerCase();
            if (valA < valB) return -1;
            if (valA > valB) return 1;
            return 0;
        });

        displayUsers(users);
    } catch (error) {
        console.error('Error fetching or sorting users:', error);
        usersContainer.innerHTML = `<p style="color: red;">Error: ${error.message}</p>`;
    }
}

function displayUsers(users) {
    usersContainer.innerHTML = '';
    users.forEach(user => {
        const userItem = document.createElement('div');
        userItem.classList.add('user-item');
        userItem.innerHTML = `
            <p><strong>Name:</strong> ${user.name}</p>
            <p><strong>Username:</strong> ${user.username}</p>
            <p><strong>Email:</strong> ${user.email}</p>
        `;
        usersContainer.appendChild(userItem);
    });
}

sortButton.addEventListener('click', () => {
    const sortBy = sortBySelect.value;
    fetchAndDisplayUsers(sortBy);
});

fetchAndDisplayUsers(); 
