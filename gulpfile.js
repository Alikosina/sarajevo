var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();

gulp.task('sass', function() {
    return gulp.src('src/styles/index.scss')
    .pipe(sass())
    .pipe(gulp.dest('dist/styles'))
});

gulp.task('copy-img', function() {
    return gulp
    .src('./images/*')
    .pipe(gulp.dest('./dist/images'));
});

gulp.task('copy-fonts', function() {
    return gulp
    .src('./src/fonts/*/*')
    .pipe(gulp.dest('./dist/fonts'));
})

gulp.task('watch', gulp.series(['sass', 'copy-img', 'copy-fonts'], function (done) {
    browserSync.reload();
    done();
}));

gulp.task('default', gulp.series(['sass', 'copy-img', 'copy-fonts'], function () {
    browserSync.init({
        server: {
            baseDir: "./dist"
        }
    });
    gulp.watch('src/styles/**/*.scss', gulp.series(['watch']));
}));