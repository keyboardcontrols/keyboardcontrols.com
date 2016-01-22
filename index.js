var Metalsmith = require('metalsmith'),
    _ = require('lodash'),
    collections = require('metalsmith-collections'),
    handlebars = require('handlebars'),
    layouts = require('metalsmith-layouts'),
    markdown = require('metalsmith-markdown'),
    moment = require('moment'),
    sass = require('metalsmith-sass'),
    uglify = require('metalsmith-uglify');

handlebars.registerHelper('date', function(date) {
  return moment(date).format('MMMM DD, YYYY');
});

handlebars.registerHelper('articleSlug', function(date, title) {
  var formattedDate = moment(date).format('YYYY-MM-DD');

  return formattedDate + '-' + _.kebabCase(title) + '.html';
});

Metalsmith(__dirname)
  .ignore([
    '**/scripts/*',
    '**/styles/*'
  ])
  .source('src')
  .destination('build')
  .use(collections({
    articles: {
      pattern: '**/*.md',
      sortBy: 'date',
      reverse: true
    }
  }))
  .use(markdown({
    gfm: true,
    sanitize: true,
    tables: true
  }))
  .use(layouts({
    default: 'default.html',
    directory: '_layouts',
    engine: 'handlebars',
    partials: '_partials'
  }))
  .build(function(err) {
    if (err) throw err;
  });

Metalsmith(__dirname)
  .source('src/scripts')
  .destination('build')
  .use(uglify({
    preserveComments: true,
    removeOriginal: true
  }))
  .build(function(err) {
    if (err) throw err;
  });

Metalsmith(__dirname)
  .source('src/styles')
  .destination('build')
  .use(sass({
    outputStyle: 'compressed',
    includePaths: ['./node_modules/bootstrap-sass/assets/stylesheets']
  }))
  .build(function(err) {
    if (err) throw err;
  });
