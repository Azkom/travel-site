var gulp = require('gulp'),
webpack = require('webpack');

// The scripts has a dependency, it is: modernizr.
// Before running the gulp task scripts, the modernizr is running,
// to make the necessary adjustments.
gulp.task('scripts',['modernizr'],  function(callback){
    webpack(require('../../webpack.config.js'), function(err,stats){
        if (err) {
            console.log(err.toString());
        }

        console.log(stats.toString());
        callback();
    });
});