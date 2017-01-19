var gulp = require('gulp'),
postcss = require('gulp-postcss'),
autoprefixer = require('autoprefixer'),
cssvars = require('postcss-simple-vars'),
nested = require('postcss-nested'),
cssImport = require('postcss-import'),
mixins = require('postcss-mixins'),
hexrgba = require('postcss-hexrgba');

gulp.task('styles', function() {

    return gulp.src('./app/assets/styles/styles.css')
      .pipe(postcss([cssImport, mixins, cssvars, nested, hexrgba, autoprefixer]))
      .on('error', function(errorInfo) {
        console.log(errorInfo.toString());
        /*if style task is an error, it will just think
          it has come to an end instead of halting gulp watch */
        this.emit('end');
      })
      .pipe(gulp.dest('./app/temp/styles'));

});