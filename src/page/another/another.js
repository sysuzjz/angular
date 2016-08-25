import app from 'common/app.js';

require('./another.styl');
require('component/header/header');
require('component/footer/footer');

document.body.innerHTML = require('./another.jade')();

app.controller('another', ['$scope', ($scope) => {
	$scope.test = 2;
}]);
