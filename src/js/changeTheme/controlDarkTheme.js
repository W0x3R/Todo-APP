import { setAppTheme } from "./setAppTheme"

export const addDarkTheme = () => setAppTheme('add', 'dark')
export const removeDarkTheme = () => setAppTheme('remove', 'light')