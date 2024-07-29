import { formInput } from "./focusFormInput";

export const setFormInputErrorStyles = (value) => formInput.classList[value]('form__input_error')