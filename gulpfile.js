var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync').create();

gulp.task('build:scss', function() {
  return gulp.src('./sass/style.scss')
    .pipe(sourcemaps.init())
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./css/'))
    .pipe(browserSync.stream());
});

gulp.task('browser-sync', ['build:scss'], function() {
  browserSync.init({
    server: {
      baseDir: "./"
    }
  });

  gulp.watch('./sass/*.scss', ['build:scss']);
  gulp.watch('*.html', browserSync.reload);
});

gulp.task('default', ['browser-sync']);
