const deleteUser = (key) => {
  fetch(`https://your-project-id.firebaseio.com/users/${key}.json`, { // Fixed template literal
    method: 'DELETE',
  })
  .then(response => {
      if (!response.ok) {
          throw new Error('Network response was not ok');
      }
      return response.json()
  })
  .then(() => {
    console.log("User deleted successfully");
    removeUserFromTable(key); // Remove user from table
  })
  .catch(error => console.error("Error deleting user:", error));
};

function removeUserFromTable(key) {
  const row = document.querySelector(`[data-user-key="${key}"]`);
  if (row) {
    row.remove();
  }
}
