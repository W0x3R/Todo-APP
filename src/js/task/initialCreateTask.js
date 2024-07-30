import { todoArr } from "./updateTaskOnLoad"
import { createTask } from "./createTask"
import { addEmptyErrorHandling } from "../inputField/addEmptyErrorHandling"
import { duplicateErrorHandling } from "../inputField/duplicateErrorHandling"
import { formInput } from "../inputField/focusFormInput"

const isFormInputEmpty = (input) => input.length === 0
const isFormInputDuplicate = (input) => todoArr.some(item => item.value === input)

export const initialCreateTask = (e) => {
	e.preventDefault()
	const formInputValue = (formInput.value).trim()

	if (isFormInputEmpty(formInputValue)) {
		addEmptyErrorHandling()
	} else if (isFormInputDuplicate(formInputValue)) {
		duplicateErrorHandling()
	} else {
		createTask()
	}
}