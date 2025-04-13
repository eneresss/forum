const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const app = express();

dotenv.config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const threadRoutes = require('./routes/threadRoutes');
const answerRoutes = require('./routes/answerRoutes');
const catalogRoutes = require('./routes/catalogRoutes');
const studentRoutes = require('./routes/studentRoutes');
const reactionRoutes = require('./routes/reactionRoutes');
const inviteRoutes = require('./routes/inviteRoutes');
const moderationRoutes = require('./routes/moderationRoutes');

app.use('/api/threads', threadRoutes);
app.use('/api/answers', answerRoutes);
app.use('/api/catalogs', catalogRoutes);
app.use('/api/reactions', reactionRoutes);
app.use('/api/student', studentRoutes);     // регистрация, вход
app.use('/api/student/invite', inviteRoutes); // инвайты
app.use('/api/moderation', moderationRoutes);  

app.get('/', (req, res) => {
  res.send('ПОБЕДА!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`ПОРТ: ${PORT}`);
});
