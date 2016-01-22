var gulp = require('gulp'),
    $ = require('gulp-load-plugins')();

gulp.task('publish', ['metalsmith'], function() {

});

gulp.task('metalsmith', $.shell.task([
  'node index.js'
]))

gulp.task('watch', function() {
  return gulp.watch(['src/**', '_layouts/**', '_partials/**'], ['metalsmith']);
});

gulp.task('default', ['watch'])
