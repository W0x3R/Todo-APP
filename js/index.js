const addTaskButton = document.querySelector('.inner__button-input'),
	inputTypeText = document.querySelector('.inner__text-input'),
	list = document.querySelector('.inner__list'),
	error = document.querySelector('.error')

inputTypeText.addEventListener('blur', function (e) {
	if (this.value.length === 0) {
		inputTypeText.classList.add('inner__text-input_error');
		addTaskButton.classList.add('inner__button-input_disabled')
		inputTypeText.setAttribute('placeholder', 'Error: The input field is empty.')
		addTaskButton.setAttribute('disabled', '')
	}
	else {
		addTaskButton.removeAttribute('disabled')
	}
})

let todoArr = []
addTaskButton.addEventListener('click', function (e) {
	e.preventDefault()
	let todoObj = {
		todoValue: inputTypeText.value,
		checked: false
	}
	todoArr.push(todoObj)
	showMessage()

})

const showMessage = () => {
	let listMessage = ''
	todoArr.forEach((item, index) => {
		listMessage += `
		<li class ='inner__list-item'>
			<input class = 'inner__list-checkbox' type ='checkbox' id='item_${index}'>
			<label for ='item_${index}'>${item.todoValue}</label>
		</li>`;
		list.innerHTML = listMessage
		inputTypeText.value = ''
	})

}