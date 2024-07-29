import { createTaskItem } from './js/createTaskItem';
import { duplicateErrorHandling } from './js/inputField/duplicateErrorHandling';
import { addEmptyErrorHandling } from './js/inputField/addEmptyErrorHandling';
import { focusFormInput, formInput } from './js/inputField/focusFormInput';
import { setFormInputErrorStyles } from './js/inputField/setFormInputErrorStyles';
import { setFormInputPlaceholder } from './js/inputField/setFormInputPlaceholder';
import './style.scss';

export const addTaskButton = document.querySelector('.form__task-btn');
const inner = document.querySelector('.inner')
export const list = document.querySelector('.form__list');
const error = document.querySelector('.error');
const toggleTheme = document.querySelector('.toggle-theme')
const toggleThemeFill = document.querySelectorAll('.toggle-theme path');

export let todoArr = [];

list.addEventListener('click', function (e) {
	if (e.target.tagName === 'polygon' || e.target.tagName === 'svg') {
		const closestLi = e.target.closest('li')
		const valueLabel = closestLi.querySelector('label').textContent;
		const todoItemIndex = todoArr.findIndex(item => item.value === valueLabel);

		if (todoItemIndex !== -1) {
			todoArr.splice(todoItemIndex, 1);
			localStorage.setItem('todo', JSON.stringify(todoArr));
			closestLi.remove();
		}
	}
})

if (localStorage.getItem('todo')) {
	todoArr = JSON.parse(localStorage.getItem('todo'))
	createTaskItem()
}

addTaskButton.addEventListener('click', function (e) {
	let todoObj = {
		value: formInput.value,
		checked: false,
	}

	e.preventDefault()

	if (formInput.value.length === 0) {
		addEmptyErrorHandling()
	}

	else if (todoArr.some(item => item.value === formInput.value.trim())) {
		duplicateErrorHandling()
	}
	else {
		todoArr.push(todoObj)
		createTaskItem()
		localStorage.setItem('todo', JSON.stringify(todoArr))
	}
})

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
		localStorage.setItem('todo', JSON.stringify(todoArr));
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
	localStorage.setItem(LOCAL_THEME_KEY, theme);
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