import { list } from "..";
import { setStorageValue } from "./storage/setStorageValue";
import { todoArr } from "./updateTaskOnLoad";

export const controlItemChecking = (e) => {
	const idInput = e.target.getAttribute('id');
	const labelFor = list.querySelector(`[for=${idInput}]`);
	const valueLabel = labelFor.textContent;
	const todoItem = todoArr.find(item => item.value === valueLabel);

	if (todoItem) {
		todoItem.checked = !todoItem.checked;
		setStorageValue('todo', JSON.stringify(todoArr))
	}
}