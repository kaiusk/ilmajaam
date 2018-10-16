<html>
	<head>
		<title>ILM</title>
		<link rel="stylesheet" type="text/css" href="ilm.css">
		<link rel="stylesheet" type="text/css" href="css/weather-icons.css">
	</head>
	<body>
		<?php
		header('Content-Type: text/html; charset=utf-8');
		setlocale(LC_TIME, 'et_EE.UTF-8');
		date_default_timezone_set("Europe/Tallinn");
		//error_reporting(E_ALL);
		$koord = array(59.409601, 26.725483);
		$tous = date_sunrise(time(), SUNFUNCS_RET_STRING, $koord[0], $koord[1]);
		$loojang = date_sunset(time(), SUNFUNCS_RET_STRING, $koord[0], $koord[1]);
		
		$f = file("/sys/bus/w1/devices/28-000004d06b45/w1_slave");
		if (strpos($f[0], "YES")>0) {
			list($x, $t) = explode("=", $f[1]);
			$toa_temp = round($t/1000,1)-5;
			if ($toa_temp>0) $toa_temp = "+$toa_temp";
			else $toa_temp = "-$toa_temp";
		} else $toa_temp =  "--";
		$nahtus["day"] = array("clear" => 32, "few_clouds" => 34, "variable_clouds" => 30, "cloudy_with_clear_spells" => 28, "cloudy" => 26, "light_snow_shower" => 13, "moderate_snow_shower" => 14, "heavy_snow_shower" => 16, "light_shower" => 9, "moderate_shower" => 12, "heavy_shower" => 2, "light_rain" => 9, "moderate_rain" => 12, "heavy_rain" => 2, "risk_of_glaze" => 8, "light_sleet" => 42, "moderate_sleet" => 7, "light_snowfall" => 41, "moderate_snowfall" => 14, "heavy_snowfall" => 16, "snowstorm" => 15, "drifting_snow" => 15, "hail" => 18, "mist" => 22, "fog" => 20, "thunder" => 37, "thunderstorm" => 37, );
		$nahtus["night"] = array("clear" => 31, "few_clouds" => 33, "variable_clouds" => 29, "cloudy_with_clear_spells" => 27, "cloudy" => 26, "light_snow_shower" => 13, "moderate_snow_shower" => 14, "heavy_snow_shower" => 16, "light_shower" => 9, "moderate_shower" => 12, "heavy_shower" => 2, "light_rain" => 9, "moderate_rain" => 12, "heavy_rain" => 2, "risk_of_glaze" => 8, "light_sleet" => 42, "moderate_sleet" => 7, "light_snowfall" => 41, "moderate_snowfall" => 14, "heavy_snowfall" => 16, "snowstorm" => 15, "drifting_snow" => 15, "hail" => 18, "mist" => 21, "fog" => 20, "thunder" => 47, "thunderstorm" => 47, );

		function get_fcontent($url, $javascript_loop = 0, $timeout = 5) {
			$url = str_replace("&amp;", "&", urldecode(trim($url)));

			$cookie = tempnam("/tmp", "CURLCOOKIE");
			$ch = curl_init();
			curl_setopt($ch, CURLOPT_USERAGENT, "Mozilla/5.0 (Windows; U; Windows NT 5.1; rv:1.7.3) Gecko/20041001 Firefox/0.10.1");
			curl_setopt($ch, CURLOPT_URL, $url);
			curl_setopt($ch, CURLOPT_COOKIEJAR, $cookie);
			curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
			curl_setopt($ch, CURLOPT_ENCODING, "");
			curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
			curl_setopt($ch, CURLOPT_AUTOREFERER, true);
			curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
			# required for https urls
			curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, $timeout);
			curl_setopt($ch, CURLOPT_TIMEOUT, $timeout);
			curl_setopt($ch, CURLOPT_MAXREDIRS, 10);
			$content = curl_exec($ch);
			$response = curl_getinfo($ch);
			curl_close($ch);

			if ($response['http_code'] == 301 || $response['http_code'] == 302) {
				ini_set("user_agent", "Mozilla/5.0 (Windows; U; Windows NT 5.1; rv:1.7.3) Gecko/20041001 Firefox/0.10.1");

				if ($headers = get_headers($response['url'])) {
					foreach ($headers as $value) {
						if (substr(strtolower($value), 0, 9) == "location:")
							return get_url(trim(substr($value, 9, strlen($value))));
					}
				}
			}

			if ((preg_match("/>[[:space:]]+window\.location\.replace\('(.*)'\)/i", $content, $value) || preg_match("/>[[:space:]]+window\.location\=\"(.*)\"/i", $content, $value)) && $javascript_loop < 5) {
				return get_url($value[1], $javascript_loop + 1);
			} else {
				return array($content, $response);
			}
		}

		$xmlString = get_fcontent("http://www.ilmateenistus.ee/meteogram.xml?locationId=8303&lang=et");

		$xml = new SimpleXMLElement($xmlString[0]);
		$data = $xml -> forecast -> tabular;

		$r = array();
		foreach ($data->time as $t) {
			if ($t -> precipitation[value] > 0)
				$vihm = $t -> precipitation[value];
			else
				$vihm = '';
			$r[strtotime(str_replace("T", " ", $t[from]))] = array("ikoon" => trim($t -> phenomen[className]), "ilm" => $t -> phenomen[et], "sademed" => $vihm, "suund" => $t -> windDirection[icon], "kiirus" => $t -> windSpeed[mps], "temp" => sprintf("%+d", $t -> temperature[value]), "rohk" => round($t -> pressure[value]));
		}
		$r = array_slice($r, 0, 24, true);
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
		
		
		<div class="small" style="text-align: left; margin-top: 12px;">Ennustus</div>
		<table style='padding:15px;'>
			<tr><td class="dimmed xxsmall">Päev</td>
				<?php
				$span = 1;
				$vana_kp = '';
				foreach ($r as $aeg => $x) {
					if (ucfirst(strftime("%a %e", $aeg + 3600)) != $vana_kp) {
						if ($vana_kp > '')
							echo "<td colspan='" . $span . "' class='small dimmed'>" . $vana_kp . "</td>";
						$vana_kp = ucfirst(strftime("%a %e", $aeg + 3600));
						$span = 1;
					} else
						$span++;

				}
				echo "<td colspan='" . $span . "' class='small dimmed'>" . $vana_kp . "</td>";
				?>
			</tr>
			<tr><td class="dimmed xxsmall">Tund</td>
				<?php
				foreach ($r as $aeg => $x)
					echo "<td class='xxsmall dimmed'>" . date("G", $aeg + 3600) . "</td>";
				?>
			</tr>
			<tr><td class="dimmed xxsmall">Ilm</td>
				<?php
				foreach ($r as $aeg => $x) {
					if (date("H:i", $aeg) > $tous && date("H:i", $aeg) < $loojang)
						$day = "day";
					else
						$day = "night";
					if ($x["ikoon"] > "")
						echo "<td colspan='3' align='center'><span class='icon dimmed wi'/><img src='images/ilm/" . $nahtus[$day][trim($x["ikoon"])] . ".png' alt='' title='" . $x["ilm"] . "'/></td>";
				}
				?>
			</tr>
			<tr><td class="dimmed xxsmall">t&deg;</td>
				<?php
				foreach ($r as $x)
					echo "<td class='dimmed small'>" . $x["temp"] . "</td>";
				?>
			</tr>
			<tr><td rowspan="2"  class="dimmed xxsmall">Tuul</td>
				<?php
				foreach ($r as $x)
					echo "<td align='center'><img src='images/wind/" . $x["suund"] . "' alt=''/></td>";
				?>
			</tr>
			<tr>
				<?php
				foreach ($r as $x)
					echo "<td align='center' class='dimmed xxsmall'>" . $x["kiirus"] . "</td>";
				?>
			</tr>
			<tr><td class="dimmed xxsmall">Sademed</td>
				<?php
				foreach ($r as $x)
					echo "<td align='center' class='xsmall dimmed'>" . $x["sademed"] . "</td>";
				?>
			</tr>
			<tr><td class="dimmed xxsmall">Rõhk</td>
				<?php
				foreach ($r as $x)
					echo "<td align='cneter' class='dimmed xxsmall'>" . $x["rohk"] . "</td>";
				?>
			</tr>
		</table>
		<hr/>
		<div class="forecast small dimmed"></div>
		<script src="js/jquery.js"></script>
		<script src="js/moment-with-langs.min.js"></script>
		<script src="js/main_ilm.js?nocache=<?php echo md5(microtime()) ?>"></script>	
	</body>
</html>
