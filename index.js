let items = [
	"Сделать проектную работу",
	"Полить цветы",
	"Пройти туториал по Реакту",
	"Сделать фронт для своего проекта",
	"Прогуляться по улице в солнечный день",
	"Помыть посуду",
];

const listElement = document.querySelector(".to-do__list");
const formElement = document.querySelector(".to-do__form");
const inputElement = document.querySelector(".to-do__input");

const loadTasks = () => {
	const tasks = localStorage.getItem('tasks');

	if (tasks) {
		return JSON.parse(tasks);
	}

	return items;
};

const createItem = (item) => {
	const template = document.getElementById("to-do__item-template");
	const clone = template.content.querySelector(".to-do__item").cloneNode(true);
	const textElement = clone.querySelector(".to-do__item-text");
	const deleteButton = clone.querySelector(".to-do__item-button_type_delete");
	const duplicateButton = clone.querySelector(".to-do__item-button_type_duplicate");
	const editButton = clone.querySelector(".to-do__item-button_type_edit");

	textElement.textContent = item;

	deleteButton.addEventListener("click", () => {
		clone.remove();
		items = getTasksFromDOM();
		saveTasks(items);
	});

	duplicateButton.addEventListener("click", () => {
		const itemName = textElement.textContent;
		const newItem = createItem(itemName);

		listElement.prepend(newItem);
		items = getTasksFromDOM();
		saveTasks(items);
	});

	editButton.addEventListener("click", () => {
		textElement.setAttribute("contenteditable", true);
		textElement.focus();
	});

	textElement.addEventListener("blur", () => {
		textElement.setAttribute("contenteditable", false);
		items = getTasksFromDOM();
		saveTasks(items);
	});

	return clone;
};

const getTasksFromDOM = () => {
	const itemsNamesElements = document.querySelectorAll(".to-do__item-text");
	const tasks = [];

	itemsNamesElements.forEach((itemElement) => {
		tasks.push(itemElement.textContent);
	});

	return tasks;
};

const saveTasks = (tasks) => {
	localStorage.setItem('tasks', JSON.stringify(tasks));
};

items = loadTasks();

items.forEach((item) => {
	const listItem = createItem(item);
	listElement.append(listItem);
});

formElement.addEventListener("submit", (e) => {
	const item = inputElement.value;
	const listItem = createItem(item);

	listElement.prepend(listItem);
	items = getTasksFromDOM();
	saveTasks(items);
	inputElement.value = "";

	e.preventDefault();
});
