import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import StudentForm from "./components/StudentForm";
import StudentList from "./components/StudentList";

function App() {
  const [refresh, setRefresh] = useState(false);

  return (
    <div className="container mt-5">
      <h1 className="text-center">Student Database</h1>
      <StudentForm refreshStudents={() => setRefresh(!refresh)} />
      <StudentList refresh={refresh} />
    </div>
  );
}

export default App;