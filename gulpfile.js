var path = require('path');
var gulp = require('gulp');
var $ = require('gulp-load-plugins')();


gulp.task('lint', function() {
  return gulp.src('./apps/**')
      .pipe($.eslint())
      .pipe($.eslint.format())
});
