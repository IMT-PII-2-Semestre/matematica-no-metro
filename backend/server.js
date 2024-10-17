// server.js

const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const app = express();
const PORT = 3000;

// Conectar ao MongoDB
mongoose.connect('mongodb://localhost:27017/nome-banco', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Conectado ao MongoDB'))
.catch((err) => console.error('Erro ao conectar ao MongoDB:', err));

// Definir o esquema do Feedback
const FeedbackSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    mensagem: {
        type: String,
        required: true
    },
});

// Criar o modelo do Feedback
const Feedback = mongoose.model('Feedback', FeedbackSchema);

// Middleware para formulários e JSON
app.use(express.urlencoded({ extended: true })); // Para requisições de formulário
app.use(express.json()); // Para requisições com corpo em JSON

// Servir arquivos estáticos
app.use(express.static(path.join(__dirname, '../project-root')));
app.use('/images', express.static(path.join(__dirname, '../images')));

// Rota principal
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../project-root/html/index.html'));
});

// Rota dinâmica para páginas HTML
app.get('/html/:page', (req, res) => {
  let page = req.params.page;

  let filePath = path.join(__dirname, `../project-root/html/${page}`);
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
app.post('/feedback', async (req, res) => {
  const { nome, email, mensagem } = req.body;

  // Verificar se todos os campos estão preenchidos
  if (!nome || !email || !mensagem) {
    return res.status(400).send({ message: 'Todos os campos são obrigatórios.' });
  }

  try {
    // Criar um novo documento de feedback
    const novoFeedback = new Feedback({
      nome,
      email,
      mensagem
    });

    // Salvar no banco de dados
    await novoFeedback.save();

    res.status(200).send({ message: 'Feedback recebido com sucesso!' });
  } catch (error) {
    console.error('Erro ao salvar feedback:', error);
    res.status(500).send({ message: 'Erro ao salvar feedback.' });
  }
});

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
