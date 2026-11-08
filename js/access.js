(function () {
	var root = document.documentElement;
	var state = { size: 0, readable: false, colorblind: false };
	try {
		var saved = JSON.parse(localStorage.getItem('sc-access'));
		if (saved) {
			state = saved;
		}
	} catch (e) {
		state = { size: 0, readable: false, colorblind: false };
	}
	function apply() {
		root.classList.remove('size-1', 'size-2', 'size-3');
		if (state.size > 0) {
			root.classList.add('size-' + state.size);
		}
		root.classList.toggle('readable', state.readable);
		root.classList.toggle('colorblind', state.colorblind);
		var font = document.getElementById('font-toggle');
		var color = document.getElementById('color-toggle');
		if (font) {
			font.setAttribute('aria-pressed', state.readable);
		}
		if (color) {
			color.setAttribute('aria-pressed', state.colorblind);
		}
		try {
			localStorage.setItem('sc-access', JSON.stringify(state));
		} catch (e) {
			return;
		}
	}
	function on(id, action) {
		var el = document.getElementById(id);
		if (el) {
			el.addEventListener('click', function () {
				action();
				apply();
			});
		}
	}
	on('size-up', function () { state.size = Math.min(3, state.size + 1); });
	on('size-down', function () { state.size = Math.max(0, state.size - 1); });
	on('font-toggle', function () { state.readable = !state.readable; });
	on('color-toggle', function () { state.colorblind = !state.colorblind; });
	on('reset', function () { state = { size: 0, readable: false, colorblind: false }; });
	apply();
})();
