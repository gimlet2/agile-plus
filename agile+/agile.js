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

$(document).ready(function() {
    $('#taskTmpl').tmpl(backlog_tasks).appendTo('section#backlog > ol');
    $('#taskTmpl').tmpl(icebox_tasks).appendTo('section#icebox > ol');
    $('#taskTmpl').tmpl(current_tasks).appendTo('section#current > ol');
    $('section#current > ol').sortable({ connectWith: 'section#backlog > ol, section#icebox > ol' });
    $('section#backlog > ol').sortable({ connectWith: 'section#current > ol, section#icebox > ol' });
    $('section#icebox > ol').sortable({ connectWith: 'section#backlog > ol', update: function(event, ui) {

        alert($(ui.item).html());
    } });

    $('hgroup').each(function() {
        $(this).click(function() {
            $(this).parent().children('div.description').toggle("slow");
        });

    })
});