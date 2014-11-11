<html>
<head>
	<title>ILM</title>
	<script src="/js/jquery.js"></script>
	<link rel="stylesheet" type="text/css" media="all" href="site.css"/>
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
$tous = date_sunrise(time(), SUNFUNCS_RET_STRING, $koord[0], $koord[1], 96, 3);
$loojang  = date_sunset(time(), SUNFUNCS_RET_STRING, $koord[0], $koord[1], 96, 3);

$nahtus["paev"]=array(
    "clear"=>32,
    "few_clouds"=>34,
    "variable_clouds"=>30,
    "cloudy_with_clear_spells"=>28,
    "cloudy"=>26,
    "light_snow_shower"=>13,
    "moderate_snow_shower"=>14,
    "heavy_snow_shower"=>16,
    "light_shower"=>9,
    "moderate_shower"=>12,
    "heavy_shower"=>2,
    "light_rain"=>9,
    "moderate_rain"=>12,
    "heavy_rain"=>2,
    "risk_of_glaze"=>8,
    "light_sleet"=>42,
    "moderate_sleet"=>7,
    "light_snowfall"=>41,
    "moderate_snowfall"=>14,
    "heavy_snowfall"=>16,
    "snowstorm"=>15,
    "drifting_snow"=>15,
    "hail"=>18,
    "mist"=>22,
    "fog"=>20,
    "thunder"=>37,
    "thunderstorm"=>37,
    );
$nahtus["oo"]=array(
    "clear"=>31,
    "few_clouds"=>33,
    "variable_clouds"=>29,
    "cloudy_with_clear_spells"=>27,
    "cloudy"=>26,
    "light_snow_shower"=>13,
    "moderate_snow_shower"=>14,
    "heavy_snow_shower"=>16,
    "light_shower"=>9,
    "moderate_shower"=>12,
    "heavy_shower"=>2,
    "light_rain"=>9,
    "moderate_rain"=>12,
    "heavy_rain"=>2,
    "risk_of_glaze"=>8,
    "light_sleet"=>42,
    "moderate_sleet"=>7,
    "light_snowfall"=>41,
    "moderate_snowfall"=>14,
    "heavy_snowfall"=>16,
    "snowstorm"=>15,
    "drifting_snow"=>15,
    "hail"=>18,
    "mist"=>21,
    "fog"=>20,
    "thunder"=>47,
    "thunderstorm"=>47,
    );
//echo "$tous - $loojang";

function get_fcontent( $url,  $javascript_loop = 0, $timeout = 5 ) {
    $url = str_replace( "&amp;", "&", urldecode(trim($url)) );

    $cookie = tempnam ("/tmp", "CURLCOOKIE");
    $ch = curl_init();
    curl_setopt( $ch, CURLOPT_USERAGENT, "Mozilla/5.0 (Windows; U; Windows NT 5.1; rv:1.7.3) Gecko/20041001 Firefox/0.10.1" );
    curl_setopt( $ch, CURLOPT_URL, $url );
    curl_setopt( $ch, CURLOPT_COOKIEJAR, $cookie );
    curl_setopt( $ch, CURLOPT_FOLLOWLOCATION, true );
    curl_setopt( $ch, CURLOPT_ENCODING, "" );
    curl_setopt( $ch, CURLOPT_RETURNTRANSFER, true );
    curl_setopt( $ch, CURLOPT_AUTOREFERER, true );
    curl_setopt( $ch, CURLOPT_SSL_VERIFYPEER, false );    # required for https urls
    curl_setopt( $ch, CURLOPT_CONNECTTIMEOUT, $timeout );
    curl_setopt( $ch, CURLOPT_TIMEOUT, $timeout );
    curl_setopt( $ch, CURLOPT_MAXREDIRS, 10 );
    $content = curl_exec( $ch );
    $response = curl_getinfo( $ch );
    curl_close ( $ch );

    if ($response['http_code'] == 301 || $response['http_code'] == 302) {
        ini_set("user_agent", "Mozilla/5.0 (Windows; U; Windows NT 5.1; rv:1.7.3) Gecko/20041001 Firefox/0.10.1");

        if ( $headers = get_headers($response['url']) ) {
            foreach( $headers as $value ) {
                if ( substr( strtolower($value), 0, 9 ) == "location:" )
                    return get_url( trim( substr( $value, 9, strlen($value) ) ) );
            }
        }
    }

    if (    ( preg_match("/>[[:space:]]+window\.location\.replace\('(.*)'\)/i", $content, $value) || preg_match("/>[[:space:]]+window\.location\=\"(.*)\"/i", $content, $value) ) && $javascript_loop < 5) {
        return get_url( $value[1], $javascript_loop+1 );
    } else {
        return array( $content, $response );
    }
}

$xmlString = get_fcontent("http://www.ilmateenistus.ee/meteogram.xml?locationId=8303&lang=et");
//print_r($xmlString);
$xml = new SimpleXMLElement($xmlString[0]);
$data = $xml->forecast->tabular;

$r = array();
foreach ($data->time as $t) {
	$r[strtotime(str_replace("T"," ",$t[from]))] = array(
			"ilm"=>$t->phenomen[className],
			"sademed"=>$t->precipitation[value],
			"suund"=>$t->windDirection[icon],
			"kiirus"=>$t->windSpeed[mps],
			"temp"=>$t->temperature[value],
			"rohk"=>round($t->pressure[value]));
}
$r = array_slice($r, 0, 24, true);
?>

<table>
<tr>
<?php
$span = 1;
$vana_kp = '';
 foreach($r as $aeg=>$x) {
	if (ucfirst(strftime ("%A %e.%b", $aeg+3600))!=$vana_kp ) {
		if ($vana_kp>'') echo "<td colspan='".$span."' class='date small dimmed'>".$vana_kp."</td>";
		$vana_kp = ucfirst(strftime("%A %e.%b", $aeg+3600));
		$span = 1;
	} else $span++;

}
echo "<td colspan='".$span."' class='date small dimmed'>".$vana_kp."</td>";
?>
</tr><tr>
<?php foreach($r as $aeg=>$x) echo  "<td class='small dimmed'>".date("G",$aeg+3600)."</td>"; ?>
</tr><tr>
<?php 
foreach ($r as $aeg=>$x) {
	if (date("H:i",$aeg)>$tous && date("H:i",$aeg)<$loojang) $day="day";
	else $day="night";
	if ($x["ilm"]>"") echo "<td colspan='3' align='center'><span class='icon dimmed wi wi-".$day."-".$x["ilm"]."'/></td>"; 
}
?>
</tr><tr>
<?php foreach ($r as $x) echo "<td>".$x["sademed"]."</td>"; ?>
</tr><tr>
<?php foreach ($r as $x) echo "<td><img src='images/wind/".$x["suund"]."' alt=''/></td>"; ?>
</tr><tr>
<?php foreach ($r as $x) echo "<td>".$x["kiirus"]."</td>"; ?>
</tr><tr>
<?php foreach ($r as $x) echo "<td class='temp'>".$x["temp"]."</td>"; ?>
</tr><tr>
<?php foreach ($r as $x) echo "<td>".$x["rohk"]."</td>"; ?>
</tr></table>
</body>
<script type="text/javascript">
		var v=14;
        if(typeof _var == "undefined"){var _var = {};} 
        $.extend(_var, {"activeLocale":"et",
        				"windIconsPath":"http:\/\/www.ilmateenistus.ee\/wp-content\/themes\/emhi2013\/images\/wind\/",
        				"meteogramDataUri":"http:\/\/www.ilmateenistus.ee\/wp-content\/themes\/emhi2013\/meteogram.php?locationId=4926&lang=et",
        				"translations":{"temperature":"Temperatuur","precipitation":"Sademed","pressure":"\u00d5hur\u00f5hk","wind":"Tuul"},
        				"chartLocaleSettings":{"lang":{"month":{"":"Detsember"},"weekdays":["P\u00fchap\u00e4ev","Esmasp\u00e4ev","Teisip\u00e4ev","Kolmap\u00e4ev","Neljap\u00e4ev","Reede","Laup\u00e4ev"],"shortMonths":["Jaanauar","Veebruar","M\u00e4rts","Aprill","Mai","Juuni","Juuli","August","September","Oktoober","November","Detsember"]}},
        				"every_village_ac_url":"http:\/\/www.ilmateenistus.ee\/wp-content\/themes\/emhi2013\/async\/locationAutocomplete.php",
        				"every_village_redirect_url":"http:\/\/www.ilmateenistus.ee\/asukoha-prognoos\/",
        				"theme_url":"http:\/\/www.ilmateenistus.ee\/wp-content\/themes\/emhi2013",
        				"every_village_request_parameter":"id",
        				"template_dir_path":"http:\/\/www.ilmateenistus.ee\/wp-content\/themes\/emhi2013"});
    </script>
    <script type="text/javascript" src="js/lib.js"></script>
    <script type="text/javascript" src="js/site.js"></script>
    <script type="text/javascript" src="js/ilm.js"></script>
    <script type="text/javascript" src="js/dark.js"></script>
</html>
