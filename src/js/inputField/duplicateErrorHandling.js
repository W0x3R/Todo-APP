import { focusFormInput, formInput } from "./focusFormInput"
import { setFormInputErrorStyles } from "./setFormInputErrorStyles"
import { setFormInputPlaceholder } from "./setFormInputPlaceholder"

export const duplicateErrorHandling = () => {
	focusFormInput()
	setFormInputPlaceholder('duplication')
	setFormInputErrorStyles('add')
	formInput.value = ''
}