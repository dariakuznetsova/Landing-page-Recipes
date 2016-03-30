var gulp = require("gulp"),
	browserSync = require("browser-sync"),
	rimraf = require('gulp-rimraf'),
	useref = require('gulp-useref'),
	uglify = require('gulp-uglify'),
	gulpif = require('gulp-if'),
	minifyCss = require('gulp-minify-css'),
	filter = require('gulp-filter'),
	imagemin = require('gulp-imagemin'),
	size = require('gulp-size'),
	jade = require('gulp-jade'),
	compass = require('gulp-compass'),
	spritesmith = require('gulp.spritesmith');


// Сервер
gulp.task ('server', function () {
	browserSync ({
		port: 9000,
		server: {
			baseDir: 'site'
		}
	});
});

// Jade
gulp.task('jade', function () {
	gulp.src('jade/*.jade')
		.pipe(jade({pretty: '\t'}))
		.pipe(gulp.dest('site'));
});

// Compass
gulp.task('compass', function() {
  gulp.src('sass/*.scss')
    .pipe(compass({
      config_file: 'config.rb',
      css: 'site/css',
      sass: 'sass'
    }))
});

// Sprites
gulp.task('sprite', function () {
  var spriteData = gulp.src('sprites/cuisine/*.jpg').pipe(spritesmith({
    imgName: 'sprite2.png',
    cssName: 'sprite2.scss',
    padding: 70
  }));
  return spriteData.pipe(gulp.dest('site/images'));
});

// Слежка
gulp.task ('watch', function () {
	gulp.watch ([
		'site/*.html',
		'site/js/**/*.js',
		'site/css/*.css'
	]).on ('change', browserSync.reload);
	gulp.watch ('sass/**/*.scss', ['compass']);
	gulp.watch ('jade/**/*.jade', ['jade']);
});

// Задача по умолчанию
gulp.task ('default', ['server', 'watch']);

// Сборка - перенос html, css, js в папку dist
gulp.task ('useref', function () {
	return gulp.src('site/*.html')
		.pipe(useref())
		.pipe(gulpif('*.js', uglify()))
		.pipe(gulpif('*.css', minifyCss({compatibility: 'ie8'})))
		.pipe(gulp.dest('dist'));
});

// Очистка
gulp.task ('clean', function () {
	return gulp.src ('dist', { read: false })
	.pipe(rimraf());
});

// Перенос шрифтов
gulp.task('fonts', function () {
	gulp.src('site/fonts/*')
		.pipe(filter(['*.eot','*.svg','*.ttf','*.woff','*.woff2']))
		.pipe(gulp.dest('dist/fonts/'))		
});

// Картинки
gulp.task('images', function () {
	return gulp.src('site/images/**/*')
		.pipe(imagemin({
			progressive: true,
			interlaced: true
		}))
		.pipe(gulp.dest('dist/images'));
});

// Остальные файлы (напр. favicon.io и пр.)
gulp.task('extras', function () {
	return gulp.src([
		'site/*.*',
		'!site/*.html'
	]).pipe(gulp.dest('dist'));
});

// Собираем папку DIST (только после компиляции Jade)
gulp.task('build', ['clean'], function () {
	gulp.start('dist');
});

// Сборка и вывод размера содержимого папки dist
gulp.task('dist', ['useref', 'images', 'fonts', 'extras'], function () {
	return gulp.src('dist/**/*').pipe(size({title: 'build'}));
});

// ==============
// gulp.task(name, deps, fn)
// deps - массив задач, которые будут выполнены 
// ДО запуска задачи name

// Проверка, все ли работает
gulp.task ('serverdist', function () {
	browserSync ({
		port: 8050,
		server: {
			baseDir: 'dist'
		}
	});
});
