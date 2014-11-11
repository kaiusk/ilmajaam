<!DOCTYPE html>
<html>
<head>
	<title>ILM</title>
	<script src="/js/jquery.js"></script>
	<link rel="stylesheet" type="text/css" media="all" href="css/site.css"/>
    <link rel="stylesheet" type="text/css" href="css/ilm.css">
	<link rel="stylesheet" type="text/css" href="css/weather-icons.css">
</head>
<body>
<?php
header('Content-Type: text/html; charset=utf-8');
setlocale(LC_TIME, 'et_EE.UTF-8');
date_default_timezone_set("Europe/Tallinn");
//error_reporting(E_ALL);
$koord = array(59.409601, 26.725483);
$tous = date_sunrise(time(), SUNFUNCS_RET_STRING, $koord[0], $koord[1], 90.583333, 2);
$loojang = date_sunset(time(), SUNFUNCS_RET_STRING, $koord[0], $koord[1], 90.583333, 2);

$f = file("/sys/bus/w1/devices/28-000004d06b45/w1_slave");
if (strpos($f[0], "YES") > 0) {
	list($x, $t) = explode("=", $f[1]);
	$toa_temp = round($t / 1000, 1) - 5;
	if ($toa_temp > 0)
		$toa_temp = "+$toa_temp";
	else
		$toa_temp = "-$toa_temp";
} else
	$toa_temp = "--";
 ?>
 	<div class="date small dimmed"></div>
		<div class="calendar xxsmall"></div>
		<table class="tana">
			<tbody>
			<tr>
				<td><div class="large time"></div></td>
				<td class="large" id="toa_temp"></td>
				<td><span class="large" id="valis_temp"></span><span class="dimmed xxsmall">&deg;C</span></td>
				<td class="large"><span id="niiskus"></span><span class="dimmed xxsmall">%</span></td>
				<td class="large"><span id="tuul"></span><span class="dimmed xxsmall">m/s</span></td>
				<td class="large"><span id="vihm"></span><span class="dimmed xxsmall">mm</span></td>
				<td class="large"><span id="rohk"></span><span class="dimmed xxsmall">mBar</span></td>
				<td>
					<div class="windsun small dimmed"><span class="wi wi-sunrise xdimmed"></span><?php echo $tous; ?></div>
					<div class="windsun small dimmed"><span class="wi wi-sunset xdimmed"></span><?php echo $loojang; ?></div>
				</td>
			</tr>
			</tbody>
			<tfoot class="dimmed xxsmall">
				<tr>
					<td>Kell</td>
					<td>Toas</td>
					<td>Õues</td>
					<td>Niiskus</td>
					<td>Tuul</td>
					<td>Vihm</td>
					<td>Rõhk</td>
					<td>Päike</td>
				</tr>
			</tfoot>
		</table>

	<div id='graph-container'></div>
	<hr/>
	<div class="forecast small dimmed"></div>
</body>
<script src="js/jquery.js"></script>
<script src="js/moment-with-langs.min.js"></script>
<script src="js/main_ilm.js?nocache=<?php echo md5(microtime()) ?>"></script>	
<script type="text/javascript">
	var v = 14;
	if ( typeof _var == "undefined") {
		var _var = {};
	}
	$.extend(_var, {
		"activeLocale" : "et",
		"windIconsPath" : "http:\/\/www.ilmateenistus.ee\/wp-content\/themes\/emhi2013\/images\/wind\/",
		"meteogramDataUri" : "http:\/\/www.ilmateenistus.ee\/wp-content\/themes\/emhi2013\/meteogram.php?locationId=4926&lang=et",
		"translations" : {
			"temperature" : "Temperatuur",
			"precipitation" : "Sademed",
			"pressure" : "\u00d5hur\u00f5hk",
			"wind" : "Tuul"
		},
		"chartLocaleSettings" : {
			"lang" : {
				"month" : {
					"" : "Detsember"
				},
				"weekdays" : ["P\u00fchap\u00e4ev", "Esmasp\u00e4ev", "Teisip\u00e4ev", "Kolmap\u00e4ev", "Neljap\u00e4ev", "Reede", "Laup\u00e4ev"],
				"shortMonths" : ["Jaanauar", "Veebruar", "M\u00e4rts", "Aprill", "Mai", "Juuni", "Juuli", "August", "September", "Oktoober", "November", "Detsember"]
			}
		},
		"every_village_ac_url" : "http:\/\/www.ilmateenistus.ee\/wp-content\/themes\/emhi2013\/async\/locationAutocomplete.php",
		"every_village_redirect_url" : "http:\/\/www.ilmateenistus.ee\/asukoha-prognoos\/",
		"theme_url" : "http:\/\/www.ilmateenistus.ee\/wp-content\/themes\/emhi2013",
		"every_village_request_parameter" : "id",
		"template_dir_path" : "http:\/\/www.ilmateenistus.ee\/wp-content\/themes\/emhi2013"
	});
    </script>
    <script type="text/javascript" src="js/lib.js"></script>
    <script type="text/javascript" src="js/site.js"></script>
    <script type="text/javascript" src="js/ilm.js"></script>
    <script type="text/javascript" src="js/dark.js"></script>
</html>
