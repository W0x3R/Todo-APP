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
		</li>`;
		list.innerHTML = listMessage
		inputTypeText.value = ''
	})
}

if (localStorage.getItem('todo')) {
	todoArr = JSON.parse(localStorage.getItem('todo'))
	showMessage()
}

addTaskButton.addEventListener('click', function (e) {
	if (inputTypeText.value.length === 0) {
		inputTypeText.classList.add('inner__text-input_error');
		addTaskButton.classList.add('inner__button-input_disabled')
		addTaskButton.textContent = '❌'
		inputTypeText.setAttribute('placeholder', 'Error: The input field is empty.')
		addTaskButton.setAttribute('disabled', '')
		inputTypeText.focus()
		return
	}
	e.preventDefault()

	const isValueAlreadyExists = todoArr.some(item => item.todoValue === inputTypeText.value);

	if (isValueAlreadyExists) {
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

inputTypeText.addEventListener('keydown', function () {
	inputTypeText.classList.remove('inner__text-input_error');
	addTaskButton.classList.remove('inner__button-input_disabled')
	addTaskButton.textContent = 'ADD'
	inputTypeText.setAttribute('placeholder', 'Description')
	addTaskButton.removeAttribute('disabled')
})

inputTypeText.addEventListener('blur', function () {
	inputTypeText.classList.remove('inner__text-input_error');
	addTaskButton.classList.remove('inner__button-input_disabled')
	addTaskButton.textContent = 'ADD'
	inputTypeText.setAttribute('placeholder', 'Description')
	addTaskButton.removeAttribute('disabled')
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