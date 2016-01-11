var awsConfig = require('./.aws.json'),
    gulp = require('gulp'),
    streamqueue = require('streamqueue'),
    $ = require('gulp-load-plugins')();

gulp.task('metalsmith', ['scripts', 'styles'], $.shell.task([
  'node index.js'
]))

gulp.task('publish', ['metalsmith'], function() {
  var publisher = $.awspublish.create(awsConfig);

  return gulp.src(['./build/**'])
    .pipe(publisher.publish())
    .pipe(publisher.cache())
    .pipe($.awspublish.reporter());
});

gulp.task('scripts', function() {
  var vendor = [
    './node_modules/jquery/dist/jquery.min.js',
    './node_modules/angular/angular.min.js',
    './node_modules/angular-resource/angular-resource.min.js',
    './node_modules/moment/min/moment.min.js',
  ];

  return streamqueue({objectMode: true},
    gulp.src(vendor),
    gulp.src([
      './src/scripts/app.js'
    ])
      .pipe($.ngAnnotate({single_quotes: true}))
      .pipe($.uglify({preserveComments: 'license'}))
  )
    .pipe($.concat('./src/app.js'))
    .pipe(gulp.dest('./'));
});

gulp.task('styles', function() {
  return gulp.src('./src/styles/**/app.scss')
    .pipe($.sass({outputStyle: 'compressed'})
      .on('error', $.sass.logError))
    .pipe($.autoprefixer({browsers: ['last 2 versions'], cascade: false}))
    .pipe(gulp.dest('./src'));
});

gulp.task('watch:styles', function () {
  gulp.watch('./src/styles/**/*.scss', ['styles']);
});

gulp.task('watch:scripts', function () {
  gulp.watch('./src/scripts/**/*.js', ['scripts']);
});

gulp.task('watch:src', function () {
  gulp.watch([
    './src/**/*.css',
    './src/**/*.js',
    './src/**/*.html',
    './src/**/*.js',
    './src/**/*.json',
    './_layouts/*',
    './_partials/*'
  ], ['metalsmith']);
});

gulp.task('default', ['watch:styles', 'watch:scripts', 'watch:src'])
