const { src, dest } = require('gulp')
const htmlmin = require('gulp-html-minifier')

function minify() {
  return src('./.nuxt/dist/**/**/*.html')
    .pipe(htmlmin({ removeComments: true, collapseWhitespace: true }))
    .pipe(dest((file) => file.base))
}

exports.default = minify
