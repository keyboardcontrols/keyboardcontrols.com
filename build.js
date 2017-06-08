var yaml = require('js-yaml'),
    path = require('path'),
    fs = require('fs');

try {
    fs.readdir('./_games', function(err, files) {
        files.forEach(function(file) {
            var filePath = path.join('./_games', file);
            var fileBasename = path.basename(file, '.yaml');

            doc = yaml.safeLoad(fs.readFileSync(filePath));

            fs.writeFileSync(
                './_site/games/' + fileBasename + '.json',
                JSON.stringify(doc)
            );
        });
    });
} catch (e) {
    console.log(e);
}