const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const winston = require('winston');

const app = express();
const port = 3001;

// Инициализация логгера
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.simple(),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Подключение к базе данных
const db = new sqlite3.Database('test.db', (err) => {
  if (err) {
    logger.error('Error connecting to database:', err.message);
    return;
  }
  logger.info('Connected to the SQLite database.');
});

// Создание таблицы (если не существует)
db.serialize(() => {
  db.run("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, email TEXT)");
});

// Роуты
app.get('/api/users', (req, res) => {
  db.all('SELECT * FROM users', (err, rows) => {
    if (err) {
      logger.error('Error fetching users:', err.message);
      res.status(500).send(err.message);
      return;
    }
    res.json(rows);
  });
});

app.post('/api/users', (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) {
    res.status(400).send('Name and email are required');
    return;
  }

  db.run('INSERT INTO users (name, email) VALUES (?, ?)', [name, email], function(err) {
    if (err) {
      logger.error('Error inserting user:', err.message);
      res.status(500).send(err.message);
      return;
    }
    logger.info('User inserted with id:', this.lastID);
    res.json({ id: this.lastID, name, email });
  });
});

// Удаление пользователя по ID
app.delete('/api/users/:id', (req, res) => {
  const id = req.params.id;

  db.run('DELETE FROM users WHERE id = ?', id, function(err) {
    if (err) {
      logger.error('Error deleting user:', err.message);
      res.status(500).send(err.message);
      return;
    }
    logger.info('User deleted with id:', id);
    res.json({ success: true });
  });
});

// Обработчик ошибок
app.use((err, req, res, next) => {
  logger.error(err.stack);
  res.status(500).send('Something broke!');
});

// Запуск сервера
app.listen(port, () => {
  logger.info(`Server running on port ${port}`);
});
