import { todoArr } from "./updateTaskOnLoad";
import { setStorageValue } from "../storage/setStorageValue";

export const removeTask = (e) => {
	const target = e.target
	if (target.closest('.form__delete-list')) {
		const closestLi = target.closest('li')
		const valueLabel = closestLi.querySelector('label').textContent;
		const todoItemIndex = todoArr.findIndex(item => item.value === valueLabel);

		if (todoItemIndex !== -1) {
			todoArr.splice(todoItemIndex, 1);
			setStorageValue('todo', JSON.stringify(todoArr))
			closestLi.remove();
		}
	}
}