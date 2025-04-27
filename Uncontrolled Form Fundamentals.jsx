import React, { useRef } from "react";

function UncontrolledForm() {
  const inputRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Entered text: ${inputRef.current.value}`);
    inputRef.current.value = "";
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Enter text" ref={inputRef} />
      <button type="submit">Submit</button>
    </form>
  );
}

export default UncontrolledForm;
