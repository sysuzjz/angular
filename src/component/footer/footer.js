import app from 'common/app.js';

require('./footer.styl');

app.directive('footer', () => {
	return {
		restrict: 'EA',
		template: require('./footer.jade')(),
		scope: {},
		link: function (scope, element, attr) {
			
		}
	}
});