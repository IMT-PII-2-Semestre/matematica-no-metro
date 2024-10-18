// server.js

const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const app = express();
const PORT = 3000;

// Conectar ao MongoDB Atlas
mongoose.connect('mongodb+srv://matMetro:mauaGamers@matematica-metro.hecz7.mongodb.net/?retryWrites=true&w=majority&appName=matematica-metro', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Conectado ao MongoDB Atlas'))
.catch((err) => console.error('Erro ao conectar ao MongoDB:', err));

// Definir Schemas
const FeedbackSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    email: { type: String, required: true },
    mensagem: { type: String, required: true }
});

const UserSchema = new mongoose.Schema({
    nome: { type: String },
    email: { type: String },
    telefone: { type: String },
    curso: { type: String },
    dataNascimento: { type: String },
    nivelConhecimento: { type: String },
    disponibilidade: { type: [String] }
});

// Definir Models
const Feedback = mongoose.model('Feedback', FeedbackSchema);
const User = mongoose.model('User', UserSchema);

app.use(express.urlencoded({ extended: true })); 
app.use(express.json()); 

// Configurar caminhos estáticos para servir arquivos como HTML, CSS, JavaScript e imagens
app.use(express.static(path.join(__dirname, '../project-root')));
app.use('/images', express.static(path.join(__dirname, '..', 'images')));

// Rotas Específicas
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../project-root/html/index.html'));
});

app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'project-root', 'html', 'admin.html'), (err) => {
    if (err) {
      console.error(err);
      res.status(404).send('Página de administração não encontrada');
    }
  });
});

// Rota genérica para outras páginas HTML
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

// Rota para feedback
app.post('/feedback', async (req, res) => {
  const { nome, email, mensagem } = req.body;

  if (!nome || !email || !mensagem) {
    return res.status(400).send({ message: 'Todos os campos são obrigatórios.' });
  }

  try {
    const novoFeedback = new Feedback({ nome, email, mensagem });
    await novoFeedback.save();
    res.status(200).send({ message: 'Feedback recebido com sucesso!' });
  } catch (error) {
    console.error('Erro ao salvar feedback:', error);
    res.status(500).send({ message: 'Erro ao salvar feedback.' });
  }
});

// Corrigir a Rota de Cadastro de Usuário
app.post('/cadastrar', async (req, res) => {
  const { nome, email, telefone, curso, dataNascimento, nivelConhecimento, disponibilidade } = req.body;

  if (!nome || !email) {
    return res.status(400).send({ message: 'Nome e email são obrigatórios.' });
  }

  try {
    const disponibilidadeArray = Array.isArray(disponibilidade) ? disponibilidade : (disponibilidade ? [disponibilidade] : []);

    const novoUsuario = new User({
      nome,
      email,
      telefone,
      curso,
      dataNascimento,
      nivelConhecimento,
      disponibilidade: disponibilidadeArray
    });

    await novoUsuario.save();
    res.status(200).send({ message: 'Usuário cadastrado com sucesso!' });
  } catch (error) {
    console.error('Erro ao salvar usuário:', error);
    res.status(500).send({ message: 'Erro ao salvar usuário.' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
