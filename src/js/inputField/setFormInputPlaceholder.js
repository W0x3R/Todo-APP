import { formInput } from "./focusFormInput"
import { formInputPlaceholders } from "./formInputPlaceholders"

export const setFormInputPlaceholder = (value) => {
	formInput.setAttribute('placeHolder', formInputPlaceholders[value])
}