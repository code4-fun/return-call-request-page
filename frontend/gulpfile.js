const {src, dest, series, watch} = require('gulp')
const sass = require('gulp-sass')(require('sass'));
const csso = require('gulp-csso')
const include = require('gulp-file-include')
const htmlmin = require('gulp-htmlmin')
const del = require('del')
const sync = require('browser-sync').create()
const autoprefixer = require('gulp-autoprefixer')
const concat = require('gulp-concat')
const minifyJs = require('gulp-uglify')
const imagemin = require('gulp-imagemin')

function html() {
  return src('src/**.html')
    .pipe(include({
      prefix: '@@'
    }))
    .pipe(htmlmin({
      collapseWhitespace: true
    }))
    .pipe(dest('dist'))
}

function scss(){
  return src('src/scss/**.scss')
    .pipe(sass())
    .pipe(autoprefixer({
      overrideBrowserslist: ['last 2 versions']
    }))
    .pipe(csso())
    .pipe(concat('index.css'))
    .pipe(dest('dist'))
}

function js(){
  return src('./src/js/**/*.js')
    .pipe(minifyJs())
    .pipe(concat('script.js'))
    .pipe(dest('./dist'))
}

function img(){
  return src('./src/img/*')
    .pipe(imagemin())
    .pipe(dest('./dist/img'))
}

function clear(){
  return del('dist')
}

function serve(){
  sync.init({
    server: './dist'
  })
  watch('src/**.html', series(html)).on('change', sync.reload)
  watch('src/scss/**.scss', series(scss)).on('change', sync.reload)
  watch('./src/js/**/*.js', series(js)).on('change', sync.reload)
}

exports.build = series(clear, scss, html, js, img)
exports.serve = series(clear, scss, html, js, img, serve)
exports.clear = clear