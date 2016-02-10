var drafts = function (options) {
  return function (files, metalsmith, done) {
    var metadata = metalsmith.metadata();

    for (var file in files) {
      if (files[file].draft) delete files[file];
    }

    done();      
  };
};

module.exports = drafts;