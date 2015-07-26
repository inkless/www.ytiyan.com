/**
* @fileOverview styles task
*/

import gulp from 'gulp';
import sass from 'gulp-sass';
import autoprefixer from 'gulp-autoprefixer';
import runSequence from 'run-sequence';
import browserSync from 'browser-sync';
import gulpif from 'gulp-if';
import {spawn} from 'child_process';

let nodeServer;

gulp.task('styles', () => {
  return gulp.src('public/sass/**/*.scss')
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(gulp.dest('public/css'))
    .pipe(gulpif(browserSync.active, browserSync.reload({
      stream: true
    })));
});

gulp.task('server', () => {
  if (nodeServer) nodeServer.kill();
  nodeServer = spawn('node', ['index.js'], {stdio: 'inherit'})
  nodeServer.on('close', function (code) {
    if (code === 8) {
      gulp.log('Error detected, waiting for changes...');
    }
  });
});

gulp.task('browserSync', () => {
  browserSync({
    proxy: 'localhost:3000'
  });
});

gulp.task('watch', () => {
  gulp.watch('public/sass/**/*.scss', ['styles']);
});

gulp.task('dev', () => {
  runSequence('browserSync', 'watch');
});
