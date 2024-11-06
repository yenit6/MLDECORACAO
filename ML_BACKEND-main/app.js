const express = require('express');
const path = require('path');
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');
const session = require('express-session');
const bodyParser = require('body-parser');
const axios = require('axios'); // Para requisições HTTP
const app = express();
const port = 3000;
require('dotenv').config();

// Configurações do body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Configuração da sessão
app.use(session({
  secret: 'your-secret-key', // Altere para uma chave secreta forte
  resave: false,
  saveUninitialized: false
}));

// Configuração do banco de dados
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

connection.connect((err) => {
  if (err) {
    console.log('Erro ao conectar com o banco de dados: ' + err.stack);
    return;
  }
  console.log('Conectado com sucesso! ID: ' + connection.threadId);
});

// Servir arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Rota principal (exemplo de página de produtos ou login)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/produtos.html'));
});

// Função para validar se o CEP pertence a Salvador
function isCepSalvador(cep) {
  const cepNumber = parseInt(cep);
  return cepNumber >= 40000000 && cepNumber <= 42599999;
}

// Rota para registrar os usuários com a validação do CEP
app.post('/subscription', (req, res) => {
  const { nome, sobrenome, email, telefone, cpf, password, cep, rua, bairro, cidade, estado, numero } = req.body;

  if (!isCepSalvador(cep)) {
    return res.status(400).send('O CEP informado não pertence ao estado permitido.');
  }

  bcrypt.hash(password, 10, (err, hash) => {
    if (err) return res.status(500).send('Erro ao criptografar a senha.');

    const query = `INSERT INTO users (nome, sobrenome, email, telefone, cpf, password, cep, rua, bairro, cidade, estado, numero)
                   VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    connection.query(query, [nome, sobrenome, email, telefone, cpf, hash, cep, rua, bairro, cidade, estado, numero], (error, results) => {
      if (error) {
        if (error.code === 'ER_DUP_ENTRY') {
          return res.status(409).send('Email ou CPF já cadastrado.');
        } else {
          console.error('Erro ao registrar o usuário: ', error);
          return res.status(500).send('Erro ao registrar o usuário.');
        }
      }
      res.redirect('/login');
    });
  });
});

// Rota para login de usuário
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  // Consulta para buscar o usuário pelo email
  const query = 'SELECT id, password FROM users WHERE email = ?';
  connection.query(query, [email], (error, results) => {
    if (error) {
      console.error('Erro ao buscar o usuário:', error);
      return res.status(500).send('Erro ao buscar o usuário.');
    }

    // Verifica se o usuário foi encontrado
    if (results.length === 0) {
      return res.status(404).send('Usuário não encontrado.');
    }

    const user = results[0];

    // Compara a senha informada com a senha armazenada no banco de dados
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) {
        console.error('Erro ao comparar as senhas:', err);
        return res.status(500).send('Erro ao comparar as senhas.');
      }

      // Se a senha for válida, inicia a sessão
      if (isMatch) {
        req.session.userId = user.id; // Armazena o ID do usuário na sessão
        res.redirect('/produtos'); // Redireciona para a página de produtos (ou outra página protegida)
      } else {
        res.status(401).send('Senha incorreta.');
      }
    });
  });
});

// Rota para logout de usuário
app.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).send('Erro ao encerrar a sessão.');
    }
    res.redirect(''); // Redireciona para a página inicial após logout
  });
});


// Rota para trocar a senha
app.post('/change-password', (req, res) => {
  const { email, currentPassword, newPassword } = req.body;

  const query = 'SELECT id, password FROM users WHERE email = ?';
  connection.query(query, [email], (error, results) => {
    if (error) {
      console.error('Erro ao buscar o usuário: ', error);
      return res.status(500).send('Erro ao buscar o usuário.');
    }

    if (results.length === 0) {
      return res.status(404).send('Usuário não encontrado.');
    }

    const user = results[0];

    bcrypt.compare(currentPassword, user.password, (err, isMatch) => {
      if (err) {
        console.error('Erro ao comparar as senhas: ', err);
        return res.status(500).send('Erro ao comparar as senhas.');
      }

      if (!isMatch) {
        return res.status(401).send('Senha atual incorreta.');
      }

      bcrypt.hash(newPassword, 10, (err, hash) => {
        if (err) {
          console.error('Erro ao criptografar a nova senha: ', err);
          return res.status(500).send('Erro ao criptografar a nova senha.');
        }

        const updateQuery = 'UPDATE users SET password = ? WHERE id = ?';
        connection.query(updateQuery, [hash, user.id], (error) => {
          if (error) {
            console.error('Erro ao atualizar a senha: ', error);
            return res.status(500).send('Erro ao atualizar a senha.');
          }

          res.send('Senha atualizada com sucesso.');
        });
      });
    });
  });
});

// Rota para servir a página de produtos após o login
app.get('/produtos', (req, res) => {
  if (!req.session.userId) {
    // Redireciona para a página de login se o usuário não estiver autenticado
    return res.redirect('/');
  }
  res.sendFile(path.join(__dirname, 'public/produtos.html'));
});


// Rota para adicionar um item ao carrinho
app.post('/adicionar-carrinho', (req, res) => {
  const { produtoId, quantidade } = req.body;
  const userId = req.session.userId;

  if (!userId) {
    return res.status(401).json({ message: 'Usuário não autenticado.' });
  }

  const query = 'INSERT INTO carrinho (user_id, produto_id, quantidade) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE quantidade = quantidade + ?';
  connection.query(query, [userId, produtoId, quantidade, quantidade], (error) => {
    if (error) {
      console.error('Erro ao adicionar ao carrinho:', error);
      return res.status(500).json({ message: 'Erro ao adicionar ao carrinho.' });
    }

    res.json({ message: 'Item adicionado ao carrinho com sucesso!' });
  });

});

//carrinho
app.get('/carrinho', (req, res) => {
  const userId = req.session.userId;
  if (!userId) {
    return res.status(401).json({ message: 'Usuário não autenticado.' });
  }

  const query = `
    SELECT c.produto_id, p.nome, c.quantidade
    FROM carrinho c
    JOIN produtos p ON c.produto_id = p.id
    WHERE c.user_id = ?
  `;
  connection.query(query, [userId], (error, results) => {
    if (error) {
      console.error('Erro ao buscar itens do carrinho:', error);
      return res.status(500).json({ message: 'Erro ao buscar o carrinho.' });
    }
    res.json(results);
  });
});

// Rota para atualizar a quantidade de um item no carrinho
app.post('/atualizar-carrinho', (req, res) => {
  const { produtoId, quantidade } = req.body;
  const userId = req.session.userId;

  if (!userId) {
    return res.status(401).json({ message: 'Usuário não autenticado.' });
  }

  const query = 'UPDATE carrinho SET quantidade = ? WHERE user_id = ? AND produto_id = ?';
  connection.query(query, [quantidade, userId, produtoId], (error) => {
    if (error) {
      console.error('Erro ao atualizar quantidade no carrinho:', error);
      return res.status(500).json({ message: 'Erro ao atualizar quantidade.' });
    }
    res.json({ message: 'Quantidade atualizada com sucesso!' });
  });
});

// Rota para remover um item do carrinho
app.delete('/remover-carrinho', (req, res) => {
  const { produtoId } = req.body;
  const userId = req.session.userId;

  if (!userId) {
    return res.status(401).json({ message: 'Usuário não autenticado.' });
  }

  const query = 'DELETE FROM carrinho WHERE user_id = ? AND produto_id = ?';
  connection.query(query, [userId, produtoId], (error) => {
    if (error) {
      console.error('Erro ao remover item do carrinho:', error);
      return res.status(500).json({ message: 'Erro ao remover item.' });
    }
    res.json({ message: 'Item removido com sucesso!' });
  });
});




// Inicialização do servidor
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
