import { ChangeEvent, useState } from "react"
import { AddItemForm } from "./common/AddItemForm"
import { FilterValuesType } from "./App"
import { EditableSpan } from "./common/EditableSpan"
import { useMutation, useQuery } from "@apollo/client"
import { ADD_TASK, ALL_TODOLISTS, CHANGE_TODOLIST_FILTER, GET_TASK_BYID_TODO, REMOVE_TASK } from "../apollo/todos"
import { Button, Checkbox, IconButton } from "@mui/material"
import { Delete } from "@mui/icons-material"

import  styles  from "../styles/Todolist.module.css"

export type TaskType = {
	id: string
	title: string
	isDone: boolean
}

type PropsType = {
	id: string
	title: string
	// tasks: Array<TaskType>
	filter: FilterValuesType
	// removeTask: (id: string) => void
	// changeFilter: (todoListId: string, value: FilterValuesType) => void
	// addTask: (title: string, todoListId: string) => void
	chandgeTaskStatus: (id: string, title: string, isDone: boolean, todoListId: string) => void
	removeTodoList: (todoListId: string) => void
	chandgeTodoListTitle: (title: string, todoListId: string) => void
	chandgeTaskTitle: (taskId: string, title: string) => void
}

export function Todolist(props: PropsType) {


	// const [taskFilter, setTaskFilter] = useState(props.filter)
	
	const { loading, error, data } = useQuery(GET_TASK_BYID_TODO, {variables:  {id: props.id ,filter: props.filter}});
	const [chandgeTodolistFilter, {loading: CTLFloading, error: CTLFerorr, data: CTLFdata}] = useMutation(CHANGE_TODOLIST_FILTER)
	const [addNewTask, {loading: ANTloading, error: ANTerorr, data: ANTdata}] = useMutation(ADD_TASK, {
		refetchQueries: [ {query: GET_TASK_BYID_TODO, variables:{id: props.id ,filter: props.filter} } ]
	})
	const [deleteTask, {loading: DTloading, error: DTerorr, data: DTdata}] = useMutation(REMOVE_TASK, {
		refetchQueries: [{query: GET_TASK_BYID_TODO, variables:{id: props.id ,filter: props.filter} }]
	})


	console.log('render TodoList', props.title, data, props.filter)	

	function changeFilter(id: string, filter: FilterValuesType) {
		chandgeTodolistFilter({
		  variables: {
			id,
			filter
		  }
		})
	  } 

	  function addNTask(title: string, todoListId: string) {
		addNewTask({
		  variables: {
			title: title,
			isDone: false,
			todolistId: todoListId
		  }
		})
	  }

	  function removeTask(id: string) {
		deleteTask({
		  variables: {
			id,
		  }
		})
	  }



	const onAllClickHendler = () => {
		changeFilter(props.id, "all")
		// setTaskFilter("all")
	}
	const onComplitedClickHendler = () => {
		changeFilter(props.id, "complited")
		// setTaskFilter("complited")
	}
	const onActiveClickHendler = () => {
		changeFilter(props.id, "active")
		// setTaskFilter("active")
	}
	
	const onClickHendler = () => {props.removeTodoList(props.id)}
	const chandgeTodoListTitle = (title: string) => {props.chandgeTodoListTitle(title, props.id)}



	function addTask(title: string) {
		addNTask(title, props.id)
	}



	return (
		<div>
			<h3>
				<EditableSpan title={props.title} chandgeTitle={chandgeTodoListTitle}/>
				<IconButton onClick={onClickHendler}>
					<Delete />
				</IconButton>
			</h3>
			<AddItemForm addItem={addTask} value={'Enter task title'}/>
			<div className={styles.tasklist}>
				{data?.tasks.map((t: any) => {
					
					const onChandgeHengler = (e: ChangeEvent<HTMLInputElement>) => {props.chandgeTaskStatus(t.id, t.title, e.currentTarget.checked, t.todolistId)}
					const chandgeTaskTitleHendler = (title: string) => {props.chandgeTaskTitle(t.id, title) }
					const onremoveHendler = () => {removeTask(t.id)}

					return (
						<div key={t.id} className={t.isDone ? "is-done" : ""}>
							<Checkbox checked={t.isDone} onChange={onChandgeHengler}/>
							<EditableSpan title={t.title} chandgeTitle={chandgeTaskTitleHendler}/>
							<IconButton onClick={onremoveHendler}>
								<Delete />
							</IconButton>
						</div>
					)} 
				)}
			</div>
			<div>
				<Button 
					variant={props.filter === "all" ? "contained" : "text"} 
					onClick={onAllClickHendler}>
					all</Button>
				<Button 
					color={'primary'} 
					variant={props.filter === "complited" ? "contained" : "text"} 
					onClick={onComplitedClickHendler}>
					active</Button>
				<Button
					color={'secondary'} 
					variant={props.filter === "active" ? "contained" : "text"} 
					onClick={onActiveClickHendler}>
					complited</Button>
			</div>
		</div>
	)
}


