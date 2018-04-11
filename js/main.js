function removeClass(ele,cls) {
   var reg = new RegExp('(\\s|^)'+cls+'(\\s|$)');
   ele.className = ele.className.replace(reg,' ');
}

var Karim = (function () {

	var init = function () {
		console.log('Running Karim!');
		initWaypoints();
		initImages();
	};

	var initImages = function () {
		var hero = document.querySelector('#hero');
		if(hero) {
			imagesLoaded(hero, function () {
				hero.className += ' ' + 'imagesLoaded';
			});
		}
	};

	var initWaypoints = function () {
		var body = document.getElementsByTagName('body').item(0);

		var navChange = function (direction) {
			if(direction === 'up') {
				removeClass(body, 'navStick');
				console.log('Hit up');

			} else {
				console.log('Hit down');
				body.className += ' ' + 'navStick';
			}
		};

		var navWaypoint = new Waypoint({
			element: document.getElementById('portfolio'),
			handler: navChange,
			offset: 40
		});

	};

	return {
		init: init
	}
})();

window.onload = function () {
	Karim.init();
};
