var gulp = require('gulp'),
// Activation of the installed 'gulp-watch'
watch = require('gulp-watch'),
// Activation of the installed 'gulp-postcss'
postcss = require('gulp-postcss'),
//activation of the installed 'autoprefixer'
autoprefixer = require('autoprefixer'),
//Activation of the installed 'postcss-simple-vars'
cssvars = require('postcss-simple-vars')
//Activqation of the installed 'postcss-nested'
nested = require('postcss-nested');
;


// The Task 'default' is the following

gulp.task('default', function(){
    console.log('Az első Gulp task készen van.');
});
// This is an other task to test the operation of gulp
gulp.task('html', function(){
    console.log("Here is a place of a HTML related task.");
});
gulp.task('styles', function(){
    /* We will delete the test line to install some useful css related line
    console.log("Here is a place of a CSS related task.");*/
    return  gulp.src('./app/assets/styles/styles.css')
        .pipe(postcss([cssvars, nested, autoprefixer]))
        .pipe(gulp.dest('./app/temp/styles'));
});

// Create a new task: watch by the next command lines:
gulp.task('watch', function(){
// The index.html file in app folder, which the program will watch,
// and in case of changes, trigger the 'html' task by 'gulp.start('html');. 
    watch('./app/index.html', function(){
        gulp.start('html');
    });
// The watch task above is a html related task. 
// Let's try to make a css related task.
    watch('./app/assets/styles/**/*.css', function(){
        gulp.start('styles');

    });

});
