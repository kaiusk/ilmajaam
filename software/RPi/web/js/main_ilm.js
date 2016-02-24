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

	(function valis() {
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
	})();

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

	/*(function updateWeatherForecast() {
		$.getJSON('http://api.openweathermap.org/data/2.5/forecast/daily', weatherParams, function(json, textStatus) {
			
			var forecastData = {};
			var homme = false;
			for (var i in json.list) {
				var forecast = json.list[i];
				var dateKey = forecast.dt; //_txt.substring(0, 10);
				if (i==0) homme = dateKey;
				
				if (forecastData[dateKey] == undefined) {
					forecastData[dateKey] = {
						'timestamp' : forecast.dt * 1000,
						'temp_min' : forecast.temp.night,
						'temp_max' : forecast.temp.max,
						'humidity' : forecast.humidity,
						'pressure' : forecast.pressure,
						'rain'	   : forecast.rain,
						'snow'	   : forecast.snow,
						'speed'	   : forecast.speed,
						'deg'      : forecast.deg,
						'icon'	   : forecast.weather[0].icon
					};
				}
			}
			delete forecastData[homme];
						
			var forecastTable = $('<table />').addClass('forecast-table');
			var opacity = 1;
			var row = $('<tr />').css('opacity', opacity);
			row.append("<td class='dimmed xxsmall' style='width: 80px'>Päev</td>");
			for (var i in forecastData) {
				var forecast = forecastData[i];
				var dt = new Date(forecast.timestamp);
				row.append($('<td/>').html(moment.weekdaysShort(dt.getDay())));			
			}
			forecastTable.append(row);

			var row = $('<tr />').css('opacity', opacity);
			row.append("<td></td>");
			for (var i in forecastData) {
				var forecast = forecastData[i];
				var iconClass = iconTable[forecast.icon];
				var sp = $('<span/>').addClass('weather-icon').addClass(iconClass);
				row.append($('<td/>').addClass('iko').html(sp));
			}
			forecastTable.append(row);
			
			var row = $('<tr />').css('opacity', opacity);
			row.append("<td class='dimmed xxsmall'>t&deg;</td>");
			for (var i in forecastData) {
				var forecast = forecastData[i];
				row.append($('<td/>').addClass('day').html(roundVal(forecast.temp_min)+"..."+roundVal(forecast.temp_max)));
			}
			forecastTable.append(row);
			
			var row = $('<tr />').css('opacity', opacity);
			row.append("<td class='dimmed xxsmall'>Tuul</td>");
			for (var i in forecastData) {
				var forecast = forecastData[i];
				var suund = roundVal(forecast.deg);
				var sico = "";
				if (suund>338 || suund<22) sico = 'S';
				else if (suund>22 || suund<67) sico = 'SW';
				else if (suund>67 || suund<112) sico = 'W';
				else if (suund>112 || suund<157) sico = 'NW';
				else if (suund>157 || suund<202) sico = 'N';
				else if (suund>202 || suund<247) sico = 'NE';
				else if (suund>247 || suund<292) sico = 'E';
				else if (suund>292 || suund<338) sico = 'SE';
				row.append($('<td/>').addClass('day').html(roundVal(forecast.speed)+" <img src='images/wind/"+sico+".png' alt=''/>"));
			}
			forecastTable.append(row);
			
			var row = $('<tr />').css('opacity', opacity);
			row.append("<td class='dimmed xxsmall'>Rõhk</td>");
			for (var i in forecastData) {
				var forecast = forecastData[i];
				row.append($('<td/>').addClass('day').html(roundVal(forecast.pressure)));
			}
			forecastTable.append(row);
			

			$('.forecast').updateWithText(forecastTable, 1000);
		});

		setTimeout(function() {
			updateWeatherForecast();
		}, 60000);
	})();
	*/

});
