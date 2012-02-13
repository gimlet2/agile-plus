/*
 * GET home page.
 */
var project = require('../models/project.js');

exports.index = function (req, res) {
    if (req.session.auth && req.session.auth.loggedIn) {
        req.session.userId = req.session.auth.google.user.id;
    }
    res.render('index.html', { title:'Main', layout:'main' });
};

exports.about = function (req, res) {
    res.render('about.html', { title:'About', layout:'main' });
};

exports.createProject = function (req, res) {
    res.render('create.html', {layout: 'main1'});
}

