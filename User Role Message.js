let user = { name: "Alice", role: "admin", active: false };

const message = user.role === "admin"
  ? user.active
    ? "Admin Access Granted!"
    : "Admin Access Revoked"
  : user.role === "user"
  ? user.active
    ? "User Access Granted!"
    : "User Access Revoked"
  : "Access Denied";

console.log(message); 

user = { name: "Bob", role: "user", active: true };

const message2 = user.role === "admin"
  ? user.active
    ? "Admin Access Granted!"
    : "Admin Access Revoked"
  : user.role === "user"
  ? user.active
    ? "User Access Granted!"
    : "User Access Revoked"
  : "Access Denied";

console.log(message2);

user = { name: "Charlie", role: "guest", active: true };

const message3 = user.role === "admin"
  ? user.active
    ? "Admin Access Granted!"
    : "Admin Access Revoked"
  : user.role === "user"
  ? user.active
    ? "User Access Granted!"
    : "User Access Revoked"
  : "Access Denied";

console.log(message3);
