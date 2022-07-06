$(init);

function init() {
  $(".droppable-area1, .droppable-area2").sortable({
    connectWith: ".connected-sortable",
    stack: '.connected-sortable ul'
  }).disableSelection();
}

$(function () {
  $('.btn').click(function () {
    var str = ''
    var value = $('.droppable-area2 li').each(function (i) {
      str += $(this).html() + ",";
    });
    $(".query p").html("SELECT " + str + "<br>FROM table_name");

    console.log(JSON.stringify(
      $('#builder').queryBuilder('getRules'), undefined, 2
    ));

    $.post('/table', str, function (response) {
      $(".table").html(response);
    });
  });
});

$(document).ready(function () {
  var options = {
    allow_empty: true,

    filters: [
      {
        id: 'name',
        label: 'Name',
        type: 'string',
        default_value: 'asdf',
        size: 30,
        unique: true
      },
      {
        id: 'date',
        label: 'date',
        type: 'date',
        default_value: 'asdf',
        size: 30,
        unique: true
      },

    ]
  }

  $('#builder').queryBuilder(options);
});
