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


    var filters = JSON.stringify(
      $('#builder').queryBuilder('getRules'), undefined, 2
    );

    $.post('/table', JSON.stringify({ 'select': str, 'filter': filters }), function (response) {
      $(".query p").html("SELECT " + str + "<br>FROM table_name<br>WHERE" + filters);
      $(".table").html(response);
    });
  });
});

$(document).ready(function () {
  $.get('/get_schema', function (response) {
    var filters = $.parseJSON(response);
    var options = {
      allow_empty: true,
      filters: filters,
    }

    $('#builder').queryBuilder(options);
  });


});