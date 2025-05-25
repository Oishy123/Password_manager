const form = document.getElementById('passwordForm');
const passwordList = document.getElementById('passwordList');

let passwords = JSON.parse(localStorage.getItem('passwords')) || [];

function saveToStorage() {
  localStorage.setItem('passwords', JSON.stringify(passwords));
}

function displayPasswords() {
  passwordList.innerHTML = '';

  passwords.forEach((item, index) => {
    const div = document.createElement('div');
    div.className = 'entry';

    div.innerHTML = `
      <p><strong>Website:</strong> ${item.website}</p>
      <p><strong>Username:</strong> ${item.username}</p>
      <p><strong>Password:</strong> <span id="pw${index}">•••••••</span>
         <button onclick="togglePassword(${index})">👁️</button></p>
      <button onclick="deletePassword(${index})">🗑️ Delete</button>
    `;

    passwordList.appendChild(div);
  });
}

function togglePassword(index) {
  const span = document.getElementById(`pw${index}`);
  const current = passwords[index].password;

  if (span.innerText === '•••••••') {
    span.innerText = current;
  } else {
    span.innerText = '•••••••';
  }
}

function deletePassword(index) {
  passwords.splice(index, 1);
  saveToStorage();
  displayPasswords();
}

form.addEventListener('submit', function (e) {
  e.preventDefault();

  const website = document.getElementById('website').value;
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  passwords.push({ website, username, password });

  saveToStorage();
  displayPasswords();
  form.reset();
});

displayPasswords();
