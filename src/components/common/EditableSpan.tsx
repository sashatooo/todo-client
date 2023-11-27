import { TextField } from "@mui/material";
import { ChangeEvent, useState } from "react";

type EditableSpanPropsType = {
	title: string;
	chandgeTitle: (title: string) => void
}

export function EditableSpan(props: EditableSpanPropsType) {

	let [editMode, setEditMode] = useState(false)
	let [title, setTitle] = useState("")

	const activateEditMode = () => {
		setEditMode(true)
		setTitle(props.title)
	}
	const activateViewMode = () => {
		setEditMode(false)
		props.chandgeTitle(title)
	}
	const onChandgeTitleHendler = (e: ChangeEvent<HTMLInputElement>) => {setTitle(e.currentTarget.value)}

	return (
		editMode 
			? <TextField value={title} onChange={onChandgeTitleHendler} onBlur={activateViewMode} variant="standard" autoFocus/> 
			: <span onDoubleClick={activateEditMode}>{props.title}</span> 
	)
}
