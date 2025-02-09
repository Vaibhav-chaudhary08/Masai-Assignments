let user = { name: "Alice", role: "admin", active: false };
let message = user.role === "admin"
  ? user.active
    ? "Admin Access Granted!"
    : "Admin Access Revoked"
  : user.role === "user"
  ? user.active
    ? "User Access Granted!"
    : "User Access Revoked"
  : "Access Denied";

console.log(message);
const messages = {
  admin: {
    true: "Admin Access Granted!",
    false: "Admin Access Revoked",
  },
  user: {
    true: "User Access Granted!",
    false: "User Access Revoked",
  },
};

const message2 = messages[user.role] && messages[user.role][user.active] || "Access Denied";

console.log(message2);

const message3 = messages[user.role]?.[user.active] ?? "Access Denied";

console.log(message3);
