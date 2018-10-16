var weatherParams = {
	'lat':59.4,
	'lon':26.7,
	'cnt':8,
	'mode':'json',
    'units':'metric',
};

var lang = "et_EE"; //window.navigator.language;

var iconTable = {
			'01d':'clear',
			'02d':'variable_clouds',
			'03d':'cloudy',
			'04d':'cloudy_with_clear_spells',
			'09d':'wi-showers',
			'10d':'moderate_rain',
			'11d':'thunderstorm',
			'13d':'moderate_snowfall',
			'50d':'fog',
			'01n':'wi-night-clear',
			'02n':'wi-night-cloudy',
			'03n':'wi-night-cloudy',
			'04n':'wi-night-cloudy',
			'09n':'wi-night-showers',
			'10n':'wi-night-rain',
			'11n':'wi-night-thunderstorm',
			'13n':'wi-night-snow',
			'50n':'wi-night-alt-cloudy-windy'
		}
		
jQuery.fn.updateWithText = function(text, speed) {
	var dummy = $('<div/>').html(text);

	if ($(this).html() != dummy.html()) {
		$(this).fadeOut(speed / 2, function() {
			$(this).html(text);
			$(this).fadeIn(speed / 2, function() {
				//done
			});
		});
	}
}

jQuery.fn.outerHTML = function(s) {
	return s ? this.before(s).remove() : jQuery("<p>").append(this.eq(0).clone()).html();
};

function roundVal(temp) {
	return Math.round(temp); // * 10) / 10;
}


jQuery(document).ready(function($) {

	//moment.lang(lang);
	moment.locale(lang);

	(function toatemp() {
		$.get('temp.php', function(data) {
			$('#toa_temp').html(data);
			setTimeout(toatemp, 5000);
		});
	})();

	/*(function valis() {
		$.getJSON('maksmin.php', function(data) {
			$("#min24").html(data["min"]);
			$("#maks24").html(data["maks"]);
		});
		$.getJSON('out.php', function(data) {
			$("#valis_temp").html(data["temp"]);
			$("#niiskus").html(data["niiskus"]);
			$("#rohk").html(data["rohk"]);
			$("#tuul").html(data["kiirus"]);
			$("#vihm").html(data["vihm"]);
			setTimeout(valis, 60000);
		});
	})();*/

	(function updateTime() {
		var now = moment();
		var date = now.format('LLLL').split(' ', 4);
		date = date[0] + ' ' + date[1] + ' ' + date[2] + ' ' + date[3];

		$('.date').html(date);
		$('.time').html(now.format('HH') + ':' + now.format('mm') + '<span class="sec">' + now.format('ss') + '</span>');

		setTimeout(function() {
			updateTime();
		}, 1000);
	})();
	
});
