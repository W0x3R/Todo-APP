import { todoArr } from ".."
import { createTaskMarkup } from "./createTaskMarkup"
import { formInput } from "./inputField/focusFormInput"

export const createTask = () => {
	let todoObj = {
		value: formInput.value,
		checked: false,
	}

	todoArr.push(todoObj)
	createTaskMarkup()
	localStorage.setItem('todo', JSON.stringify(todoArr))
}