import { createTaskMarkup } from "./createTaskMarkup";
import { getStorageValue } from "./storage/getStorageValue"

export let todoArr = [];

export const updateTaskOnLoad = () => {
	const todo = getStorageValue('todo')
	if (todo) {
		todoArr = JSON.parse(todo)
		createTaskMarkup()
	}
}