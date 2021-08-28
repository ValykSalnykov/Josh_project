const gulp = require('gulp');
const browserSync = require('browser-sync');
const sass = require('gulp-sass');
const { src } = require('gulp');
const rename = require("gulp-rename");
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
//Live server
gulp.task('server', function() {
    browserSync.init({
        server: {
            baseDir: "src"
        }
    });
});
//Commpressed, rename, clean, stream and autoprefix sass/scss
gulp.task('styles', function() {
    return gulp.src("src/sass/*.+(scss|sass)")
            .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
            .pipe((rename({prefix: "",suffix: ".min",})))
            .pipe(autoprefixer({cascade: false}))
            .pipe(cleanCSS({compatibility: 'ie8'}))
            .pipe(gulp.dest("src/css"))
            .pipe(browserSync.stream());
})
//Watching edite files and reload
gulp.task('watch', function() {
    gulp.watch("src/sass/**/*.+(scss|sass)", gulp.parallel("styles"))
    gulp.watch("src/*.html").on('change', browserSync.reload)
})
//tasks run default parallel command gulp
gulp.task('default', gulp.parallel('watch', 'server', 'styles'));