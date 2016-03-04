var Metalsmith = require('metalsmith'),
    _ = require('lodash'),
    collections = require('metalsmith-collections'),
    drafts = require('./plugins/drafts'),
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
  .clean(false)
  .ignore([
    '**/scripts/*',
    '**/styles/*',
    '**/_layouts/*',
    '**/_partials/*'
  ])
  .source('src')
  .use(drafts())
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
    directory: 'src/_layouts',
    engine: 'handlebars',
    partials: 'src/_partials'
  }))
  .build(function(err) {
    if (err) throw err;
  });

Metalsmith(__dirname)
  .clean(false)
  .source('src/styles')
  .destination('build')
  .use(sass({
    outputStyle: 'compressed',
    includePaths: [
      './node_modules/basscss/css',
      './node_modules/colors.css/sass',
      './node_modules/highlight.js/styles',
      './node_modules/normalize.css'
    ]
  }))
  .build(function(err) {
    if (err) throw err;
  });
