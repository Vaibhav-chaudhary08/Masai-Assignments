import React, { useState } from "react";

function DynamicEmailForm() {
  const [emails, setEmails] = useState([""]);
  const [errors, setErrors] = useState([]);

  const handleChange = (index, event) => {
    const newEmails = [...emails];
    newEmails[index] = event.target.value;
    setEmails(newEmails);
    validateEmails(newEmails);
  };

  const addEmailField = () => {
    setEmails([...emails, ""]);
  };

  const validateEmails = (emailList) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const newErrors = emailList.map(email => (emailRegex.test(email) ? "" : "Invalid email"));
    setErrors(newErrors);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (errors.some(error => error)) {
      alert("Please fix the errors before submitting.");
    } else {
      alert(`Submitted Emails: ${emails.join(", ")}`);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {emails.map((email, index) => (
        <div key={index}>
          <input
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => handleChange(index, e)}
          />
          {errors[index] && <p style={{ color: "red" }}>{errors[index]}</p>}
        </div>
      ))}
      <button type="button" onClick={addEmailField}>Add Email</button>
      <button type="submit">Submit</button>
    </form>
    <h3>Entered Emails:</h3>
    <ul>
      {emails.map((email, index) => (
        <li key={index}>{email}</li>
      ))}
    </ul>
  );
}

export default DynamicEmailForm;
