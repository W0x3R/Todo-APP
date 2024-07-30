import { changeAppTheme } from "../changeTheme/changeAppTheme";
import { initialCreateTask } from "../task/initialCreateTask";
import { removeTask } from "../task/removeTask";

export const clickEvents = {
	'.form__list': (e) => removeTask(e),
	'.form__task-btn': (e) => initialCreateTask(e),
	'.toggle-theme': () => changeAppTheme('light'),
	'.button-up': () => window.scrollTo(0, 0)
}