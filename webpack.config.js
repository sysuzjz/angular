const argv = require('yargs').argv,
	glob = require('glob'),
	webpack = require('webpack'),
	HtmlWebpackPlugin = require('html-webpack-plugin'),
	Clean = require('clean-webpack-plugin'),
	path = require('path');


const srcPath = path.join(__dirname, 'src'),
	outputPath = path.join(__dirname, 'build'),
	entry = {},
	result = glob.sync(path.join(srcPath, '/page', '**/*.js'));

result.forEach( (name) => {
	entry[name.split('/').pop().split('.').shift()] = name;
});

const config = {
	watch: argv.watch,
	entry,
	resolve: {
		extensions: ['', '.js', '.jsx'],
		alias: {
			component: path.join(__dirname, '/src/component'),
			page: path.join(__dirname, '/src/page'),
			common: path.join(__dirname, '/src/common'),
		},
	},
	output: {
		path: outputPath, // 打包输出的路径
		filename: argv.build ? '[name].js?[chunkhash]': '[name].js', // 打包后的名字
	},
	module: {
		loaders: [
			{
				test: /\.(jade)$/,
				loader: 'jade',
			},
			{
				test: /\.(html)$/,
				loader: 'html?name=[name].[ext]',
			}, {
				test: /\.(json)$/,
				loader: 'json',
			}, {
				test: /\.(js|jsx)$/,
				exclude: /(node_modules|bower_components)/,
				loader: 'babel'
			}, {
				test: /\.styl$/,
				loader: 'style!css!stylus',
				exclude: /node_modules/,
			}, {
				test: /\.(jpg|png|gif|woff|woff2|eot|ttf|svg|mp3)$/,
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
				buildInfo: timestamp,
				minify: {
					removeComments: argv.build, // 生产环境开启删除注释
					collapseWhitespace: argv.build, // 生产环境开启压缩
				},
				chunks: [name],
				filename: `${name}.html`,
				inject: 'body',
				template: path.join(__dirname, 'src/common/', 'common.jade'),
			}));
		});

		return r;
	})(),
	stylus: {
		use: [require('nib')()],
		import: ['~nib/lib/nib/index.styl', path.join(__dirname, '/src/common/common.styl')],
	},
};
module.exports = config;