import app from 'common/app.js';

require('./index.styl');
require('component/footer/footer');

document.body.innerHTML = require('./index.jade')();

app.controller('index', ($scope) => {
	$scope.test = 1;
});

