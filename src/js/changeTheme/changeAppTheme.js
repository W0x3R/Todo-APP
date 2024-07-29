import { setStorageValue } from "../storage/setStorageValue"
import { toggleElements } from "./toggleElements"

export const changeAppTheme = (action, theme) => {
	toggleElements.forEach(item => {
		document.querySelectorAll(item.selector).forEach(e => e.classList[action](item.class))
	})
	setStorageValue('theme', theme)
}