/* eslint-disable @typescript-eslint/no-var-requires */
const gulp = require('gulp')
const gulpless = require('gulp-less')
const minifycss = require('gulp-minify-css')

gulp.task('less', () => {
  return gulp.src('./src/index.less')
    .pipe(gulpless())
    .pipe(minifycss())
    .pipe(gulp.dest('./dist'))
})
