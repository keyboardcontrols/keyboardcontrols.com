var gulp = require('gulp'),
    $ = require('gulp-load-plugins')();

gulp.task('build', ['metalsmith', 'scripts', 'stylesheets']);

gulp.task('metalsmith', $.shell.task([
  'node index.js'
]))

gulp.task('scripts', function() {
  return gulp.src([
    'src/scripts/app.js'
  ])
    .pipe($.sourcemaps.init())
    .pipe($.concat('build/app.js'))
    .pipe($.uglify({preserveComments:'license'}))
    .pipe($.sourcemaps.write('./'))
    .pipe(gulp.dest('./'));
});

gulp.task('stylesheets', function() {
  return gulp.src('src/styles/app.scss')
    .pipe($.sourcemaps.init())
    .pipe($.sass({
      outputStyle: 'compressed',
      includePaths: [
        './node_modules/basscss/css',
        './node_modules/highlight.js/styles',
        './node_modules/normalize.css'
      ]
    })
      .on('error', $.sass.logError))
    .pipe($.sourcemaps.write('./'))
    .pipe(gulp.dest('./build'));
});

gulp.task('watch', function() {
  return gulp.watch(['src/**'], ['build']);
});

gulp.task('default', ['watch'])
