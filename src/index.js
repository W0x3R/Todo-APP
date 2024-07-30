import { focusFormInput, formInput } from './js/inputField/focusFormInput';
import './style.scss';
import { initialCreateTask } from './js/initialCreateTask';
import { removeTask } from './js/removeTask';
import { updateTaskOnLoad } from './js/updateTaskOnLoad';
import { changeAppTheme } from './js/changeTheme/changeAppTheme';
import { removeEmptyErrorHandling } from './js/inputField/removeEmptyErrorHandling';

export const addTaskButton = document.querySelector('.form__task-btn');
export const list = document.querySelector('.form__list');
const toggleTheme = document.querySelector('.toggle-theme')

list.addEventListener('click', (e) => removeTask(e))
window.addEventListener('load', () => {
	updateTaskOnLoad()
	changeAppTheme('dark')
})

addTaskButton.addEventListener('click', (e) => initialCreateTask(e))
formInput.addEventListener('keydown', removeEmptyErrorHandling)
formInput.addEventListener('blur', removeEmptyErrorHandling)
list.addEventListener('change', (e) => controlItemChecking(e));
toggleTheme.addEventListener('click', () => changeAppTheme('light'))

const btnUp = document.querySelector('.button-up')

btnUp.addEventListener('click', () => window.scrollTo(0, 0))

window.addEventListener('scroll', function () {
	if (this.scrollY >= 232) {
		btnUp.style.display = 'block'
	}
	else {
		btnUp.style.display = 'none'
	}
})

window.addEventListener('keydown', focusFormInput)