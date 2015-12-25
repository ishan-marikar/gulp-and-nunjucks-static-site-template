var gulp = require('gulp');
var nunjucksRender = require('gulp-nunjucks-render');
var browserSync = require('browser-sync').create();

var paths = {
  source: 'src/',
  destination: 'dist/',
};

var assets = {
  templates: {
    path: paths.source + 'templates',
    glob: paths.source + 'pages/**/*.+(html|nunjucks)',
    watch: paths.source + '**/*.html'
  }
};

gulp.task('nunjucks', function() {
  nunjucksRender.nunjucks.configure([assets.templates.path]);
  // Gets .html and .nunjucks files in pages
  return gulp.src(assets.templates.glob)
    // Renders template with nunjucks
    .pipe(nunjucksRender())
    // output files in app folder
    .pipe(gulp.dest(paths.destination));
});

// Static server
gulp.task('browser-sync', function() {
  browserSync.init({
    server: {
      baseDir: paths.destination
    }
  });
});

gulp.task('watch', function() {
  console.log(paths, assets);
  gulp.watch(assets.templates.watch, ['nunjucks']).on("change", browserSync.reload);
});

gulp.task('default', ['watch', 'browser-sync']);
