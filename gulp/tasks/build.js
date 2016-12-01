var gulp = require('gulp'),
imagemin = require('gulp-imagemin'),
del = require('del'),
usemin = require('gulp-usemin')
rev =require('gulp-rev'),
cssnano = require('gulp-cssnano'),
uglify = require('gulp-uglify'),
browserSync = require('browser-sync').create();

gulp.task('previewDist', function(){
    browserSync.init({
    notify: false,
    server: {
        baseDir: "docs"
    }
});

});

// Delete the dist folder
gulp.task('deleteDistFolder', ['icons'],  function(){
    return del("./docs");
});

var pathsToCopy = [
     './app/**/*',
     '!./app/index.html',
     '!./app/assets/images/**',
     '!./app/assets/styles/**',
     '!./app/assets/scripts/**',
     '!./app/temp',
     '!./app/temp/**'
]

gulp.task('copyGeneralFiles', ['deleteDistFolder'], function(){
    return gulp.src(pathsToCopy)
    .pipe(gulp.dest("./docs"));
});
// Image optimization
gulp.task('optimizeImages', ['deleteDistFolder'], function(){
    return gulp.src(['./app/assets/images/**/*', '!./app/assets/images/icons', '!./app/assets/images/icons/**/*'])
    .pipe(imagemin({
        // The next line setup optimizes JPEG images.
        progressive: true,
        // The next line helps in case of GIF images.
        interlaced: true,
        // The next line helps in case of SVG files.
        multipass: true
    }))
    .pipe(gulp.dest("./docs/assets/images"));
});

gulp.task('useminTrigger',['deleteDistFolder'],  function(){
    gulp.start('usemin');
});

gulp.task('usemin', ['styles', 'scripts'],  function(){
    return gulp.src("./app/index.html")
    .pipe(usemin({
        // The next line is for CSS REVISION 'rev' and COMPRESS 'cssnano'.
        css:[function(){return rev()}, function(){return cssnano()}],
        // The next line is for JS REVISION 'rev' and JS COMPRESS 'uglify'.
        js: [function(){return rev()}, function(){return uglify()}]
    }))
    .pipe(gulp.dest("./docs"));
});

gulp.task('build', ['deleteDistFolder','copyGeneralFiles', 'optimizeImages', 'useminTrigger']);