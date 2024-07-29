import { focusFormInput, formInput } from './js/inputField/focusFormInput';
import { setFormInputErrorStyles } from './js/inputField/setFormInputErrorStyles';
import { setFormInputPlaceholder } from './js/inputField/setFormInputPlaceholder';
import './style.scss';
import { setStorageValue } from './js/storage/setStorageValue';
import { initialCreateTask } from './js/initialCreateTask';
import { removeTask } from './js/removeTask';
import { todoArr, updateTaskOnLoad } from './js/updateTaskOnLoad';

export const addTaskButton = document.querySelector('.form__task-btn');
const inner = document.querySelector('.inner')
export const list = document.querySelector('.form__list');
const error = document.querySelector('.error');
const toggleTheme = document.querySelector('.toggle-theme')
const toggleThemeFill = document.querySelectorAll('.toggle-theme path');

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

const allLi = document.querySelectorAll('li')
const formLabelTask = document.querySelector('.form__label-task')
const formTitle = document.querySelector('.form__title')
const innerButtonUpRect = document.querySelector('.button-up-rect')
const innerButtonUpPath = document.querySelector('.button-up-path')
const innerButtonUpPolygon = document.querySelector('.button-up-polygon')
let LOCAL_THEME_KEY = 'theme'

function changeTheme(action, toggleFill, theme) {
	document.body.classList[action]('body_theme-dark')
	inner.classList[action]('inner_theme-dark')
	formLabelTask.classList[action]('form__label-task_theme-dark')
	formTitle.classList[action]('form__title_theme-dark')
	innerButtonUpRect.classList[action]('button-up-rect_theme-dark')
	innerButtonUpPath.classList[action]('button-up-path_theme-dark')
	innerButtonUpPolygon.classList[action]('button-up-polygon_theme-dark')
	toggleThemeFill.forEach(e => e.style.fill = toggleFill)
	setStorageValue(LOCAL_THEME_KEY, theme)
}

function addDarkTheme() {
	changeTheme('add', '#fff', 'dark')
}

function removeDarkTheme() {
	changeTheme('remove', '#000', 'light')
}

toggleTheme.addEventListener('click', function () {
	location.reload()
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