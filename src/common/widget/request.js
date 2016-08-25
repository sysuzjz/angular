import app from 'common/app'
import url from 'url';

app.constant('requestRoot', 'http://www.test.com')

app.service('request', ['$http', 'requestRoot', ($http, requestRoot) => {
	this.ajax = (opt) => {
		$http({
			method: opt.type || opt.method || 'get',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
			},
			url: `${requestRoot}${opt.url}`,
			data: opt.data || {},
		}).success(() => {
			opt.success && opt.success();
		}).error(() => {
			opt.error && opt.error();
		});
	};
}]);