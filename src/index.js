import { focusFormInput, formInput } from './js/inputField/focusFormInput';
import './style.scss';
import { updateTaskOnLoad } from './js/task/updateTaskOnLoad';
import { changeAppTheme } from './js/changeTheme/changeAppTheme';
import { removeEmptyErrorHandling } from './js/inputField/removeEmptyErrorHandling';
import { showBtnUpOnScroll } from './js/showBtnUpOnScroll';
import { clickEvents } from './js/eventHandlers/clickEvents';
import { callClickEvents } from './js/eventHandlers/callClickEvents';
import { list } from './js/task/createTaskMarkup';
import { controlItemChecking } from './js/controlItemChecking';

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