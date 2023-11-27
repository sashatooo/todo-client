import "../App.css";
import { AddItemForm } from "./common/AddItemForm";
import { useMutation, useQuery } from "@apollo/client";
import { ADD_TASK, ADD_TODOLIST, ALL_TODOLISTS, CHANGE_TODOLIST_FILTER, GET_TASK_BYID_TODO, REMOVE_TASK, REMOVE_TODOLIST, UPDATE_TASK_STATUS, UPDATE_TASK_TITLE, UPDATE_TODOLIST_TITLE } from "../apollo/todos";
import { Todolist } from "./Todolist";
import { useEffect, useState } from "react";
import { AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography } from "@mui/material";
import { Menu } from "@mui/icons-material";

export type FilterValuesType = "all" | "complited" | "active";

function App() {

  
  
  const {
    loading,
    error,
    data,
  } = useQuery(ALL_TODOLISTS);

  // const [todos, setTodos] = useState(data)

  // useEffect(()=>{
  //   if(data) {
  //     setTodos(data)
  //   }
  // },[loading])


  console.log("render APP", data)

  const [updateTodoListTitle, {loading: UTLTloading, error: UTLTerorr, data: UTLTdata}] = useMutation(UPDATE_TODOLIST_TITLE)
  const [addTodoList, {loading: ATLloading, error: ATLerorr, data: ATLdata}] = useMutation(ADD_TODOLIST, {
    // refetchQueries: [
    //   {query: ALL_TODOLISTS}
    // ]
    update(cache, { data: {addTodolist }}) {
      const { todolists }: any = cache.readQuery({query: ALL_TODOLISTS})
      cache.writeQuery({
        query: ALL_TODOLISTS,
        data: {
          todolists: [addTodolist, ...todolists]
        }
      })
    }
  })
  const [deteteTodoList, {loading: DTLloading, error: DTLerorr, data: DTLdata}] = useMutation(REMOVE_TODOLIST,{
    update(cache, {data: {deleteTodolist} }) {
      cache.modify({
        fields: {
          todolists(currentTodolists = []) {
            return currentTodolists.filter((tl: any) => tl.__ref !== `Todolist:${deleteTodolist.id}`)
          }
        }
      })
    }
  })

  const [updateTaskStatus, {loading: UTSloading, error: UTSerorr, data: UTSdata}] = useMutation(UPDATE_TASK_STATUS)
  const [updateTaskTitle, {loading: UTTloading, error: UTTerorr, data: UTTdata}] = useMutation(UPDATE_TASK_TITLE)
  
  // const [chandgeTodolistFilter, {loading: CTLFloading, error: CTLFerorr, data: CTLFdata}] = useMutation(CHANGE_TODOLIST_FILTER)



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

function addNewTodolist(title: string) {
  addTodoList({
    variables: {
      title: title
    }
  })
}





// ---------------

function chandgeTaskStatus(id: string, isDone: boolean) {
  updateTaskStatus({
    variables: {
      id: id,
      isDone: isDone,
    }
  })
}

function chandgeTaskTitle(id: string, title: string) {
  updateTaskTitle({
    variables: {
      id,
      title: title,
    }
  })
}

// ---------------
const addTodolist = (title: string) => {
  addNewTodolist(title)
};


  return (
    <div className="App">

      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <Menu />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            News
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>

      <Container fixed>
        <Grid container style={ {paddingBottom: "15px", paddingTop: "15px"}}>
          <Paper  elevation={6} style={ {padding: "10px"}}>
            <AddItemForm addItem={addTodolist} value={'Enter todolist title'}/>
          </Paper>
        </Grid>
        <Grid container spacing={5}>
          {data.todolists.map((tl: any) => {
            return (
              <Grid key={tl.id} item>
                <Paper  elevation={6} style={ {padding: "10px"}}>
                  <Todolist
                      key={tl.id}
                      id={tl.id}
                      title={tl.title}
                      // tasks={taskForTodoList}
                      // removeTask={removeTask}
                      // changeFilter={changeFilter}
                      // addTask={addTask}
                      chandgeTaskStatus={chandgeTaskStatus}
                      filter={tl.filter}
                      removeTodoList={removeTodoList}
                      chandgeTaskTitle={chandgeTaskTitle}
                      chandgeTodoListTitle={chandgeTodoListTitle}
                    />
                </Paper>
              </Grid>
            );
          })}
        </Grid> 
      </Container>
    </div>
  );
}

export default App;
