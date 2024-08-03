import { formInput } from "../inputField/focusFormInput";
import { setCreateTaskTheme } from "../changeTheme/setCreateTaskTheme";
import { todoArr } from "./updateTaskOnLoad";

export const list = document.querySelector('.form__list');

export const createTaskMarkup = () => {
	const taskTheme = setCreateTaskTheme()
	let [liClass, polygonClass, formLabelClass] = taskTheme

	let listMessage = ''
	todoArr.forEach((el, i) => {
		listMessage += `
		<li class ='form__list-item ${liClass}'>
			<input class = 'form__list-checkbox' type ='checkbox' id='item_${i}' ${el.checked ? 'checked' : ''}>
			<label class = 'form__list-label ${formLabelClass}'  for ='item_${i}'><span>${el.value}</span></label>

			<svg class ='form__delete-list' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><polygon class ='form__polygon ${polygonClass}' points="404.176,0 256,148.176 107.824,0 0,107.824 148.176,256 0,404.176 107.824,512 256,363.824 404.176,512 512,404.176 363.824,256 512,107.824"/></svg>

		</li>`;
		list.innerHTML = listMessage
		formInput.value = ''
	})
}