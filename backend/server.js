const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true })); // Para requisições de formulário
app.use(express.json()); // Para requisições com corpo em JSON


app.use(express.static(path.join(__dirname, '../project-root')));
app.use('/images', express.static(path.join(__dirname, '../images')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../project-root/html/index.html'));
});


app.get('/html/:page', (req, res) => {
  const page = req.params.page;


  const filePath = path.join(__dirname, `../project-root/html/${page}`);
  if (!filePath.endsWith('.html')) {
    filePath += '.html';
  }

  res.sendFile(filePath, (err) => {
    if (err) {
      console.error(err);
      res.status(404).send('Página não encontrada');
    }
  });
});

// Rota para receber feedbacks
app.post('/feedback', (req, res) => {
  const { nome, email, mensagem } = req.body;

  if (!nome || !email || !mensagem) {
    return res.status(400).send({ message: 'Todos os campos são obrigatórios.' });
  }

  console.log(`Feedback recebido:
  Nome: ${nome}
  Email: ${email}
  Mensagem: ${mensagem}`);

  res.status(200).send({ message: 'Feedback recebido com sucesso!' });
});

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
