const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

const users = [
  { id: 1, name: 'Alice', email: 'alice@example.com' },
  { id: 2, name: 'Bob', email: 'bob@example.com' },
  { id: 3, name: 'Charlie', email: 'charlie@example.com' },
];

app.get('/users', (req, res) => {
  res.status(200).json(users);
});

app.get('/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const user = users.find(user => user.id === userId);

  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404).json({ error: 'User not found' });
  }
});

app.post('/users', (req, res) => {
  const newUser = {
    id: users.length + 1,
    name: req.body.name,
    email: req.body.email,
  };

  if (!newUser.name || !newUser.email) {
    return res.status(400).json({ error: 'Name and email are required' });
  }

  users.push(newUser);
  res.status(201).json(newUser);
});

app.put('/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const userIndex = users.findIndex(user => user.id === userId);

  if (userIndex !== -1) {
    users[userIndex] = { ...users[userIndex], ...req.body };
    res.status(200).json(users[userIndex]);
  } else {
    res.status(404).json({ error: 'User not found' });
  }
});

app.delete('/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const initialLength = users.length;
  users = users.filter(user => user.id !== userId);

  if (users.length < initialLength) {
    res.status(204).send();
  } else {
    res.status(404).json({ error: 'User not found' });
  }
});

app.use((req, res, next) => {
  res.status(404).send('404 Not Found');
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
