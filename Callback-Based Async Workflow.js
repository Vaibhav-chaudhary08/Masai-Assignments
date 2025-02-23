function registerUser(username, password, successCallback, errorCallback) {
  setTimeout(() => {
    if (username && password) {
      console.log("User registered successfully.");
      successCallback();
    } else {
      errorCallback("Registration failed: Invalid credentials.");
    }
  }, 1000);
}

function sendVerification(successCallback, errorCallback) {
  setTimeout(() => {
    console.log("Verification email sent.");
    successCallback();
  }, 1000);
}

function loginUser(successCallback, errorCallback) {
  setTimeout(() => {
    console.log("User logged in.");
    successCallback();
  }, 1000);
}

function displayWelcomeMessage() {
  console.log("Welcome to the application!");
}

registerUser("user123", "password123", () => {
  sendVerification(() => {
    loginUser(() => {
      displayWelcomeMessage();
    }, (loginError) => {
      console.error(loginError);
    });
  }, (verificationError) => {
    console.error(verificationError);
  });
}, (registrationError) => {
  console.error(registrationError);
});

registerUser("", "password123", () => {
  sendVerification(() => {
    loginUser(() => {
      displayWelcomeMessage();
    }, (loginError) => {
      console.error(loginError);
    });
  }, (verificationError) => {
    console.error(verificationError);
  });
}, (registrationError) => {
  console.error(registrationError);
});
