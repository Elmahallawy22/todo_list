let input = document.querySelector("#input"),
submit = document.querySelector("#submit"),
divTask = document.querySelector('#con ul'),
list = [];

getData();

submit.onclick = function (e) {
    e.preventDefault();
    if (input.value !== '') {
        addTask(input.value);
        input.value = ''
    }
}
function addTask(e) {
    let user = {id: Date.now(),  title: e, completed: false, }
    list.push(user);
    addElementsToPage(list);
    addElementsToStorage(list);
}

function addElementsToPage(list) {
    divTask.innerHTML = '';
    list.forEach((e) => {
        let li = document.createElement('li');
        li.classList.add('todo-list');
        li.setAttribute("data-id", e.id);
        let div = document.createElement('div');
        div.classList.add('todo-item');
        div.append(document.createTextNode(e.title));
        let btnComplete = document.createElement('button')
        btnComplete.classList.add('complete')
        btnComplete.innerHTML = '<i class="fas fa-check"></i>'
        let btnTrash = document.createElement('button')
        btnTrash.classList.add('trash')
        btnTrash.innerHTML = '<i class="fas fa-trash"></i>'
        li.append(div)
        li.append(btnComplete)
        li.append(btnTrash)
        divTask.append(li)
    });
}

function addElementsToStorage(list){
    window.localStorage.setItem('tasks', JSON.stringify(list))
}
 
function getData() {
    let data = window.localStorage.getItem('tasks');
    if (data) {
        let task = JSON.parse(data);
            task.forEach((e) => {
                addTask(e.title)
            })
    }
}


divTask.addEventListener('click', (e) => {
    let item = e.target;
    if (item.classList[0] === 'complete') {
        let it = item.parentElement;
        it.classList.toggle('completed')
    }
    if (item.classList[0] === 'trash') {
        let it = item.parentElement;
        it.classList.add('fall');
        it.addEventListener('transitionend', () => {
            delet(e.target.parentElement.getAttribute('data-id'));
            it.remove();
        })
    }
})

function delet(taskId) {
    list = list.filter((task) => task.id != taskId);
    addElementsToStorage(list)
}

let icon = document.querySelector('#icon')
icon.addEventListener("click" , ()=> {
    let main = document.querySelector('body')
    main.classList.toggle('dark')
    if(main.classList.contains('dark')) icon.src = 'imgs/sun.png';
    else icon.src = 'imgs/m1oon.png'
});