(function () {
	var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
	if (reduce || !('IntersectionObserver' in window)) {
		return;
	}
	var root = document.documentElement;
	root.classList.add('js-reveal');
	var items = document.querySelectorAll('main h1, main h2, main p, main li, main figure, main table, main form, main blockquote, main cite');
	var observer = new IntersectionObserver(function (entries) {
		entries.forEach(function (entry) {
			if (entry.isIntersecting) {
				entry.target.classList.add('visible');
				observer.unobserve(entry.target);
			}
		});
	}, { threshold: 0.12 });
	items.forEach(function (item) {
		item.classList.add('reveal');
		observer.observe(item);
	});
	if (document.body.classList.contains('home')) {
		return;
	}
	var images = document.querySelectorAll('figure img');
	var ticking = false;
	function shift() {
		images.forEach(function (image) {
			var box = image.parentNode.getBoundingClientRect();
			var offset = (box.top / window.innerHeight - 0.5) * 36;
			image.style.transform = 'translateY(' + offset.toFixed(1) + 'px) scale(1.15)';
		});
		ticking = false;
	}
	window.addEventListener('scroll', function () {
		if (!ticking) {
			ticking = true;
			window.requestAnimationFrame(shift);
		}
	});
	shift();
})();
