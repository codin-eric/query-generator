$(function () {
  $("#selectAll").click(function () {
    $("input[type=checkbox]").prop("checked", $(this).prop("checked"));
  });

  $("input[type=checkbox]").click(function () {
    if (!$(this).prop("checked")) {
      $("#selectAll").prop("checked", false);
    }
  });

  $('.apply').click(function () {
    var str = ''
    $('.select input[type=checkbox]:checked').each(function () {
      str += this.value + ',';
    });

    var filters = JSON.stringify(
      $('#builder').queryBuilder('getRules'), undefined, 2
    );
    $.post('/table', JSON.stringify({ 'select': str, 'filter': filters }), function (response) {
      $(".query p").html("SELECT " + str + "<br>FROM table_name<br>WHERE " + filters);
      $(".table").html(response);
      $.post('/download', JSON.stringify({ 'select': str, 'filter': filters }), function (response) {
        console.log('download')
        console.log(response)
        $('.download').removeAttr('hidden')
        // $('.download').attr("href", response)
        $('.download').attr("href", 'https://storage.cloud.google.com/od-io-datascience-datalake-data-devl/test/data.csv?authuser=0')
      });
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