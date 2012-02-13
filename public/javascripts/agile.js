var backlog_tasks = [
    {
        id: 1,
        task_name: 'task number 5',
        points_value: 3,
        task_description: 'Some description text to read and fix.',
        not_started: 1

    },
    {
        id: 2,
        task_name: 'task number 6',
        points_value: 9,
        taskDescription: 'Some other description text to read and fix. trololo',
        not_started: 1
    }
];

var icebox_tasks = [
    {
        id: 3,
        task_name: 'task number 7',
        points_value: 3,
        task_description: 'Some description text to read and fix.',
        not_started: 1

    },
    {
        id: 4,
        task_name: 'task number 8',
        task_description: 'Some other description text to read and fix. trololo',
        not_started: 1
    }
];

var current_tasks = [
    {
        id: 5,
        task_name: 'task number 3',
        points_value: 3,
        task_description: 'Some description text to read and fix.',
        started: 1

    },
    {
        id: 6,
        task_name: 'task number 4',
        points_value: 9,
        taskDescription: 'Some other description text to read and fix. trololo',
        finished: 1
    },
    {
        id: 7,
        task_name: 'task number 4.3',
        points_value: 9,
        taskDescription: 'Some other description text to read and fix. trololo',
        delivered: 1
    },
    {
        id: 8,
        task_name: 'task number 4.9',
        points_value: 9,
        taskDescription: 'Some other description text to read and fix. trololo',
        rejected: 1
    }
];

var emptyTask = {
        id: null,
        task_name: '',
        task_description: '',
        not_started: 1

    }

//start here

var icebox = 'section#icebox > ol';
var backlog = 'section#backlog > ol';
var current = 'section#current > ol';

var ejs = require('ejs');
ejs.open = '{{';
ejs.close = '}}';

addNewItem = function(e) {
	var items = document.getElementById('taskTmpl').innerHTML;
	html = ejs.render(items, { item: emptyTask });
	$(icebox).prepend(html);
	$($(icebox).children()[0]).click(function() {
            $(this).parent().children('div.description').toggle("slow");
        });
	e.preventDefault();
	return false;
}


$(document).ready(function() {
	$('#taskTmpl').tmpl(backlog_tasks).appendTo(backlog);
    $('#taskTmpl').tmpl(icebox_tasks).appendTo(icebox);
    $('#taskTmpl').tmpl(current_tasks).appendTo(current);
    $(current).sortable({ connectWith: backlog + ', '+ icebox });
    $(backlog).sortable({ connectWith: current + ', '+ icebox });
    $(icebox).sortable({ connectWith: backlog, update: function(event, ui) {

        alert($(ui.item).html());
    } });

    $('hgroup').each(function() {
        $(this).click(function() {
            $(this).parent().children('div.description').toggle("slow");
        });

    })
});