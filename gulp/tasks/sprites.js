var gulp = require('gulp'),
svgSprite =require('gulp-svg-sprite'),
rename = require ('gulp-rename'),
del = require('del'),
svg2png = require('gulp-svg2png');

var config = {
    shape: {
        spacing:{
            padding: 1
        }
    },
    mode: {
        css: {
            variables: {
                replaceSvgWithPng: function(){
                    return function(sprite,render){
                        return render(sprite).split('.svg').join('.png');
                    }
                }
            },
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
// The createPngCopy has a dependecy, it is: createSprite.
gulp.task('createPngCopy',['createSprite'], function(){
    // The next line target the source folder where the svg file is.
    return gulp.src('./app/temp/sprite/css/*.svg')
    // The next line will make the conversion fromsvg to png.
    .pipe(svg2png())
    // The next line target the destination folder to where the new png file will be.
    .pipe(gulp.dest('./app/temp/sprite/css'));  
});

/* The next task move the sprite file 
from src('./app/temp/sprite/css/...') to dest('./app/assets/images/sprites') */
// The task copySpriteGraphic has a new dependecy, instaed of the 
// previous createSprite, it is: createPngCopy
gulp.task('copySpriteGraphic', ['createPngCopy'],  function(){
    return gulp.src('./app/temp/sprite/css/**/*.{svg,png}')
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

gulp.task('icons', ['beginClean', 'createSprite', 'createPngCopy', 'copySpriteGraphic',  'copySpriteCSS', 'endClean']);

