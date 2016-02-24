<!DOCTYPE html>
<html>
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
header('Content-Type: text/html; charset=utf-8');
setlocale(LC_TIME, 'et_EE.UTF-8');
date_default_timezone_set("Europe/Tallinn");
$koord = array(59.409601, 26.725483);
$tous = date_sunrise(time(), SUNFUNCS_RET_STRING, $koord[0], $koord[1], 90.583333, 2);
$loojang = date_sunset(time(), SUNFUNCS_RET_STRING, $koord[0], $koord[1], 90.583333, 2);

function yr_rida($id) {
    global $big_data;
    foreach (array_keys($big_data) as $kuup) {
        $data = $big_data[$kuup][$id];
        if ($id == 0 || $id == 3)
            $oo = "is_night=1;";
        else
            $oo = "";
        echo "<td>";
        echo "<span class='ilm'><img src='http://api.yr.no/weatherapi/weathericon/1.1/?symbol=" . $data["ilm"] . ";" . $oo . "content_type=image/png' alt=''></span>";
        if ($data["temp"]>0)
            $t_cl = "pos";
        else
            $t_cl = "neg";
        echo "<span class='temp $t_cl'>" . $data["temp"] . "</span>";
        if ($data["suund"]>340 || $data["suund"]<20)
            $wd = "N";
        elseif ($data["suund"]>19 && $data["suund"]<70)
            $wd = "NE";
        elseif ($data["suund"]>69 && $data["suund"]<110)
            $wd = "E";
        elseif ($data["suund"]>109 && $data["suund"]<160)
            $wd = "SE";
        elseif ($data["suund"]>159 && $data["suund"]<200)
            $wd = "S";
        elseif ($data["suund"]>199 && $data["suund"]<250)
            $wd = "SW";
        elseif ($data["suund"]>249 && $data["suund"]<290)
            $wd = "W";
        else
            $wd = "NW";
        echo "<span class='tuul'><img src='images/wind/".$wd.".png' alt='".$data['suund']."'></span>";
        echo "</td>";
    }
}

?>
<div class="date small dimmed"></div>
<div class="calendar xxsmall"></div>
<table>
    <tbody>
    <tr>
        <td width="50%">
            <div class="large time"></div>
        </td>
        <td>
            <div class="windsun large dimmed"><span class="wi wi-sunrise" style="color: yellow; padding-right: 10px;"></span><?=$tous; ?>&nbsp;&nbsp;&nbsp;</div>
        </td>
        <td>
            <div class="windsun large dimmed"><span class="wi wi-sunset" style="color: yellow; padding-right: 10px;"></span><?=$loojang; ?></div>
        </td>
    </tr>
    </tbody>
</table>

<div id='graph-container'></div>
<hr/>
<div class="small dimmed">
    <?php include("yr.php"); ?>
    <table class="forecast-table">
        <thead>
        <tr>
            <th>Aeg</th>
            <?php
            foreach (array_keys($big_data) as $kuup) {
                echo "<th>".strftime("%a %e.%b", strtotime($kuup))."</th>";
            }
            ?>
        </tr>
        </thead>
        <tbody>
        <tr>
            <td class="aeg">00-06</td>
            <?php
            yr_rida(0);
            ?>
        </tr>
        <tr>
            <td class="aeg">06-12</td>
            <?php
            yr_rida(1);
            ?>
        </tr>
        <tr>
            <td class="aeg">12-18</td>
            <?php
            yr_rida(2);
            ?>
        </tr>
        <tr>
            <td class="aeg">18-24</td>
            <?php
            yr_rida(3);
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
        "windIconsPath": "http:\/\/www.ilmateenistus.ee\/wp-content\/themes\/emhi2013\/images\/wind\/",
        "meteogramDataUri": "http:\/\/www.ilmateenistus.ee\/wp-content\/themes\/emhi2013\/meteogram.php?locationId=4926&lang=et",
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
        "every_village_ac_url": "http:\/\/www.ilmateenistus.ee\/wp-content\/themes\/emhi2013\/async\/locationAutocomplete.php",
        "every_village_redirect_url": "http:\/\/www.ilmateenistus.ee\/asukoha-prognoos\/",
        "theme_url": "http:\/\/www.ilmateenistus.ee\/wp-content\/themes\/emhi2013",
        "every_village_request_parameter": "id",
        "template_dir_path": "http:\/\/www.ilmateenistus.ee\/wp-content\/themes\/emhi2013"
    });
</script>
<script type="text/javascript" src="js/lib.js"></script>
<script type="text/javascript" src="js/site.js"></script>
<script type="text/javascript" src="js/ilm.js"></script>
<script type="text/javascript" src="js/dark.js"></script>
</html>
