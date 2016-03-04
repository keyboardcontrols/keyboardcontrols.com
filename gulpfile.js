var gulp = require('gulp'),
    $ = require('gulp-load-plugins')();

gulp.task('metalsmith', $.shell.task([
  'node index.js'
]))

gulp.task('scripts', function() {
  return gulp.src([
    'src/scripts/app.js'
  ])
    .pipe($.concat('build/app.js'))
    .pipe(gulp.dest('./'));
});

gulp.task('build', ['metalsmith', 'scripts']);

gulp.task('watch', function() {
  return gulp.watch(['src/**'], ['build']);
});

gulp.task('default', ['watch'])
