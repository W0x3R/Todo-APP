const addTaskButton = document.querySelector('.inner__button-input');
const inputTypeText = document.querySelector('.inner__text-input');
const inner = document.querySelector('.inner')
const list = document.querySelector('.inner__list');
const error = document.querySelector('.error');
const toggleTheme = document.querySelector('.inner_toggle-theme')
const toggleThemeFill = document.querySelectorAll('.inner_toggle-theme path');
const footerText = document.querySelector('.footer__text')

let todoArr = [];

const showMessage = () => {
	let listMessage = ''
	todoArr.forEach((item, index) => {
		listMessage += `
		<li class ='inner__list-item'>
			<input class = 'inner__list-checkbox' type ='checkbox' id='item_${index}' ${item.checked ? 'checked' : ''}>
			<label  for ='item_${index}'><span>${item.todoValue}</span></label>

			<svg class ='inner_delete-list' version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve"><polygon  points="404.176,0 256,148.176 107.824,0 0,107.824 148.176,256 0,404.176 107.824,512 256,363.824 404.176,512 512,404.176 363.824,256 512,107.824 "/></svg>

		</li>`;
		list.innerHTML = listMessage
		inputTypeText.value = ''
	})
}

list.addEventListener('click', function (e) {
	if (e.target.tagName === 'polygon' || e.target.tagName === 'svg') {
		const closestLi = e.target.closest('li')
		const valueLabel = closestLi.querySelector('label').textContent;
		const todoItemIndex = todoArr.findIndex(item => item.todoValue === valueLabel);

		if (todoItemIndex !== -1) {
			todoArr.splice(todoItemIndex, 1);
			localStorage.setItem('todo', JSON.stringify(todoArr));
			closestLi.remove();
		}
	}
})

if (localStorage.getItem('todo')) {
	todoArr = JSON.parse(localStorage.getItem('todo'))
	showMessage()
}

addTaskButton.addEventListener('click', function (e) {
	e.preventDefault()

	if (inputTypeText.value.length === 0) {
		handleInputErrorAdd('Error: The input field is empty.')
		return
	}

	if (todoArr.some(item => item.todoValue === inputTypeText.value.trim())) {
		inputTypeText.focus()
		inputTypeText.setAttribute('placeholder', 'Error: This value already exists')
		inputTypeText.value = ''
		return;
	}

	let todoObj = {
		todoValue: inputTypeText.value,
		checked: false,
	}

	todoArr.push(todoObj)
	showMessage()

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
	const valueLabel = labelFor.innerHTML;
	const todoItem = todoArr.find(item => item.todoValue === valueLabel);

	if (todoItem) {
		todoItem.checked = !todoItem.checked;
		localStorage.setItem('todo', JSON.stringify(todoArr));
	}
});


const polygon = document.querySelectorAll('polygon')
const allLi = document.querySelectorAll('li')
const innerTextInput = document.querySelector('.inner__label-text-input')
const innerListTitle = document.querySelector('.inner__list-title')
const innerButtonUpRect = document.querySelector('.inner_button-up-rect')
const innerButtonUpPath = document.querySelector('.inner_button-up-path')
const innerButtonUpPolygon = document.querySelector('.inner_button-up-polygon')

let LOCAL_THEME_KEY = 'theme'

function changeTheme(action, toggleFill, theme) {
	document.body.classList[action]('body_dark')
	inner.classList[action]('inner_dark')
	footerText.classList[action]('footer__text_dark')
	polygon.forEach(e => e.classList[action]('inner__polygon'));
	allLi.forEach(e => e.classList[action]('inner__list-item_dark'));
	innerTextInput.classList[action]('inner__label-text-input_dark')
	innerListTitle.classList[action]('inner__list-title_dark')
	innerButtonUpRect.classList[action]('inner_button-up-rect-dark')
	innerButtonUpPath.classList[action]('inner_button-up-path-dark')
	innerButtonUpPolygon.classList[action]('inner_button-up-polygon-dark')
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
	localStorage.getItem(LOCAL_THEME_KEY) === 'light' ? addDarkTheme() : removeDarkTheme()
})

localStorage.getItem(LOCAL_THEME_KEY) === 'light' ? removeDarkTheme() : addDarkTheme()

const btnUp = document.querySelector('.inner_button-up')


btnUp.addEventListener('click', function () {
	window.scrollTo(0, 0)
})

window.addEventListener('scroll', function () {
	console.log(this.scrollY);
	if (this.scrollY >= 232) {
		btnUp.style.display = 'block'
	}
	else {
		btnUp.style.display = 'none'
	}
})

window.addEventListener('resize', function () {
	const windowCenter = this.innerWidth
	const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
	btnUp.style.right = (windowCenter / 2) - scrollBarWidth - btnUp.getBoundingClientRect().width / 2
})
