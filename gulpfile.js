var gulp = require('gulp');
var argv = require('yargs').argv;
var runSequence = require('run-sequence');

var config = {
    isProduction: (argv.prod) ? (true) : (false),
    resetInject: (argv.resetinject) ? (true) : (false),
    src: {
        app: ['./app/**/*.module.js', './app/**/*.js'],
        less: './app/less/app.less',
        lib: [
            './node_modules/jquery/dist/jquery.js',
            './node_modules/fastclick/lib/fastclick.js',
            './node_modules/angular/angular.js',
            './node_modules/angular-mocks/angular-mocks.js'
        ]
    },
    bld: './bld',
    server: {

    }
}

gulp.task('clean', require('./gulp-tasks/clean')(gulp, config));
gulp.task('jslib', require('./gulp-tasks/jslib')(gulp, config));
gulp.task('eslint', require('./gulp-tasks/eslint')(gulp, config));
gulp.task('jsapp', require('./gulp-tasks/jsapp')(gulp, config));
gulp.task('less', require('./gulp-tasks/less')(gulp, config));

// gulp.task('test', function(){
//     plugins.runSequence(
//         'clean',
//         'jslib',
//         'eslint'
//     );
// });