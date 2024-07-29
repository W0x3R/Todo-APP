import { getStorageValue } from "./getStorageValue"

export const setCreateTaskTheme = () => {
	let currentTheme = getStorageValue('theme')
	return currentTheme === 'light' ? ['', ''] : ['form__list-item_theme-dark', 'form__polygon_theme-dark']
}