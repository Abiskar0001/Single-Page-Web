import React, { useState } from "react";
import axios from "axios";

const StudentForm = ({ refreshStudents }) => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/add-student", { name, age });
      refreshStudents(); // Refresh the list after adding
      setName("");
      setAge("");
    } catch (error) {
      console.error("Error adding student:", error);
    }
  };

  return (
    <div className="container">
      <h2>Add Student</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Name:</label>
          <input className="form-control" type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Age:</label>
          <input className="form-control" type="number" value={age} onChange={(e) => setAge(e.target.value)} required />
        </div>
        <button className="btn btn-primary" type="submit">Add Student</button>
      </form>
    </div>
  );
};

export default StudentForm;