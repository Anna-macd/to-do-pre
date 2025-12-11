const listElement = document.querySelector(".to-do__list");
const formElement = document.querySelector(".to-do__form");
const inputElement = document.querySelector(".to-do__input");


let items = loadTasks();

items.forEach(function(item) {
    const taskElement = createItem(item);
    listElement.append(taskElement);
});

formElement.addEventListener('submit', function(event) {
    event.preventDefault();
    
    const taskText = inputElement.value;
    
    if (taskText.trim()) {
        const taskElement = createItem(taskText);
        listElement.prepend(taskElement);
        
        items = getTasksFromDOM();
        saveTasks(items);
        
        inputElement.value = '';
    }
});

function loadTasks() {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
        return JSON.parse(savedTasks);
    }
    return [
        "Сделать проектную работу",
        "Полить цветы",
        "Пройти туториал по Реакту",
        "Сделать фронт для своего проекта",
        "Прогуляться по улице в солнечный день",
        "Помыть посуду",
    ];
}

function createItem(itemText) {
    const template = document.getElementById("to-do__item-template");
    const clone = template.content.querySelector(".to-do__item").cloneNode(true);
    const textElement = clone.querySelector(".to-do__item-text");
    const deleteButton = clone.querySelector(".to-do__item-button_type_delete");
    const duplicateButton = clone.querySelector(".to-do__item-button_type_duplicate");
    const editButton = clone.querySelector(".to-do__item-button_type_edit");
    
    textElement.textContent = itemText;
    
    deleteButton.addEventListener('click', function() {
        clone.remove();
        items = getTasksFromDOM();
        saveTasks(items);
    });
    
    duplicateButton.addEventListener('click', function() {
        const itemName = textElement.textContent;
        const newItem = createItem(itemName);
        listElement.prepend(newItem);
        items = getTasksFromDOM();
        saveTasks(items);
    });
    
    return clone;
}

function getTasksFromDOM() {
    const itemsNamesElements = listElement.querySelectorAll('.to-do__item-text');
    const tasks = [];
    
    itemsNamesElements.forEach(function(element) {
        tasks.push(element.textContent);
    });
    
    return tasks;
}

function saveTasks(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

