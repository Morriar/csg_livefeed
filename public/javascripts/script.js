function loadCountdown(target, date) {
	var date = new Date($(target).data('date'));
	$(target).countdown(date, function (event) {
		var $this = $(this).html(event.strftime(''
		+ '<span>%d</span> days '
		+ '<span>%H</span> hr '
		+ '<span>%M</span> min '
		+ '<span>%S</span> sec'));
	});
}

$(function () {
	loadCountdown("#countdown");

	var frames = $('.cycle');
	if(frames.length == 0) {
		return;
	}
	$(frames[0]).show();


	var current = 0;
	setInterval(function() {
		$(frames[current]).attr('src', $(frames[current]).attr('src'));
		setTimeout(function() {
			var img = $(frames[current]).get(0);
			if(img.naturalWidth === 0) {
				current = current >= frames.length - 1 ? 0 : current + 1;
				return;
			}
			frames.hide();
			$(frames[current]).show();
			current = current >= frames.length - 1 ? 0 : current + 1;
		}, 1000)
	}, 10000);
});
