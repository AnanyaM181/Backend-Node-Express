const API_URL = 'http://localhost:3000/todos';

const form = document.getElementById('todo-form');
const titleInput = document.getElementById('title');
const descInput = document.getElementById('description');
const list = document.getElementById('todo-list');
const message = document.getElementById('message');

async function loadTodos() {
  try {
    const res = await fetch(API_URL);
    const todos = await res.json();
    message.textContent = '';
    render(todos);
  } catch (err) {
    message.textContent = 'Could not reach the backend. Is the server running?';
    list.innerHTML = '';
  }
}

function render(todos) {
  list.innerHTML = '';

  if (todos.length === 0) {
    list.innerHTML = '<li class="empty">No todos yet. Add one above!</li>';
    return;
  }

  todos.forEach(todo => {
    const li = document.createElement('li');

    const info = document.createElement('div');
    const title = document.createElement('div');
    title.className = 'todo-title';
    title.textContent = todo.title;

    const desc = document.createElement('div');
    desc.className = 'todo-desc';
    desc.textContent = todo.description || '';

    info.append(title, desc);

    const del = document.createElement('button');
    del.className = 'delete-btn';
    del.textContent = 'Delete';
    del.onclick = () => deleteTodo(todo.id);

    li.append(info, del);
    list.appendChild(li);
  });
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  try {
    await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: titleInput.value,
        description: descInput.value
      })
    });
    form.reset();
    loadTodos();
  } catch (err) {
    message.textContent = 'Failed to add todo.';
  }
});

async function deleteTodo(id) {
  try {
    await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    loadTodos();
  } catch (err) {
    message.textContent = 'Failed to delete todo.';
  }
}

loadTodos();