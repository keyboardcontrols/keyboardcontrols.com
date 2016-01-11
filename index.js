var Metalsmith = require('metalsmith'),
    ejs = require('ejs'),
    layouts = require('metalsmith-layouts'),
    markdown = require('metalsmith-markdown');

Metalsmith(__dirname)
  .ignore([
    '**/scripts/*',
    '**/styles/*'
  ])
  .metadata({
    site: {
      title: 'Angular Seed',
      description: 'Angular Seed'
    }
  })
  .source('src')
  .destination('build')
  .use(markdown({
    gfm: true,
    sanitize: true,
    tables: true
  }))
  .use(layouts({
    default: 'default.ejs',
    directory: '_layouts',
    engine: 'ejs',
    partials: '_partials',
    pattern: '*.html'
  }))
  .build(function(err) {
    if (err) throw err;
  });
