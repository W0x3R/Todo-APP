import { addTaskButton } from "../..";
import { focusFormInput } from "./focusFormInput";
import { setFormInputErrorStyles } from "./setFormInputErrorStyles";
import { setFormInputPlaceholder } from "./setFormInputPlaceholder";

export const addEmptyErrorHandling = () => {
	setFormInputErrorStyles('add')
	addTaskButton.classList.add('form__task-btn_disabled');
	addTaskButton.textContent = '❌';
	setFormInputPlaceholder('empty')
	addTaskButton.setAttribute('disabled', '');
	focusFormInput()
}