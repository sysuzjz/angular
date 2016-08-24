import app from 'common/app.js';

require('./slider.styl');

app.directive('slider', () => {
	return {
		restrict: 'EA',
		template: require('./slider.jade')(),
		scope: {},
		link: function () {
			
		},
	};
});
