import { getStorageValue } from "../storage/getStorageValue"
import { addDarkTheme, removeDarkTheme } from "./controlDarkTheme"

export const changeAppTheme = (checkedStorageValue) => {
	const themeStorageValue = getStorageValue('theme')
	themeStorageValue === checkedStorageValue ? addDarkTheme() : removeDarkTheme()
}