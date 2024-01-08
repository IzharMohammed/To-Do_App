let savebtn=document.getElementById('save')
let todoInput = document.getElementById('input')

todoStorage=[]

//Saving Todos
savebtn.addEventListener("click" , ()=>{
if (todoInput.value==0) {
    return;
}else{
    todoStorage.push(todoInput.value)
addTodo(todoInput.value)
}
todoInput.value=''
});

//Remove Todo - Call back function of eventListener for delete button
function removeTodo(){
//console.log(Domrow);
x=document.querySelector('.delete')
x.parentElement.parentElement.parentElement.remove();
}
















//Dom-All concepts covered
function addTodo(todoItem,length){

//Creation of elements according to hard coded value in html
const num=document.createElement('div');
const item=document.createElement('div');
const status=document.createElement('div');
const actions=document.createElement('div');
const delete_todo=document.createElement('button');
const finished_todo=document.createElement('button');
const todolist=document.createElement('div')
const Domrow=document.createElement('div')
const hr=document.createElement('hr')
const todoData=document.createElement('div')

//Adding class names same as they are in html b'coz the css properties is designed acc. to it classes
num.classList.add('todo-no')
item.classList.add('todo-item')
status.classList.add('todo-status')
actions.classList.add('todo-actions')
finished_todo.classList.add('button','finished')
delete_todo.classList.add('button','delete')
Domrow.classList.add('Domrow')
todolist.classList.add('todo_list','list-todo-heading','todo-content')

//NOTE : here we are passing a function not a call back so it will execute even if delete is not called
// delete_todo.onclick = removeTodo()

//Corrected way of adding a eventListener  for delete button
delete_todo.onclick = removeTodo


num.textContent=`${todoStorage.length}.`
item.textContent=todoItem
status.textContent='in progress'

finished_todo.textContent='finished'
delete_todo.textContent='delete'

//Appending div from parent to child from upper div to lower div(attaching all child div's to parent div)
todolist.appendChild(num)
todolist.appendChild(item)
todolist.appendChild(status)
todolist.appendChild(actions)

actions.appendChild(finished_todo)
actions.appendChild(delete_todo)

Domrow.appendChild(todolist)
Domrow.appendChild(hr)
todoData.appendChild(Domrow)
document.body.appendChild(todoData)
}
// addTodo('first todo')
