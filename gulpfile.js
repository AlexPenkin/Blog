var postcss = require('gulp-postcss');
var gulp = require('gulp');
var autoprefixer = require('autoprefixer');
// var browserSync = require('browser-sync').create();
var cssnano = require('cssnano');
var rename = require('gulp-rename');


gulp.watch('./public/css/style.css', ['css']);
gulp.task('css', function () {
    var plugins = [
        autoprefixer({browsers: ['last 3 version']}),
        cssnano()
    ];
    // browserSync.reload();
    return gulp.src('./public/css/style.css')
        .pipe(postcss(plugins))
        .pipe(rename('main.min.css'))
        .pipe(gulp.dest('./public/css'));
});
// gulp.task('browser-sync', function() {
//     browserSync.init({
//         proxy: "localhost:3000"
//     });
// });
