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
	return gulp.src(['src/**/*.js', '!src/common/**/*', '!/**/node_modules/**/*'])
	.pipe(eslint())
	.pipe(eslint.format())
	.pipe(eslint.failAfterError());
});

gulp.task('help', () => {
	['构建模块: gulp --project=项目/模块，如 gulp --project=lefeng/lottery-20151028，-w 参数为监听选项，--build参数为压缩选项',
	'本地服务: gulp server --project=项目/模块，如 gulp --project=lefeng/lottery-20151028',
	'语法检查: gulp test 只针对src目录下的js文件进行语法和风格校验'].forEach( (item, index ) => {
		gutil.log(gutil.colors.bgBlue(` ${index + 1} `), gutil.colors.blue(item));
	});
});
