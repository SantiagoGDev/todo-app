 const $title = document.querySelectorAll('.task__title');
const $contentTasks = document.querySelector('#tasks');
let tasksList = [];
let aux = true;

const $buttonTask = document.querySelector('#btn_add-task');
const animateModal = ()=>{
	document.querySelector('.modal__text-datos').classList.add('modal__text-datos--active');
	document.querySelector('.modal__text-datos').innerHTML = "Tarea agregada correctamente";
	
	setTimeout(() => {
		setTimeout(() => {
			document.querySelector('.modal').classList.remove('modal--open');
		}, 1000);
		document.querySelector('.modal__box').classList.remove('modal__box--open');
		document.querySelector('.modal__text-datos').classList.remove('modal__text-datos--active');
	}, 1500);
}

const confirmData = ()=>{
	const $taskInput = document.querySelector('#modal__input-task');
	const $desInput = document.querySelector('#modal__input-des');

	if($taskInput.value.length >= 3 && $desInput.value.length  > 10){
		getData($taskInput.value,$desInput.value);
		$taskInput.value = '';
		$desInput.value = '';
		animateModal();

	}else{
		console.log('presiona')
		document.querySelector('.modal__text-datos').classList.add('modal__text-datos--error');
		document.querySelector('.modal__text-datos').innerHTML = "Campos deben ser llenados correctamente";

		setTimeout(() => {
			document.querySelector('.modal__text-datos').classList.remove('modal__text-datos--error');
		}, 2000);
	}
}

const getData = (name,des) =>{
	createTask(name,des);
	saveTaskList();
	console.log(tasksList);
}
const saveTaskList = ()=>{
	localStorage.setItem('TODO', JSON.stringify(tasksList));
	addTask();
}
const createTask = (name,des) => {
	let task = {  
		name: name,
		des: des,
		active: true
	}
	tasksList.push(task);
}
const addTask = ()=> {
	$contentTasks.innerHTML =  '';
	tasksList = JSON.parse(localStorage.getItem('TODO'));

	if(tasksList === null){
		tasksList = [];
	}else{
		tasksList.forEach(element => {
			let template1 = `  
			<div class="task">
				<div class="task__container">
					<div class="task__box">
						<h2 class="task__title" id="task__title">${element.name}</h2>
					</div>
					<div class="task__box-icon">
					<i class="task__estado fas fa-times task__estado--disable"></i>
						<i class="task__icon fas fa-trash-alt"></i>
					</div>
				</div>
				<p class="task__text" id="task__text">${element.des}</p>
			</div>
			`;
			let template2 = `  
			<div class="task">
				<div class="task__container">
					<div class="task__box">
						<h2 class="task__title" id="task__title">${element.name}</h2>
					</div>
					<div class="task__box-icon">
					<i class="task__estado fas fa-check-square"></i>
						<i class="task__icon fas fa-trash-alt"></i>
					</div>
				</div>
				<p class="task__text" id="task__text">${element.des}</p>
			</div>
			`;
			if(element.active){
				$contentTasks.innerHTML += template2;
			}else{
				$contentTasks.innerHTML += template1;
			}
		});
	}
}

const deleteTask = (task)=>{
	let index = tasksList.findIndex( element => element.name == task.trim());
	console.log(index)
	tasksList.splice(index,1);
	saveTaskList();
}
const showDescriptionTask = (index)=>{
	const $texto = document.querySelectorAll('.task__text');
	$texto.forEach( element =>{
		if(tasksList[index].des === element.innerHTML){
			if(aux){
				element.classList.add('task__text--active');
				aux=false;
			}else{
				element.classList.remove('task__text--active');
				aux=true;
			}
		}
	});
}
const estadoTask = (task)=>{
	let index = tasksList.findIndex( element => element.name === task.trim());
	console.log(index,task.trim())
	if(tasksList[index].active){
		tasksList[index].active = false;
	}else{
		tasksList[index].active = true;
	}
	saveTaskList();

}

document.addEventListener('DOMContentLoaded', addTask);
$contentTasks.addEventListener('click', e =>{
	e.preventDefault();
	if(e.target.classList[0] == 'task__icon'){
		deleteTask(e.path[2].innerText);
	}
	if(e.target.classList[0] == 'task__estado'){
		estadoTask(e.path[2].innerText);
	}
	if(e.target.classList[0] == 'task__title'){
		let index = tasksList.findIndex( element => element.name == e.target.innerHTML);
		showDescriptionTask(index);
	}
})

$buttonTask.addEventListener('click', confirmData);
function modal(){
	const openModal = ()=>{
		const $contentModal = document.querySelector('.modal');
		const $modal = document.querySelector('.modal__box');
		$contentModal.classList.add('modal--open');
		setTimeout(() => {
			$modal.classList.add('modal__box--open');
		}, 500);

		window.addEventListener('click', e =>{
			
			if(e.target == $contentModal){
				setTimeout(() => {
					$contentModal.classList.remove('modal--open');
				}, 600);
				$modal.classList.remove('modal__box--open');
			}
		})

	}
	document.querySelector('.create').addEventListener('click', openModal)
}

modal()






