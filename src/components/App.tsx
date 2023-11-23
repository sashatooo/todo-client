import React from "react";
import "../App.css";
import { AddItemForm } from "./common/AddItemForm";
import { useMutation, useQuery } from "@apollo/client";
import { ADD_TASK, ADD_TODOLIST, ALL_TODOLISTS, REMOVE_TODOLIST, UPDATE_TASK_STATUS, UPDATE_TODOLIST_TITLE } from "../apollo/todos";
import { Todolist } from "./Todolist";

export type FilterValuesType = "all" | "complited" | "active";

function App() {
  
  const {
    loading,
    error,
    data,
  } = useQuery(ALL_TODOLISTS);

  const [updateTodoListTitle, {loading: UTLTloading, error: UTLTerorr, data: UTLTdata}] = useMutation(UPDATE_TODOLIST_TITLE)
  // const [addTodoList, {loading: ATLloading, error: ATLerorr, data: ATLdata}] = useMutation(ADD_TODOLIST)
  const [deteteTodoList, {loading: DTLloading, error: DTLerorr, data: DTLdata}] = useMutation(REMOVE_TODOLIST)
  const [addNewTask, {loading: ANTloading, error: ANTerorr, data: ANTdata}] = useMutation(ADD_TASK)
  const [updateTaskStatus, {loading: UTSloading, error: UTSerorr, data: UTSdata}] = useMutation(UPDATE_TASK_STATUS)

  const addTodolist = () => {};

if(loading) {
  return <div>Loading...</div>
}
if(error) {
  return <div>Error!!!</div>
}

function removeTodoList(todoListId: string) {
  deteteTodoList({
    variables: {
      id: todoListId
    }
  })
}

function chandgeTodoListTitle(title: string, todoListId: string) {
  updateTodoListTitle({
    variables: {
      id: todoListId,
      title: title
    }
  })
}

function addTask(title: string, todoListId: string) {
  addNewTask({
    variables: {
      title: title,
      isDone: false,
      todolistId: todoListId
    }
  })
}

function chandgeTaskStatus(id: string, isDone: boolean) {
  addNewTask({
    variables: {
      id: id,
      isDone: isDone,
    }
  })
}

  return (
    <div className="App">
      <AddItemForm addItem={addTodolist} />
      {data.todolists.map((tl: any) => {
 
        return (
          <Todolist
            key={tl.id}
            id={tl.id}
            title={tl.title}
            // tasks={taskForTodoList}
            // removeTask={removeTask}
            // changeFilter={changeFilter}
            addTask={addTask}
            chandgeTaskStatus={chandgeTaskStatus}
            filter={tl.filter}
            removeTodoList={removeTodoList}
            // chandgeTaskTitle={chandgeTaskTitle}
            chandgeTodoListTitle={chandgeTodoListTitle}
          />
        );
      })}
    </div>
  );
}

export default App;
