const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

let databases = [];

app.use(bodyParser.json());
app.use(cors());

app.get('/api/databases', (req, res) => {
  res.json(databases);
});

app.post('/api/databases', (req, res) => {
  const newDatabase = {
    id: databases.length + 1,
    name: req.body.name
  };
  databases.push(newDatabase);
  res.json(newDatabase);
});

app.delete('/api/databases/:id', (req, res) => {
  const id = parseInt(req.params.id);
  databases = databases.filter(db => db.id !== id);
  res.json({ success: true });
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
