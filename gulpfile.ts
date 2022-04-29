/* eslint-disable @typescript-eslint/no-var-requires */
const gulp = require('gulp')
const less = require('gulp-less')

gulp.task('less', () => {
  return gulp.src('./src/index.less')
    .pipe(less())
    .pipe(gulp.dest('./dist'))
})
