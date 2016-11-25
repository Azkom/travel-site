var gulp = require('gulp'),
// Activation of the installed 'gulp-watch'
watch = require('gulp-watch'),
browserSync = require('browser-sync').create();


// Create a new task: watch by the next command lines:
gulp.task('watch', function(){
// The next lines makes the autorefresh of the browser.
browserSync.init({
    notify: false,
    server: {
        baseDir: "app"
    }
});

// The index.html file in app folder, which the program will watch,
// and in case of changes, trigger the 'html' task by 'gulp.start('html');. 
    watch('./app/index.html', function(){
       browserSync.reload();
    });
// The watch task above is a html related task. 
// Let's try to make a css related task.
    watch('./app/assets/styles/**/*.css', function(){
        gulp.start('cssInject');

    });
    watch('./app/assets/scripts/**/*.js', function(){
        gulp.start('scriptsRefresh');
    });

});
gulp.task('cssInject', ['styles'], function(){
    return gulp.src('./app/temp/styles/styles.css')
    .pipe(browserSync.stream());
});

gulp.task('scriptsRefresh',['scripts'],  function(){
    browserSync.reload();
});
