var gulp = require('gulp'),
// Activation of the installed 'gulp-watch'
postcss = require('gulp-postcss'),
//activation of the installed 'autoprefixer'
autoprefixer = require('autoprefixer'),
//Activation of the installed 'postcss-simple-vars'
cssvars = require('postcss-simple-vars')
//Activqation of the installed 'postcss-nested'
nested = require('postcss-nested'),
cssImport = require('postcss-import');

gulp.task('styles', function(){
    /* We will delete the test line to install some useful css related line
    console.log("Here is a place of a CSS related task.");*/
    return  gulp.src('./app/assets/styles/styles.css')
        .pipe(postcss([cssImport, cssvars, nested, autoprefixer]))
        .on('error', function(errorInfo){
            console.log(errorInfo.toString());
            this.emit('end');
        })
        .pipe(gulp.dest('./app/temp/styles'));
});
