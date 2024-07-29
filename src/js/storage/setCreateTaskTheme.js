import { getStorageValue } from "./getStorageValue"

export const setCreateTaskTheme = () => {
	let currentTheme = getStorageValue('theme')
	return currentTheme === 'light' ? ['inner__list-item', 'inner-polygon'] : ['inner__list-item_theme-dark', 'inner_delete-list__polygon']
}