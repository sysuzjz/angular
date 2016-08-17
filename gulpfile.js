'use strict';
const argv = require('yargs').argv,
	glob = require('glob'),
	gulp = require('gulp'),
	gutil = require('gulp-util'),
	webpack = require('webpack'),
	HtmlWebpackPlugin = require('./HtmlWebpackPlugin.polyfill'),
	Clean = require('clean-webpack-plugin'),
	path = require('path'),
	fs = require('fs'),
	eslint = require('gulp-eslint'),
	// 生成配置对象
	genConfig = () =>{
		const srcPath = path.join(__dirname, 'src');
		const entry = {},
			result = glob.sync(path.join(srcPath, '*'));

		result.forEach( (name) => {
			entry[name.split('/').pop().split('.').shift()] = name;
		});

		const outputPath = path.join(__dirname, 'app', argv.project),
			packageInfo = require(path.join(srcPath, 'package.json')),
			config = {
				watch: argv.w,
				entry,
				resolve: {
					extensions: ['', '.js', '.jsx'],
					alias: {
						widget: path.join(__dirname, '/src/common/widget')
					},
				},
				output: {
					path: outputPath, // 打包输出的路径
					filename: argv.build ? '[name].[chunkhash].js': '[name].js', // 打包后的名字
					// publicPath: pathNamespace + 'build/'
				},
				module: {
					loaders: [
						{
							test: /\.(html)$/,
							loader: 'html?name=[name].[ext]',
						}, {
							test: /\.(json)$/,
							loader: 'json',
						}, {
							test: /\.(js|jsx)$/,
							exclude: /(node_modules|bower_components)/,
							loader: 'babel',
							query: {
								stage: 0,
								optional: ['runtime'],
							},
						}, {
							test: /\.styl$/,
							loader: 'style!css!stylus?paths=' + path.resolve(__dirname, './node_modules/nib/lib/'),
						}, {
							test: /\.(jpg|png|woff|woff2|eot|ttf|svg|mp3)$/,
							loader: 'url?limit=10000',
						}],
				},
				plugins: (function returnPlugins() {
					const r = [], timestamp = 'Build at ' + new Date();

					if (argv.build) {
						// 清除上一版本带md5更名的文件
						r.push(new Clean([path.join('app', argv.project)]));

						r.push(new webpack.BannerPlugin(timestamp));

						// 开启压缩
						r.push(new webpack.optimize.UglifyJsPlugin({
							compress: {
								warnings: false,
							},
							minimize: true,
						}));
					}

					Object.keys(entry).forEach( (name) => {
						r.push(new HtmlWebpackPlugin({
							title: packageInfo.name || packageInfo.title || '未定义标题',
							buildInfo: timestamp,
							minify: {
								removeComments: argv.build, // 生产环境开启删除注释
								collapseWhitespace: argv.build, // 生产环境开启压缩
							},
							filename: `${name}.html`,
							inject: 'body',
							template: path.join(__dirname, 'src/common', 'template.html'),
						}));
					});

					return r;
				})(),
				stylus: {
					import: ['nib', path.join(__dirname, '/src/common/style')],
				},
			};

		return config;
	};

// 默认任务，即构建
gulp.task('default', () => {
	const config = genConfig();

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

// 启动本地服务器任务
gulp.task('server', () => {
	const WebpackDevServer = require('webpack-dev-server');

	const config = genConfig();

	if (!config) {
		return false;
	}
	// Start a webpack-dev-server
	new WebpackDevServer(webpack(config), {
		stats: {
			colors: true,
		},
	}).listen(3001, 'localhost', (err) => {
		if (err) throw new gutil.PluginError('webpack-dev-server', err);
		gutil.log('[webpack-dev-server]', 'http://localhost:3001/webpack-dev-server/index.html');
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
