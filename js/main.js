function removeClass(ele,cls) {
   var reg = new RegExp('(\\s|^)'+cls+'(\\s|$)');
   ele.className = ele.className.replace(reg,' ');
}

function hasClass(ele, cls) {
	return new RegExp('(^| )' + cls + '( |$)', 'gi').test(ele.className);
}

//Returns ele as part of siblings
function getSiblings(ele) {
	return Array.prototype.filter.call(ele.parentNode.children, function(child){
	  return child;
	});
}

function getWidth() {
  return Math.max(
    document.body.scrollWidth,
    document.documentElement.scrollWidth,
    document.body.offsetWidth,
    document.documentElement.offsetWidth,
    document.documentElement.clientWidth
  );
}

var Karim = (function () {

	return {
		switchSrc: function(el) {
			var src = el.getAttribute('data-src');
			el.setAttribute('src', src);
		},

		initImages: function() {
			var hero = document.querySelector('#hero');

			//load images async
			var images = document.querySelectorAll('.asyncImage');
			var i = 0;
			var length = images.length;
			for(i; i < length; i++) {
				var image = images[i];
				this.switchSrc(image);
			}

			if(!hero) {  return; }

			imagesLoaded(hero, function () {
				hero.className += ' ' + 'imagesLoaded';
			});
		},

		initVideos: function() {
			var videos = document.querySelectorAll('.asyncVideo');
			var i = 0;
			var length = videos.length;

			var stopAllVideos = function () {
				var x = 0;
				for(x; x < length; x++) {
					// videos[x].currentTime = 0;
					videos[x].pause();
				}
			};

			var removeAllClasses = function() {
				// remove all classes
				var portfolioItems = document.querySelectorAll('.portfolio__item');
				for(var x = 0; x < portfolioItems.length; x++) {
					removeClass(portfolioItems[x], 'videoActive');
				}
			};

			var playVideo = function(video) {
				if(getWidth() > 720) {
					video.play();
				}
			};

			var createWaypoint = function (video, container) {
				new Waypoint({
					element: container,
					handler: function (direction) {
						if(direction === 'up') {
							//remove all classes
							// removeAllClasses();
							stopAllVideos();

							//start the video above this one??
							var index = -1;
							var sibs = getSiblings(container);
							for(var n = 0; n < sibs.length; n++) {
								if(sibs[n] === container) {
									index = n;
								}
							}

							if(index && index !== 0) {
								sibs[index - 1].className += ' ' + 'videoActive';
								//start video?
								var previousVideo = sibs[index - 1].querySelectorAll('video')[0];
								playVideo(previousVideo);
							}

						} else {

							stopAllVideos();
							// removeAllClasses();

							//if doesnt have class add it
							// if(!hasClass(container, 'videoActive')) {
							// 	container.className += ' ' + 'videoActive';
							// }

							playVideo(video);
						}
					},
					offset: '30%'
				});
			};

			//each video add handler and init with src change
			for(i; i < length; i++) {
				var video = videos[i];
				this.switchSrc(video);

				var container = video.parentNode.parentNode.parentNode;
				createWaypoint(video, container);
			}
		},

		initNavigation: function() {
			var body = document.getElementsByTagName('body').item(0);

			var navChange = function (direction) {
				if(direction === 'up') {
					removeClass(body, 'navStick');
				} else {
					body.className += ' ' + 'navStick';
				}
			};

			var navWaypoint = new Waypoint({
				element: document.getElementById('portfolio'),
				handler: navChange,
				offset: 50
			});
		},

		initSmoothScroll: function() {
			var options = {
				speed: 500, // Integer. How fast to complete the scroll in milliseconds
				offset: 50, // Integer or Function returning an integer. How far to offset the scrolling anchor location in pixels
				easing: 'easeInOutCubic' // Easing pattern to use
			}
			var scroll = new SmoothScroll('a[href*="#"]', options);
		},

		init: function() {
			this.initNavigation();
			this.initImages();
			this.initVideos();
			this.initSmoothScroll();
		}
	};
})();

window.onload = function () {
	Karim.init();
};
