var gulp = require('gulp');
var del = require('del');
var sass = require('gulp-sass');
var pug = require('gulp-pug');
var browserSync = require('browser-sync').create();

// Удаляем все из деректории public
gulp.task('clean', function(cb) {
  return del('./public', cb);
});

// Компилируем SCSS в CSS
gulp.task('sass', function() {
  return gulp.src('./src/style/*.{scss,css}')
    .pipe(sass()).on('error', sass.logError)
    .pipe(gulp.dest('./public/css'));
});

// Компилируем Pug в HTML
gulp.task('pug', function() {
  return gulp.src('./src/*.pug')
    .pipe(pug({ pretty:true }))
    .pipe(gulp.dest('./public'));
});

// Копируем JS
gulp.task('js', function() {
  return gulp.src('./src/js/*.js')
    .pipe(gulp.dest('./public/js'))
});

// Копируем шрифты
gulp.task('fonts', function() {
  return gulp.src('./src/fonts/*.*')
    .pipe(gulp.dest('./public/fonts'))
});

// Копируем изображения
gulp.task('img', function() {
  return gulp.src('./src/img/*.*')
    .pipe(gulp.dest('./public/img'))
});

// Автоматическая перезагрузка страницы
gulp.task('serve', function () {
    browserSync.init({
        server: './public'
    });
    browserSync.watch(['./public/**/*.*'], browserSync.reload);
});


// Отслеживаем изменения в файлах
gulp.task('watch', function() {
  gulp.watch('./src/style/**/*.scss', gulp.series('sass'));
  gulp.watch('./src/**/*.pug', gulp.series('pug'));
  gulp.watch('./src/js/**/*.js', gulp.series('js'));
});

// Запускает сборку командой "gulp"
gulp.task('default', gulp.series(
  'clean',
  gulp.parallel(
    'sass',
    'fonts',
    'img',
    'pug',
    'js'
  ),
  gulp.parallel(
    'watch',
    'serve'
  )
));
