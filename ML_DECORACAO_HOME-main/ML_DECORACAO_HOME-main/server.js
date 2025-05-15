const express = require('express');
const mysql = require('mysql2');
const path = require('path');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 8000;

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

db.connect((err) => {
  if (err) {
    console.error('Erro ao conectar no banco de dados:', err.message);
    return;
  }
  console.log('Conexão com o banco de dados MySQL estabelecida com sucesso!');
});

// Serve arquivos estáticos (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));

// Rota principal exibindo produtos
app.get('/', (req, res) => {
  db.query('SELECT * FROM produto', (err, results) => {
    if (err) throw err;
    res.sendFile(path.join(__dirname, 'public', 'views', 'Home.html')); // Envia o arquivo HTML
  });
});

app.use('/imagens_div', express.static(path.join(__dirname, 'public/imagens_div')));


app.get('/produtos', (req, res) => {
  db.query('SELECT * FROM produto', (err, results) => {
    if (err) {
      console.error('Erro ao buscar produtos:', err.message);
      return res.status(500).json({ error: 'Erro ao buscar produtos' });
    }
    res.json(results); // Envia os produtos como resposta JSON
  });
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
