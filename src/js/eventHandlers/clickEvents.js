import { changeAppTheme } from "../changeTheme/changeAppTheme";
import { initialCreateTask } from "../initialCreateTask";
import { removeTask } from "../removeTask";

export const clickEvents = {
	'.form__list': (e) => removeTask(e),
	'.form__task-btn': (e) => initialCreateTask(e),
	'.toggle-theme': () => changeAppTheme('light'),
	'.button-up': () => window.scrollTo(0, 0)
}