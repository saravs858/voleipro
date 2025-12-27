const Training = require('../models/Training');
const Comment = require('../models/Comment');

exports.getAllTrainings = async (req, res) => {
    const trainings = await Training.find();
    res.render('trainings', { trainings, user: req.session.userId });
};

exports.getTrainingById = async (req, res) => {
    const training = await Training.findById(req.params.id);
    const comments = await Comment.find({ training: req.params.id }).populate('user');
    res.render('training-detail', { training, comments, user: req.session.userId });
};

exports.createTraining = async (req, res) => {
    if (!req.session.isAdmin) return res.status(403).send("Acesso negado.");
    const { title, description, category, difficulty } = req.body;
    const newTraining = new Training({ title, description, category, difficulty });
    await newTraining.save();
    res.redirect('/admin');
};

exports.updateTraining = async (req, res) => {
    if (!req.session.isAdmin) return res.status(403).send("Acesso negado.");
    await Training.findByIdAndUpdate(req.params.id, req.body);
    res.redirect('/admin');
};

exports.deleteTraining = async (req, res) => {
    if (!req.session.isAdmin) return res.status(403).send("Acesso negado.");
    await Training.findByIdAndDelete(req.params.id);
    res.redirect('/admin');
};
