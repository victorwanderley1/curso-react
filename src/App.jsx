import { useEffect, useState } from "react";
import AddTask from "./components/AddTask";
import Tasks from "./components/Tasks";
import { v4 } from "uuid";
import TitlePage from "./components/TitlePage";

function App() {
  const [tasks, setTasks] = useState(
    JSON.parse(localStorage.getItem("tasks")) || [
      {
        id: v4(),
        title: "Estudar programação",
        description:
          "Estudar programação para se tornar um desenvolvedor fullstack",
        isCompleted: false,
      },
      {
        id: v4(),
        title: "Estudar inglês",
        description: "Estudar inglês para se tornar falar mais de um idioma",
        isCompleted: false,
      },
      {
        id: v4(),
        title: "Estudar harmonia",
        description: "Estudar harmonia para se tornar um músico melhor",
        isCompleted: false,
      },
    ]
  );

  function onTaskClick(taskId) {
    const newTask = tasks.map((task) => {
      if (task.id === taskId) {
        return { ...task, isCompleted: !task.isCompleted };
      }
      return task;
    });
    setTasks(newTask);
  }

  function onRemoveTaskClick(taskId) {
    const newTasks = tasks.filter((task) => task.id != taskId);
    setTasks(newTasks);
  }

  function onAddTaskSubmit(title, description) {
    const newTask = {
      id: v4(),
      title,
      description,
      isCompleted: false,
    };
    setTasks([...tasks, newTask]);
  }

  //Quando passar lista vazia, só será executado na primeira vez que o usuario acessar
  useEffect(() => {
    async function fetchTasks() {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/todos?_limit=10",
        {
          method: "GET",
        }
      );
      const data = await response.json();
      console.log(data);
      setTasks(data);
    }
    //fetchTasks();
  }, []);

  //Quando passado com lista NÂO vazia, será executado toda vez que o item passado na lista for alterado
  useEffect(() => {
    console.log("Tasks foi alterado");
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  return (
    <div className="w-screen h-screen bg-slate-500 flex justify-center p-6">
      <div className="w-[500px] space-y-4">
        <TitlePage>Gerenciador de Tarefas</TitlePage>
        <AddTask onAddTaskSubmit={onAddTaskSubmit} />
        <Tasks
          tasks={tasks}
          onTaskClick={onTaskClick}
          onRemoveTaskClick={onRemoveTaskClick}
        />
      </div>
    </div>
  );
}

export default App;
