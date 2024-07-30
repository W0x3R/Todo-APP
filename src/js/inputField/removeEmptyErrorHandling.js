import { addTaskButton } from "./addEmptyErrorHandling"
import { setFormInputErrorStyles } from "./setFormInputErrorStyles"
import { setFormInputPlaceholder } from "./setFormInputPlaceholder"

export const removeEmptyErrorHandling = () => {
	setFormInputErrorStyles('remove')
	addTaskButton.classList.remove('form__task-btn_disabled')
	addTaskButton.textContent = 'ADD'
	setFormInputPlaceholder('basic')
	addTaskButton.removeAttribute('disabled')
}