import { createTaskItem } from './js/createTaskItem';
import './style.scss';

const addTaskButton = document.querySelector('.inner__button-input');
export const inputTypeText = document.querySelector('.inner__text-input');
const inner = document.querySelector('.inner')
export const list = document.querySelector('.inner__list');
const error = document.querySelector('.error');
const toggleTheme = document.querySelector('.inner_toggle-theme')
const toggleThemeFill = document.querySelectorAll('.inner_toggle-theme path');

export let todoArr = [];

export function getListTheme() {
	return localStorage.getItem('theme') === 'light' ? 'inner__list-item' : 'inner__list-item_theme-dark'
}

export function getPolygonTheme() {
	return localStorage.getItem('theme') === 'light' ? 'inner-polygon' : 'inner_delete-list__polygon'
}

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

function checkingRepeatValue() {
	inputTypeText.focus()
	inputTypeText.setAttribute('placeholder', 'Error: This value already exists')
	inputTypeText.classList.add('inner__text-input_error');
	inputTypeText.value = ''
}

if (localStorage.getItem('todo')) {
	todoArr = JSON.parse(localStorage.getItem('todo'))
	createTaskItem()
}

addTaskButton.addEventListener('click', function (e) {
	e.preventDefault()

	if (inputTypeText.value.length === 0) {
		handleInputErrorAdd('Error: The input field is empty.')
		return
	}

	if (todoArr.some(item => item.value === inputTypeText.value.trim())) {
		checkingRepeatValue()
		return;
	}

	let todoObj = {
		value: inputTypeText.value,
		checked: false,
	}

	todoArr.push(todoObj)
	createTaskItem()

	localStorage.setItem('todo', JSON.stringify(todoArr))
})

function handleInputErrorAdd(message) {
	inputTypeText.classList.add('inner__text-input_error');
	addTaskButton.classList.add('inner__button-input_disabled');
	addTaskButton.textContent = '❌';
	inputTypeText.setAttribute('placeholder', message);
	addTaskButton.setAttribute('disabled', '');
	inputTypeText.focus();
}

function handleInputErrorRemove(textContent, placeholder) {
	inputTypeText.classList.remove('inner__text-input_error');
	addTaskButton.classList.remove('inner__button-input_disabled')
	addTaskButton.textContent = textContent
	inputTypeText.setAttribute('placeholder', placeholder)
	addTaskButton.removeAttribute('disabled')
}

inputTypeText.addEventListener('keydown', function () {
	handleInputErrorRemove('ADD', 'Description')
})

inputTypeText.addEventListener('blur', function () {
	handleInputErrorRemove('ADD', 'Description')
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
const labelForTextInput = document.querySelector('.inner__label-text-input')
const innerListTitle = document.querySelector('.inner__list-title')
const innerButtonUpRect = document.querySelector('.inner_button-up-rect')
const innerButtonUpPath = document.querySelector('.inner_button-up-path')
const innerButtonUpPolygon = document.querySelector('.inner_button-up-polygon')
let LOCAL_THEME_KEY = 'theme'

function changeTheme(action, toggleFill, theme) {
	document.body.classList[action]('body_theme-dark')
	inner.classList[action]('inner_theme-dark')
	labelForTextInput.classList[action]('inner__label-text-input_theme-dark')
	innerListTitle.classList[action]('inner__list-title_theme-dark')
	innerButtonUpRect.classList[action]('inner_button-up-rect_theme-dark')
	innerButtonUpPath.classList[action]('inner_button-up-path_theme-dark')
	innerButtonUpPolygon.classList[action]('inner_button-up-polygon_theme-dark')
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

const btnUp = document.querySelector('.inner_button-up')

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

window.addEventListener('keydown', function () {
	inputTypeText.focus()
})


