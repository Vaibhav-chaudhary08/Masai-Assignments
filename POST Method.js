document.addEventListener('DOMContentLoaded', () => {
    const registrationForm = document.getElementById('registration-form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const submitButton = document.getElementById('submit-button');
    const messageArea = document.getElementById('message-area');
    const loadingIndicator = document.getElementById('loading-indicator');

    const API_URL = 'https://6611cf7795fdb62f24ee51f7.mockapi.io/api/v1/users';


    function displayMessage(message, type) {
        messageArea.textContent = message;
        messageArea.className = `message-area message-${type}`; 
    }


    function clearMessage() {
        messageArea.textContent = '';
        messageArea.className = 'message-area';
    }


    function setLoading(isLoading) {
        if (isLoading) {
            submitButton.disabled = true;
            loadingIndicator.classList.remove('hidden');
        } else {
            submitButton.disabled = false;
            loadingIndicator.classList.add('hidden');
        }
    }


    async function handleRegistration(event) {
        event.preventDefault();
        clearMessage(); 
        setLoading(true); 

        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const password = passwordInput.value; 

        if (!name || !email || !password) {
            displayMessage('All fields are required.', 'error');
            setLoading(false);
            return;
        }
        if (password.length < 6) {
             displayMessage('Password must be at least 6 characters long.', 'error');
             setLoading(false);
             return;
        }
         if (!/^\S+@\S+\.\S+$/.test(email)) {
             displayMessage('Please enter a valid email address.', 'error');
             setLoading(false);
             return;
         }

        const userData = {
            name: name,
            email: email,
            password: password
        };

        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData)
            });

            if (!response.ok) {
                let errorMessage = `HTTP error! Status: ${response.status}`;
                try {
                     const errorData = await response.json();
                     errorMessage = errorData.message || JSON.stringify(errorData) || errorMessage;
                } catch (e) {
                     errorMessage = await response.text() || errorMessage;
                }
                 throw new Error(errorMessage); 
            }

            const result = await response.json(); 

            displayMessage(`Registration successful! User "${result.name}" created with ID: ${result.id}.`, 'success');
            registrationForm.reset(); 

        } catch (error) {
            console.error('Registration failed:', error);
            displayMessage(`Registration failed: ${error.message || 'Please try again later.'}`, 'error');
        } finally {
            setLoading(false);
        }
    }

    registrationForm.addEventListener('submit', handleRegistration);
});
