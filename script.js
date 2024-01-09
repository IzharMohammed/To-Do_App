let savebtn=document.getElementById('save')
let todoInput = document.getElementById('input')
let emptydiv1=document.getElementById('emptydiv')
todoStorage=[]

//Saving Todos
savebtn.addEventListener("click" , ()=>{
if (todoInput.value==0) {
    return;
}else{
    let todo={text : todoInput.value , status : 'in progress' , finishButtonText : 'finished'}
    todoStorage.push(todo)
addTodo(todo,todoStorage.length)
}
todoInput.value=''
});

function renderDom(){
    emptydiv1.innerHTML=''
    todoStorage.forEach((element,index)=>{
     addTodo(element,index+1)
    })
}

//Remove Todo - Call back function of eventListener for delete button
function removeTodo(e){
//Wrong Approach : it will delete total todo from top of todo list to bottom but not according to our specified 
//todo list if we press delete btn in between it will delete from top not the specified row
// x=document.querySelector('.delete')
// x.parentElement.parentElement.parentElement.remove();

//Correct Approach
//e.target.parentElement.parentElement.parentElement.remove();

 let indexOfDeleteBtn=Number(e.target.getAttribute('todo-idx'))
 todoStorage.splice(indexOfDeleteBtn,1)
 renderDom()
};

function finishedTodo(e){
    let finishBtn=e.target
console.log(finishBtn);
    let indexOfFinishBtn=Number(e.target.getAttribute('finish-idx'))
            if(todoStorage[indexOfFinishBtn].status=='in progress'){
                todoStorage[indexOfFinishBtn].finishButtonText='undo'
                todoStorage[indexOfFinishBtn].status='finished'
            }else  if( todoStorage[indexOfFinishBtn].status=='finished'){
                todoStorage[indexOfFinishBtn].status='in progress'
                todoStorage[indexOfFinishBtn].finishButtonText='finished'
            }

     renderDom();


}





//Dom-All concepts covered
function addTodo(todoItem,index){
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

//Adding class names same as they are in html b'coz the css properties is designed acc. to it classes
num.classList.add('todo-no')
item.classList.add('todo-item')
status.classList.add('todo-status')
actions.classList.add('todo-actions')
finished_todo.classList.add('button','finished')
delete_todo.classList.add('button','delete')
Domrow.classList.add('Domrow')
todolist.classList.add('todo_list','list-todo-heading','todo-content')

finished_todo.setAttribute('finish-idx',index-1)
delete_todo.setAttribute('todo-idx',index-1)
finished_todo.setAttribute('id','finishBtn')

//NOTE : here we are passing a function not a call back so it will execute even if delete is not called
// delete_todo.onclick = removeTodo()

//Corrected way of adding a eventListener  for delete button
delete_todo.onclick = removeTodo
finished_todo.onclick=finishedTodo

num.textContent=`${index}.`
item.textContent=todoItem.text
status.textContent=todoItem.status

finished_todo.textContent=todoItem.finishButtonText
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
emptydiv1.appendChild(Domrow)
document.body.appendChild(emptydiv1)
}

