<!DOCTYPE html>
<html lang="et">
<head>
    <title>ILM</title>
    <script src="js/jquery.js"></script>
    <link rel="stylesheet" type="text/css" media="all" href="css/site.css"/>
    <link rel="stylesheet" type="text/css" href="css/ilm.css">
    <link rel="stylesheet" type="text/css" href="css/weather-icons.css">
    <meta http-equiv="refresh" content="1800">
</head>
<body>
<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
header('Content-Type: text/html; charset=utf-8');
setlocale(LC_TIME, 'et_EE.UTF-8');
date_default_timezone_set("Europe/Tallinn");
$koord = array(59.409601, 26.725483);
$tous = date_sunrise(time(), SUNFUNCS_RET_STRING, $koord[0], $koord[1], 90.583333, 3);
$loojang = date_sunset(time(), SUNFUNCS_RET_STRING, $koord[0], $koord[1], 90.583333, 3);

$tee_ilm = explode("\n", file_get_contents('http://teeilm.teeinfo.ee/uus/?getstationdata=1&mapstation=30&maptime='));
$tee_temp = preg_split("/\s+/",$tee_ilm[1]);
if (isset($tee_temp[2]) && $tee_temp[2]=='C') {
    $ttmp = $tee_temp[1];
} else
    $ttmp="";

?>
<div class="date small dimmed"></div>
<div class="calendar xxsmall"></div>
<table style="width: 100%">
    <tbody>
    <tr>
        <td>
            <div class="windsun large dimmed"><span class="wi wi-sunrise"
                                                    style="color: yellow; padding-right: 10px;"></span><?= $tous; ?>
                &nbsp;&nbsp;&nbsp;
            </div>
        </td>
        <td>
            <div class="windsun large dimmed"><span class="wi wi-sunset"
                                                    style="color: yellow; padding-right: 10px;"></span><?= $loojang; ?>
            </div>
        </td>
        <td width="50%">
            <div class="large dimmed">
                <i class="wi wi-thermometer-exterior" style="color: yellow; padding-right: 10px;"></i>
                <?= $ttmp; ?>&deg;C
            </div>
        </td>
    </tr>
    </tbody>
</table>

<div id='graph-container'></div>
<hr/>
<div class="small dimmed">
    <?php include("yr2.php");?>

    <table class="forecast-table">
        <thead>
        <tr style="margin-bottom: 10px;">
            <th>Aeg</th>
            <?php
            foreach (array_keys($big_data) as $kuup) {
                echo "<th>" . strftime("%a %e.%b", strtotime($kuup)) . "</th>";
            }
            ?>
        </tr>
        </thead>
        <tbody>
        <tr>
            <td class="aeg">00-06</td>
            <?php
            yr_rida(3);
            ?>
        </tr>
        <tr>
            <td class="aeg">06-12</td>
            <?php
            yr_rida(9);
            ?>
        </tr>
        <tr>
            <td class="aeg">12-18</td>
            <?php
            yr_rida(15);
            ?>
        </tr>
        <tr>
            <td class="aeg">18-24</td>
            <?php
            yr_rida(21);
            ?>
        </tr>
        </tbody>
    </table>


</div>
</body>
<script src="js/jquery.js"></script>
<script src="js/moment-with-langs.min.js"></script>
<script src="js/main_ilm.js?nocache=<?php echo md5(microtime()) ?>"></script>
<script type="text/javascript">
    var v = 14;

    if (typeof _var == "undefined") {
        var _var = {};
    }
    $.extend(_var, {
        "activeLocale": "et",
        "windIconsPath": "https:\/\/www.ilmateenistus.ee\/wp-content\/themes\/ilm2020\/images\/wind-icons\/",
         "meteogramDataUri": "https:\/\/www.ilmateenistus.ee\/wp-content\/themes\/ilm2020\/meteogram.php\/?coordinates=59.4055433191516;26.727125151815",
        "translations": {
            "temperature": "Temperatuur",
            "precipitation": "Sademed",
            "pressure": "\u00d5hur\u00f5hk",
            "wind": "Tuul"
        },
        "chartLocaleSettings": {
            "lang": {
                "month": {
                    "": "Detsember"
                },
                "weekdays": ["P\u00fchap\u00e4ev", "Esmasp\u00e4ev", "Teisip\u00e4ev", "Kolmap\u00e4ev", "Neljap\u00e4ev", "Reede", "Laup\u00e4ev"],
                "shortMonths": ["Jaanauar", "Veebruar", "M\u00e4rts", "Aprill", "Mai", "Juuni", "Juuli", "August", "September", "Oktoober", "November", "Detsember"]
            }
        },
        "every_village_ac_url": "http:\/\/www.ilmateenistus.ee\/wp-content\/themes\/ilm\/async\/locationAutocomplete.php",
        "every_village_redirect_url": "http:\/\/www.ilmateenistus.ee\/asukoha-prognoos\/",
        "theme_url": "http:\/\/www.ilmateenistus.ee\/wp-content\/themes\/ilm2020",
        "every_village_request_parameter": "id",
        "template_dir_path": "http:\/\/www.ilmateenistus.ee\/wp-content\/themes\/ilm2020"
    });
</script>
<script type="text/javascript" src="js/lib.js"></script>
<script type="text/javascript" src="js/site.js"></script>
<script type="text/javascript" src="js/ilm.js"></script>
<script type="text/javascript" src="js/dark.js"></script>
</html>
