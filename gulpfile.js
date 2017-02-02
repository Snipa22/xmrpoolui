var gulp = require('gulp');
var connect = require('gulp-connect');
var manifest = require('gulp-manifest');

gulp.task('html', function(){
  return gulp.src(['app/**/*.html', '!app/vendor/**/*'])
    .pipe(connect.reload())
    .pipe(gulp.dest('build/'))
});

gulp.task('css', function(){
  return gulp.src(['app/**/*.css', '!app/vendor/**/*'])
    .pipe(connect.reload())
    .pipe(gulp.dest('build/'))
});

gulp.task('js', function(){
  return gulp.src(['app/**/*.js', '!app/vendor/**/*'])
    .pipe(connect.reload())
    .pipe(gulp.dest('build/'))
});

gulp.task('assets', function(){
  return gulp.src('app/assets/*')
    .pipe(connect.reload())
    .pipe(gulp.dest('build/assets'))
});

gulp.task('connect', function() {
  connect.server({
    root: 'build',
    livereload: true
  });
});

gulp.task('vendor', function() {
  return gulp.src([
    'app/vendor/**/font-awesome.min.css',
    'app/vendor/**/dist/css/bootstrap.css',
    'app/vendor/**/dist/web-font/style.css',
    'app/vendor/**/dist/jquery.js',
    'app/vendor/**/moment.js',
    'app/vendor/**/dist/js/bootstrap.js',
    'app/vendor/**/angular.js',
    'app/vendor/**/angular-route.js',
    'app/vendor/**/ngStorage.js',
    'app/vendor/**/angular-moment.js',
    'app/vendor/**/app/angular.audio.js',
    'app/vendor/**/ui-bootstrap-tpls.js',
    'app/vendor/**/dist/jquery.js',
    'app/vendor/**/moment.js',
    'app/vendor/**/dist/js/bootstrap.js',
    'app/vendor/**/fonts/*.woff2',
    'app/vendor/**/fonts/*.woff',
    'app/vendor/**/fonts/*.tff'
    ])
    .pipe(gulp.dest('build/vendor'))
});

gulp.task('watch', function () {
  gulp.watch(['./app/**/*.html'], ['html', 'manifest']);
  gulp.watch(['./app/**/*.css'], ['css', 'manifest']);
  gulp.watch(['./app/**/*.js'], ['js', 'manifest']);
  gulp.watch(['./assets/*.*'], ['assets', 'manifest']);
});

gulp.task('manifest', function(){
  gulp.src([
    'build/**/*'
    ], { base: './build' })
    .pipe(manifest({
      hash: true,
      preferOnline: true,
      network: ['*'],
      filename: 'app.manifest',
      exclude: 'app.manifest'
     }))
    .pipe(connect.reload())
    .pipe(gulp.dest('build'));
});

gulp.task('build', [ 'html', 'css', 'js', 'assets', 'vendor', 'manifest' ]);
gulp.task('default', [ 'build', 'connect', 'watch' ]);
