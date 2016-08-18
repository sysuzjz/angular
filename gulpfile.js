'use strict';
const gulp = require('gulp'),
	gutil = require('gulp-util'),
	webpack = require('webpack'),
	eslint = require('gulp-eslint'),
	config = require('./webpack.config.js');

// 默认任务，即构建
gulp.task('default', () => {
	if (!config) {
		return false;
	}

	webpack(config, (err, stats) => {
		if (err) throw new gutil.PluginError('webpack', err);
		gutil.log('[webpack]', stats.toString({
			colors: true,
		}));
	});
});

// js语法检查
gulp.task('test', () => {
	return gulp.src(['src/**/**/*.js', '!src/common/**/*', '!/**/node_modules/**/*'])
	.pipe(eslint())
	.pipe(eslint.format())
	.pipe(eslint.failAfterError());
});

gulp.task('help', () => {
	['构建模块: npm run compile',
	'开发选项: npm run dev',
	'语法检查: npm run test'].forEach( (item, index ) => {
		gutil.log(gutil.colors.bgBlue(` ${index + 1} `), gutil.colors.blue(item));
	});
});
