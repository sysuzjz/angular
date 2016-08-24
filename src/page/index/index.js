import app from 'common/app.js';

require('./index.styl');
require('component/header/header');
require('component/footer/footer');

document.body.innerHTML = require('./index.jade')();

app.controller('index', ($scope, $http) => {
	$scope.test = 1;
	$scope.req = () => {
		$http({
			method: 'post',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			url: './',
			data: {
				test1: 'a',
				test2: 'b',
			},
		}).success((res) => {
			console.log(res);
		});
	};
});

