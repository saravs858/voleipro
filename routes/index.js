const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const trainingController = require('../controllers/trainingController');
const Training = require('../models/Training');
const Comment = require('../models/Comment');

// Middlewares de autenticação
const isAuthenticated = (req, res, next) => req.session.userId ? next() : res.redirect('/login');
const isAdmin = (req, res, next) => req.session.isAdmin ? next() : res.status(403).send("Acesso negado.");

// Rotas de Páginas Estáticas/Simples
router.get('/', (req, res) => res.render('index', { user: req.session.userId }));
router.get('/about', (req, res) => res.render('about', { user: req.session.userId }));
router.get('/rules', (req, res) => res.render('rules', { user: req.session.userId }));
router.get('/positions', (req, res) => res.render('positions', { user: req.session.userId }));
router.get('/contact', (req, res) => res.render('contact', { user: req.session.userId }));

// Rotas de Autenticação
router.get('/login', (req, res) => res.render('login', { user: req.session.userId }));
router.post('/login', authController.login);
router.get('/register', (req, res) => res.render('register', { user: req.session.userId }));
router.post('/register', authController.register);
router.get('/logout', authController.logout);

// Rotas de Treinos
router.get('/trainings', trainingController.getAllTrainings);
router.get('/trainings/:id', trainingController.getTrainingById);

// Rota de Comentários
router.post('/trainings/:id/comment', isAuthenticated, async (req, res) => {
    const newComment = new Comment({
        user: req.session.userId,
        training: req.params.id,
        content: req.body.content
    });
    await newComment.save();
    res.redirect(`/trainings/${req.params.id}`);
});

// Rotas Admin
router.get('/admin', isAdmin, async (req, res) => {
    const trainings = await Training.find();
    res.render('admin', { trainings, user: req.session.userId });
});
router.post('/admin/training', isAdmin, trainingController.createTraining);
router.post('/admin/training/update/:id', isAdmin, trainingController.updateTraining);
router.get('/admin/training/delete/:id', isAdmin, trainingController.deleteTraining);

module.exports = router;
