'use strict'

const gulp = require('gulp')
const { spawn } = require('child_process')
// const { spawn } = require('cross-spawn')

gulp.task('lint', (cb) => {
  const cmd = spawn('yarn', ['lint'], { stdio: 'inherit', shell: true })
  cmd.on('close', () => cb())
})

gulp.task('default', ['lint'], () => {
  gulp.watch('src/**/*.js', ['lint'])
})

