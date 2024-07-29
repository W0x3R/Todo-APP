import { todoArr } from "./updateTaskOnLoad"
import { createTaskMarkup } from "./createTaskMarkup"
import { formInput } from "./inputField/focusFormInput"
import { setStorageValue } from "./storage/setStorageValue"

export const createTask = () => {
	let todoObj = {
		value: formInput.value,
		checked: false,
	}

	todoArr.push(todoObj)
	createTaskMarkup()
	setStorageValue('todo', JSON.stringify(todoArr))
}