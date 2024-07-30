import { focusFormInput, formInput } from './js/inputField/focusFormInput';
import './style.scss';
import { updateTaskOnLoad } from './js/updateTaskOnLoad';
import { changeAppTheme } from './js/changeTheme/changeAppTheme';
import { removeEmptyErrorHandling } from './js/inputField/removeEmptyErrorHandling';
import { showBtnUpOnScroll } from './js/showBtnUpOnScroll';
import { clickEvents } from './js/eventHandlers/clickEvents';
import { callClickEvents } from './js/eventHandlers/callClickEvents';

export const addTaskButton = document.querySelector('.form__task-btn');
export const list = document.querySelector('.form__list');

window.addEventListener('load', () => {
	updateTaskOnLoad()
	changeAppTheme('dark')
})

formInput.addEventListener('keydown', removeEmptyErrorHandling)
formInput.addEventListener('blur', removeEmptyErrorHandling)
list.addEventListener('change', (e) => controlItemChecking(e));
window.addEventListener('click', (e) => callClickEvents(e, clickEvents))
window.addEventListener('scroll', showBtnUpOnScroll)
window.addEventListener('keydown', focusFormInput)