document.addEventListener('DOMContentLoaded', function() {
    const taskList = document.getElementById('task-list')
    const taskInput = document.getElementById('task-input')
    const addTaskBtn = document.getElementById('add-task-btn');
    const createdTasksCount = document.getElementById('created-tasks-count');
    const completedTasksCount = document.getElementById('completed-tasks-count');

    loadTasks()

    addTaskBtn.addEventListener('click', function() {
        event.preventDefault();
        addTask();
    })

    function addTask() {
        const taskText = taskInput.value.trim()
        if (taskText === '') return
        
        const taskItem = createTaskItem(taskText);
        taskList.appendChild(taskItem)

        saveTask(taskText)

        updateTaskCounts();

        taskInput.value = '';
    }

    // Função que carrega as tarefas na pagina
    function loadTasks() {
        let tasks = getTasksFromLocalStorage()

        tasks.forEach(taskText => {
            const taskItem = createTaskItem(taskText)
            taskList.appendChild(taskItem)
        });
    }

    // Busca as tarefas armaezenadas no localStoraged
    function getTasksFromLocalStorage() {
        let tasks = localStorage.getItem('tasks')

        if (tasks) {
            return JSON.parse(tasks)
        } else {
            return []
        }
    }

    function saveTask(taskText) {
        let tasks = getTasksFromLocalStorage()
        tasks.push(taskText)
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Remove uma tarefa do Local Storage
    function removeTask(taskText) {
        let tasks = getTasksFromLocalStorage();
        tasks = tasks.filter(task => task !== taskText);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }   

    // Função para criar o elemento HTML de uma tarefa
    function createTaskItem(taskText) {
        const cardTask = document.createElement('div')
        cardTask.className = 'cardTask'

        const taskContent = document.createElement('div')

        const completeBtn = document.createElement('input')
        completeBtn.type = 'checkbox'
        completeBtn.addEventListener('click', function() {
            taskContent.classList.toggle('completed');
            updateTaskCounts();
        });

        const taskDescription = document.createElement('p');
      taskDescription.textContent = taskText;

      const deleteBtn = document.createElement('button');
      deleteBtn.innerHTML = '<i class="ph ph-trash"></i>';
      deleteBtn.addEventListener('click', function() {
          taskList.removeChild(cardTask);
          removeTask(taskText);
          updateTaskCounts();
      });

      taskContent.appendChild(completeBtn);
      taskContent.appendChild(taskDescription);

      cardTask.appendChild(taskContent);
      cardTask.appendChild(deleteBtn);

      return cardTask;
    }

    // atualiza os contadores de tarefas
    function updateTaskCounts() {
        let totalTasks = taskList.children.length;
        let completedTasks = taskList.querySelectorAll('.completed').length;
        createdTasksCount.textContent = totalTasks;
        completedTasksCount.textContent = completedTasks;
    }

})