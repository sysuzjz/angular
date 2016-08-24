import app from 'common/app.js';

require('./header.styl');

app.directive('header', () => {
	return {
		restrict: 'EA',
		template: require('./header.jade')(),
		scope: {},
		link: function (scope) {
			scope.testHead = 'header';
		},
		replace: true,
	};
});
