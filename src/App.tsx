import React from "react";
import "./App.css";
import MyStepByStepForm from "./tasks/TaskA";
import TaskB from "./tasks/TaskB";
import TaskC from "./tasks/TaskC";

function App() {
  return (
    <div className="App">
      <MyStepByStepForm />
      <TaskB />
      <TaskC />
    </div>
  );
}

export default App;
