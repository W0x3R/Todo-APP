import { getListTheme, getPolygonTheme, inputTypeText, list, todoArr } from "..";

export const createTaskItem = () => {
	let listMessage = ''
	todoArr.forEach((el, i) => {
		listMessage += `
		<li class ='${getListTheme()}'>
			<input class = 'inner__list-checkbox' type ='checkbox' id='item_${i}' ${el.checked ? 'checked' : ''}>
			<label class = 'inner__list-label'  for ='item_${i}'><span>${el.value}</span></label>

			<svg class ='inner_delete-list' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><polygon class ='${getPolygonTheme()}' points="404.176,0 256,148.176 107.824,0 0,107.824 148.176,256 0,404.176 107.824,512 256,363.824 404.176,512 512,404.176 363.824,256 512,107.824"/></svg>

		</li>`;
		list.innerHTML = listMessage
		inputTypeText.value = ''
	})
}