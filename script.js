let savebtn=document.getElementById('save')
let todoInput = document.getElementById('input')
let emptydiv1=document.getElementById('emptydiv')
let pendingTodos=document.getElementById('pending')
todoStorage=[]

//get pending todos button - to get todos which are not finished
pendingTodos.addEventListener('click',()=>{
 todoStorage=   todoStorage.filter((todoStorage)=>todoStorage.status !='finished' )
 renderDom()
})

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

//Render total dom by removing total div's and new adding new div's acc. to which are present in todoStorage
function renderDom(){
    emptydiv1.innerHTML=''
    todoStorage.forEach((element,index)=>{
     addTodo(element,index+1)
    })
}

//Delete Button - Call back function  for delete button
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

//Finish button - Call back function  for finish button
function finishedTodo(e){
    let finishBtn=e.target
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

//Edit button - Call back function  for edit button
function editTodo(e){
let indexToEdit=Number(e.target.getAttribute('todo-idx'))
let detailDiv=document.querySelector(`div[todo-idx="${indexToEdit}"]`)
let input=document.querySelector(`input[todo-idx="${indexToEdit}"]`)
 detailDiv.style.display='none'
 input.type='text'
 input.value=detailDiv.textContent
}

//Input - if we press enter then the total information present in input gets transfer to div which is disabled above 
function hiddenInputTodo(e){
    let indexToEdit=Number(e.target.getAttribute('todo-idx'))
    let detailDiv=document.querySelector(`div[todo-idx="${indexToEdit}"]`)
    let input=document.querySelector(`input[todo-idx="${indexToEdit}"]`)
    //if we press enter then the total information present in input gets transfer to div which is disabled above 
    if(e.keyCode==13){
    detailDiv.textContent= input.value
    detailDiv.style.display='block'
 input.type='hidden'
 input.value=''
}
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
const edit = document.createElement('button')
const input = document.createElement('input')

//Adding class names same as they are in html b'coz the css properties is designed acc. to it classes
num.classList.add('todo-no')
item.classList.add('todo-item')
status.classList.add('todo-status')
actions.classList.add('todo-actions')
finished_todo.classList.add('button','finished')
delete_todo.classList.add('button','delete')
Domrow.classList.add('Domrow')
todolist.classList.add('todo_list','list-todo-heading','todo-content')
edit.classList.add('button','save-btn')
edit.style="--clr:#1e9bff"
input.classList.add('edit-input')

//Setting attributes so that it can get unique numbering for which if we add events(clicked) then we can get the unique
//numbering using getAttributes and we an perform particular opaeration acc. to unique number
input.setAttribute('type','hidden')
finished_todo.setAttribute('finish-idx',index-1)
delete_todo.setAttribute('todo-idx',index-1)
finished_todo.setAttribute('id','finishBtn')
edit.setAttribute('todo-idx',index-1)
item.setAttribute('todo-idx',index-1)
input.setAttribute('todo-idx',index-1)

//NOTE : here we are passing a function not a call back so it will execute even if delete is not called
// delete_todo.onclick = removeTodo()
//Corrected way of adding a eventListener  for delete button
delete_todo.onclick = removeTodo
finished_todo.onclick=finishedTodo
edit.onclick=editTodo
input.addEventListener('keypress',hiddenInputTodo)

num.textContent=`${index}.`
item.textContent=todoItem.text //It is stores in object and the object is stored in an array(todoStorage)
status.textContent=todoItem.status //It is stores in object and the object is stored in an array(todoStorage)
edit.textContent='edit'
finished_todo.textContent=todoItem.finishButtonText
delete_todo.textContent='delete'

//Appending div from parent to child from upper div to lower div(attaching all child div's to parent div)
todolist.appendChild(num)
todolist.appendChild(item)
todolist.appendChild(input)
todolist.appendChild(status)
todolist.appendChild(actions)

actions.appendChild(finished_todo)
actions.appendChild(delete_todo)
actions.appendChild(edit)

Domrow.appendChild(todolist)
Domrow.appendChild(hr)
emptydiv1.appendChild(Domrow)
document.body.appendChild(emptydiv1)
}