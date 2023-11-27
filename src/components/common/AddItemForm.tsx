import { ControlPoint } from "@mui/icons-material";
import { Button, IconButton, TextField } from "@mui/material";
import { ChangeEvent, KeyboardEvent, useState } from "react";

type AddItemFormPropsType = {
  addItem: (title: string) => void;
  value: string;
};

export function AddItemForm(props: AddItemFormPropsType) {
  let [newTitle, setNewTitle] = useState("");
  let [error, setError] = useState<string | null>(null);

  function onNewTitleChangeHendler(e: ChangeEvent<HTMLInputElement>) {
    setNewTitle(e.currentTarget.value);
  }

  function onKeyPressHendler(e: KeyboardEvent<HTMLInputElement>) {
    setError(null);
    if (e.charCode === 13) {
      addNewItem();
    }
  }

  function addNewItem() {
    if (newTitle.trim() !== "") {
      props.addItem(newTitle.trim());
      setNewTitle("");
    } else {
      setError("Field is required");
    }
  }

  return (
    <div>
      {/* <input
        value={newTitle}
        onChange={onNewTitleChangeHendler}
        onKeyPress={onKeyPressHendler}
        className={error ? "error" : ""}
      /> */}
      <TextField
              value={newTitle}
              onChange={onNewTitleChangeHendler}
              onKeyPress={onKeyPressHendler}
              className={error ? "error" : ""} 
              variant="outlined"
              label={props.value} 
              error={!!error}
              helperText={error}/>
      <IconButton onClick={addNewItem} color="primary">
        <ControlPoint />
      </IconButton>
    </div>
  );
}
