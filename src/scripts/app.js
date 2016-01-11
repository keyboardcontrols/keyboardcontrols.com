angular.module('app', ['ngResource']);

$(function() {
  var articleTime = $('#article-date').attr('datetime');

  $('#article-date').text(moment(articleTime).format("MMMM DD, YYYY"));
});
