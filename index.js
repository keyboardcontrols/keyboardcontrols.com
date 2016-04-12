var Metalsmith = require('metalsmith'),
    _ = require('lodash'),
    collections = require('metalsmith-collections')
    handlebars = require('handlebars'),
    layouts = require('metalsmith-layouts'),
    markdown = require('metalsmith-markdown'),
    moment = require('moment'),
    publishon = require('metalsmith-publishon');

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
  .use(publishon({
    pattern: /articles\/\.md/
  }))
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
