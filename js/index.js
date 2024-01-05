const addTaskButton = document.querySelector('.inner__button-input');
const inputTypeText = document.querySelector('.inner__text-input');
const list = document.querySelector('.inner__list');
const error = document.querySelector('.error');
let todoArr = [];

const showMessage = () => {
	let listMessage = ''
	todoArr.forEach((item, index) => {
		listMessage += `
		<li class ='inner__list-item'>
			<input class = 'inner__list-checkbox' type ='checkbox' id='item_${index}' ${item.checked ? 'checked' : ''}>
			<label for ='item_${index}'>${item.todoValue}</label>
			
			<svg version="1.1" " xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
			width="30px" height="30px" viewBox="0 0 64 64" enable-background="new 0 0 64 64" xml:space="preserve">
			<line fill="none" stroke="#000000" stroke-width="2" stroke-miterlimit="10" x1="39" y1="43" x2="25" y2="29"/>
			<line fill="none" stroke="#000000" stroke-width="2" stroke-miterlimit="10" x1="25" y1="43" x2="39" y2="29"/>
			<polyline fill="none" stroke="#000000" stroke-width="2" stroke-miterlimit="10" points="23,8 10,8 10,63 54,63 54,8 41,8 "/>
			<polygon fill="none" stroke="#000000" stroke-width="2" stroke-miterlimit="10" points="36,5 36,1 28,1 28,5 24,5 22,13 42,13 40,5 
			"/>
			</svg>

		</li>`;
		list.innerHTML = listMessage
		inputTypeText.value = ''
	})
}

list.addEventListener('click', function (e) {
	if (e.target.tagName === 'svg') {
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

	if (todoArr.some(item => item.todoValue === inputTypeText.value)) {
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


