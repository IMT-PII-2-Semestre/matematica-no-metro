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

const Feedback = mongoose.model('Feedback', FeedbackSchema);

app.use(express.urlencoded({ extended: true })); 
app.use(express.json()); 

app.use(express.static(path.join(__dirname, '../project-root')));
app.use('/images', express.static(path.join(__dirname, '../images')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../project-root/html/index.html'));
});

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

app.post('/feedback', async (req, res) => {
  const { nome, email, mensagem } = req.body;

  if (!nome || !email || !mensagem) {
    return res.status(400).send({ message: 'Todos os campos são obrigatórios.' });
  }

  try {
    const novoFeedback = new Feedback({
      nome,
      email,
      mensagem
    });

    await novoFeedback.save();

    res.status(200).send({ message: 'Feedback recebido com sucesso!' });
  } catch (error) {
    console.error('Erro ao salvar feedback:', error);
    res.status(500).send({ message: 'Erro ao salvar feedback.' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
