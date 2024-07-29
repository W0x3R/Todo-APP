import { formInput } from "./focusFormInput"

const formInputPlaceholders = {
	basic: 'Description',
	duplication: 'This value already exists',
	empty: 'The input field is empty.',
}

export const setFormInputPlaceholder = (value) => {
	formInput.setAttribute('placeHolder', formInputPlaceholders[value])
}