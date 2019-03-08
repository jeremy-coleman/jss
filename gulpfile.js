require('sucrase/register')
var gulp = require('gulp')
var rename = require('gulp-rename')
var babel = require('gulp-babel')
var cp = require('child_process')

var codemod = require('babel-codemod')
var execa = require('execa')
// rename via function


gulp.task('copy:tests', () => {
    return gulp.src("./packages_temp/**/*test.js")
      .pipe(babel())
      .pipe(gulp.dest("./test"))
})

gulp.task('copy:source', () => {
  return gulp.src(['packages/**/*.js', '!packages/**/*test.js'])
    //.pipe(babel())
    .pipe(gulp.dest("./_temp"))
})

gulp.task('copy:converted', () => {
  return gulp.src(['_temp/**/*.{ts,tsx}'])
    //.pipe(babel())
    .pipe(gulp.dest("./src"))
})


gulp.task('mod:flow-to-typescript', async () => {
  execa("codemod --plugin babel-plugin-flow-to-typescript _temp/**/*.js")
})

gulp.task('rename:js-to-ts', () => {
  return gulp.src(['_temp/**/*.js'])
    .pipe(rename((path) => {path.extname = ".ts"}))
    .pipe(gulp.dest("./_converted"))
})

gulp.task('transpile:babel', () => {
  return gulp.src("./packages/**/*.js")
    .pipe(babel())
    .pipe(gulp.dest("./_babel"))
})

gulp.task('mod', async () => {
  return gulp.series('copy:source', 'mod:flow-to-typescript')
})
