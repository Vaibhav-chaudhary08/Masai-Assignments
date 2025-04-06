document.addEventListener('DOMContentLoaded', () => {
    const userList = document.getElementById('user-list');
    const listFeedback = document.getElementById('list-feedback');

    const addUserForm = document.getElementById('add-user-form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const addButton = document.getElementById('add-button');
    const addLoadingIndicator = document.getElementById('add-loading');
    const formFeedback = document.getElementById('form-feedback');


    const API_URL = 'https://6611cf7795fdb62f24ee51f7.mockapi.io/api/v1/users';


    function displayFeedback(element, message, type) {
        element.textContent = message;
        if (type) {
            element.className = `feedback-area feedback-${type}`;
        } else {
            element.className = 'feedback-area';
        }
    }

    function setButtonLoading(button, indicator, isLoading) {
        button.disabled = isLoading;
        indicator.classList.toggle('hidden', !isLoading);
    }


    async function fetchUsers() {
        displayFeedback(listFeedback, 'Loading users...', 'loading');
        userList.innerHTML = '';

        try {
            const response = await fetch(API_URL);
            if (!response.ok) {
                throw new Error(`Failed to fetch users. Status: ${response.status}`);
            }
            const users = await response.json();
            displayUsers(users);
            displayFeedback(listFeedback, '', '');

        } catch (error) {
            console.error("Error fetching users:", error);
            displayFeedback(listFeedback, `Error: ${error.message}`, 'error');
            userList.innerHTML = ''; // Clear list on error
        }
    }

    /**
     * Displays the fetched users in the list.
     * @param {Array} users - An array of user objects.
     */
    function displayUsers(users) {
        userList.innerHTML = ''; // Clear previous content (like loading message)

        if (!users || users.length === 0) {
            userList.innerHTML = '<li>No users found.</li>';
            return;
        }

        users.forEach(user => {
            const listItem = document.createElement('li');
            // IMPORTANT: Display relevant info, but NEVER the password.
            listItem.innerHTML = `
                <div class="user-info">
                    <strong>${user.name || 'N/A'}</strong>
                    <span>${user.email || 'N/A'}</span>
                    <small>(ID: ${user.id})</small> </div>
                `;
            userList.appendChild(listItem);
        });
    }

    /**
     * Handles the submission of the 'Add User' form (POST request).
     * @param {Event} event - The form submission event.
     */
    async function handleAddUser(event) {
        event.preventDefault();
        displayFeedback(formFeedback, '', ''); // Clear previous form messages
        setButtonLoading(addButton, addLoadingIndicator, true);

        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const password = passwordInput.value;

        // Basic Validation
        if (!name || !email || !password) {
            displayFeedback(formFeedback, 'All fields are required.', 'error');
            setButtonLoading(addButton, addLoadingIndicator, false);
            return;
        }
        if (password.length < 6) {
            displayFeedback(formFeedback, 'Password must be at least 6 characters.', 'error');
            setButtonLoading(addButton, addLoadingIndicator, false);
            return;
        }
         if (!/^\S+@\S+\.\S+$/.test(email)) {
             displayFeedback(formFeedback, 'Please enter a valid email address.', 'error');
             setButtonLoading(addButton, addLoadingIndicator, false);
             return;
         }


        const newUser = { name, email, password };

        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newUser)
            });

            if (!response.ok) {
                // Try to get a specific error message from API
                let errorMsg = `Failed to add user. Status: ${response.status}`;
                try {
                    const errorData = await response.json();
                    // Adjust 'errorData.message' or fields based on MockAPI's error response structure
                    errorMsg = errorData.message || errorData.error || JSON.stringify(errorData) || errorMsg;
                } catch (e) {
                     // Handle cases where error body isn't JSON
                     const textError = await response.text();
                     if(textError) errorMsg = textError;
                }
                 if (response.status === 400) {
                     errorMsg += " (Possibly a duplicate email or invalid data)";
                 }

                throw new Error(errorMsg);
            }

            const createdUser = await response.json();
            displayFeedback(formFeedback, `User "${createdUser.name}" added successfully!`, 'success');
            addUserForm.reset();

            await fetchUsers();

        } catch (error) {
            console.error("Error adding user:", error);
            displayFeedback(formFeedback, `Error: ${error.message}`, 'error');
        } finally {
            setButtonLoading(addButton, addLoadingIndicator, false);
        }
    }

    fetchUsers();

    addUserForm.addEventListener('submit', handleAddUser);
});
