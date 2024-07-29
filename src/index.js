import { focusFormInput, formInput } from './js/inputField/focusFormInput';
import { setFormInputErrorStyles } from './js/inputField/setFormInputErrorStyles';
import { setFormInputPlaceholder } from './js/inputField/setFormInputPlaceholder';
import './style.scss';
import { setStorageValue } from './js/storage/setStorageValue';
import { initialCreateTask } from './js/initialCreateTask';
import { removeTask } from './js/removeTask';
import { todoArr, updateTaskOnLoad } from './js/updateTaskOnLoad';
import { changeAppTheme } from './js/changeTheme/changeAppTheme';

export const addTaskButton = document.querySelector('.form__task-btn');
export const list = document.querySelector('.form__list');
const toggleTheme = document.querySelector('.toggle-theme')

list.addEventListener('click', (e) => removeTask(e))
window.addEventListener('load', updateTaskOnLoad)
addTaskButton.addEventListener('click', (e) => initialCreateTask(e))

function handleInputErrorRemove(textContent) {
	setFormInputErrorStyles('remove')
	addTaskButton.classList.remove('form__task-btn_disabled')
	addTaskButton.textContent = textContent
	setFormInputPlaceholder('basic')
	addTaskButton.removeAttribute('disabled')
}

formInput.addEventListener('keydown', function () {
	handleInputErrorRemove('ADD')
})

formInput.addEventListener('blur', function () {
	handleInputErrorRemove('ADD')
})

list.addEventListener('change', function (e) {
	const idInput = e.target.getAttribute('id');
	const labelFor = list.querySelector(`[for=${idInput}]`);
	const valueLabel = labelFor.textContent;
	const todoItem = todoArr.find(item => item.value === valueLabel);

	if (todoItem) {
		todoItem.checked = !todoItem.checked;
		setStorageValue('todo', JSON.stringify(todoArr))
	}
});

let LOCAL_THEME_KEY = 'theme'

function addDarkTheme() {
	changeAppTheme('add', 'dark')
}

function removeDarkTheme() {
	changeAppTheme('remove', 'light')
}

toggleTheme.addEventListener('click', function () {
	localStorage.getItem(LOCAL_THEME_KEY) === 'light' ? addDarkTheme() : removeDarkTheme()
})

localStorage.getItem(LOCAL_THEME_KEY) === 'light' ? removeDarkTheme() : addDarkTheme()

const btnUp = document.querySelector('.button-up')

btnUp.addEventListener('click', function () {
	window.scrollTo(0, 0)
})

window.addEventListener('scroll', function () {
	if (this.scrollY >= 232) {
		btnUp.style.display = 'block'
	}
	else {
		btnUp.style.display = 'none'
	}
})

function centredButtonUp() {
	const windowCenter = btnUp.innerWidth
	const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
	btnUp.style.right = (windowCenter / 2) - scrollBarWidth - btnUp.getBoundingClientRect().width / 2
}

window.addEventListener('resize', centredButtonUp)
window.addEventListener('keydown', focusFormInput)