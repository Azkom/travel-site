var gulp = require('gulp'),
svgSprite =require('gulp-svg-sprite'),
rename = require ('gulp-rename'),
del = require('del');

var config = {
    mode: {
        css: {
            sprite: 'sprite.svg',
            render: {
                css: {
                    template: './gulp/templates/sprite.css' 
                }
            }

        }
    }

}

gulp.task('beginClean', function(){
    return del(['./app/temp/sprite', './app/assets/images/sprites']);
});

gulp.task('createSprite', ['beginClean'], function(){
    return gulp.src('./app/assets/images/icons/**/*.svg')
      .pipe(svgSprite(config))         
      .pipe(gulp.dest('./app/temp/sprite'));
});

/* The next task move the sprite file 
from src('./app/temp/sprite/css/...') to dest('./app/assets/images/sprites') */

gulp.task('copySpriteGraphic', ['createSprite'],  function(){
    return gulp.src('./app/temp/sprite/css/**/*.svg')
    .pipe(gulp.dest('./app/assets/images/sprites'));
});
/* The gulp task moves the sprite.css to 
the common modules folder */
gulp.task ('copySpriteCSS', ['createSprite'], function(){
    return gulp.src('./app/temp/sprite/css/*.css')
    /* The next pipe renames the sprite.css to _sprite.css */
    .pipe(rename('_sprite.css'))
    .pipe(gulp.dest('./app/assets/styles/modules'));
});
/* This Gulp task clean the app/temp/sprite folder */
gulp.task('endClean', ['copySpriteGraphic', 'copySpriteCSS'],  function(){
    return del('./app/temp/sprite');
});

/* The next gulp task runs automatically the two
gulp tasks: copySpriteCSS and createSprite */

gulp.task('icons', ['beginClean', 'createSprite', 'copySpriteGraphic',  'copySpriteCSS', 'endClean']);

