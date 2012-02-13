var mongoose = require('mongoose');
var Schema = mongoose.Schema
var ObjectId = Schema.ObjectId;

var Task = require('./task.js');
var TaskModel = mongoose.model('Task', Task);

var Project = exports = module.exports = new Schema({
    _id:ObjectId, name:String, owner:String, coOwners:[String], items:[Task]
});

var ProjectModel = exports.model = mongoose.model('Project', Project);

exports.getProject = function (userId, projectId, callBack, failBack) {
    ProjectModel.findOne({
                $or:[
                    {owner:userId},
                    { coOwners:{ $in:[userId] }}
                ],
                _id:projectId},
            function (error, result) {
                isProjectFound(result, function () {
                    callBack(result);
                }, failBack);
            });
}

exports.getProjectsForUser = function (userId, callBack) {
    ProjectModel.find({
                $or:[
                    {owner:userId},
                    { coOwners:{ $in:[userId] }}
                ] }
            , ['_id', 'name', 'owner'])
            .exec(function (error, result) {
                isProjectFound(JSON.stringify(result), callBack);
            });
}

exports.createProject = function (userId, projectName, callBack) {
    var project = new ProjectModel();
    project.name = projectName;
    project.owner = userId;
    saveProject(project, function () {
        exports.getProjectsForUser(userId, callBack);
    });
}

exports.deleteProject = function (userId, projectId, callBack) {
    ProjectModel.find({})
            .where('_id', projectId)
            .where('owner', userId)
            .remove(function () {
                exports.getProjectsForUser(userId, callBack);
            });
}

exports.addTaskToProject = function (userId, projectId, taskName, callBack) {
    exports.getProject(userId, projectId, function (project) {
        var task = new TaskModel();
        task.name = taskName;
        task.isBought = false;
        project.tasks.push(task);
        saveProject(project, callBack);
    });
}

exports.deleteTaskFromProject = function (userId, projectId, taskId, callBack) {
    exports.getProject(userId, projectId, function (project) {
        project.tasks.id(taskId).remove();
        saveProject(project, callBack);
    });
}

exports.addProjectCoOwner = function (userId, projectId, coOwnerId, callBack) {
    exports.getProject(userId, projectId, function (project) {
        project.coOwners.push(coOwnerId);
        saveProject(project, callBack);
    });
}


exports.deleteProjectCoOwner = function (userId, projectId, coOwnerId, callBack) {
    exports.getProject(userId, projectId, function (project) {
        project.coOwners.remove(coOwnerId);
        saveProject(project, callBack);
    });
}

saveProject = function (project, callBack) {
    project.save(function () {
        callBack(project);
    });
}

isProjectFound = function (project, callBack, failBack) {
    if (project == null) {
        console.error('project not found');
        failBack();
    } else {
        callBack(project);
    }
}

