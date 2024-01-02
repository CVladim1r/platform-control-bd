const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const port = 3000;

// Путь к файлу базы данных SQLite
const dbPath = path.resolve(__dirname, 'test.db');

// Создание соединения с базой данных
const db = new sqlite3.Database(dbPath);

app.use(bodyParser.json());
app.use(cors());

// Получение списка пользователей
app.get('/api/users', (req, res) => {
  db.all('SELECT * FROM users', (err, rows) => {
    if (err) {
      console.error('Error fetching users:', err);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      res.json(rows);
    }
  });
});

// Создание нового пользователя
app.post('/api/users', (req, res) => {
  const { name, email } = req.body;
  db.run('INSERT INTO users (name, email) VALUES (?, ?)', [name, email], function(err) {
    if (err) {
      console.error('Error creating user:', err);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      res.json({ id: this.lastID, name, email });
    }
  });
});

// Удаление пользователя
app.delete('/api/users/:id', (req, res) => {
  const id = req.params.id;
  db.run('DELETE FROM users WHERE id = ?', id, function(err) {
    if (err) {
      console.error('Error deleting user:', err);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      res.json({ success: true });
    }
  });
});

// Запуск сервера
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// Закрытие соединения с базой данных после завершения работы сервера
process.on('SIGINT', () => {
  db.close((err) => {
    if (err) {
      console.error('Error closing database:', err.message);
    } else {
      console.log('Database connection closed.');
    }
    process.exit();
  });
});
