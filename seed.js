const mongoose = require('mongoose');
const Training = require('./models/Training');
const User = require('./models/User');
const bcrypt = require('bcryptjs');

const mongoURI = 'mongodb://127.0.0.1:27017/voleiDB';

require('dotenv').config();


async function seed() {
    await mongoose.connect(process.env.MONGO_URI);
    
    // Limpar dados existentes
    await Training.deleteMany({});
    await User.deleteMany({});

    // Criar Admin
    const hashedAdminPassword = await bcrypt.hash('admin123', 10);
    const admin = new User({
        username: 'admin',
        email: 'admin@volei.com',
        password: hashedAdminPassword,
        isAdmin: true
    });
    await admin.save();

    // Criar Treinos Iniciais
    const trainings = [
        { title: 'Fundamentos do Saque', description: 'Aprenda as técnicas de saque por baixo e por cima para iniciar o jogo com vantagem.', category: 'Saque', difficulty: 'Iniciante' },
        { title: 'Recepção e Manchete', description: 'Exercícios focados no controle da bola e posicionamento dos braços.', category: 'Defesa', difficulty: 'Iniciante' },
        { title: 'Ataque de Ponta', description: 'Técnicas de salto e batida na bola para maximizar a potência.', category: 'Ataque', difficulty: 'Intermediário' },
        { title: 'Bloqueio Duplo', description: 'Coordenação entre jogadores para fechar a rede contra ataques adversários.', category: 'Defesa', difficulty: 'Avançado' }
    ];

    await Training.insertMany(trainings);
    console.log('Banco de dados populado com sucesso!');
    process.exit();
}

seed();
