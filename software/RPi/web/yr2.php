<?php

$url = $yr_url = 'https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=59.4055&lon=26.7271';
$ch = curl_init($url);
// Åpne den lokale temp filen for skrive tilgang (med cURL hooks enablet)
//$fp = fopen($lokal_xml_url, "w");
// Last fra yr.no til lokal kopi med curl
$agent = 'sitename=https://github.com/kaiusk/ilmajaam';
curl_setopt($ch, CURLOPT_USERAGENT, $agent);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($ch, CURLOPT_POSTFIELDS, '');
curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 0);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);
$data = curl_exec($ch);
curl_close($ch);
$big_data = [];
$hours = [3, 9, 15, 21];
$icon_map = [
    'clearsky'                     => '01d',
    'fair'                         => '02d',
    'partlycloudy'                 => '03d',
    'cloudy'                       => '04',
    'rainshowers'                  => '05d',
    'rainshowersandthunder'        => '06d',
    'sleetshowers'                 => '07d',
    'snowshowers'                  => '08d',
    'rain'                         => '09',
    'heavyrain'                    => '10',
    'heavyrainandthunder'          => '11',
    'sleet'                        => '12',
    'snow'                         => '13',
    'snowandthunder'               => '14',
    'fog'                          => '15',
    'sleetshowersandthunder'       => '20d',
    'snowshowersandthunde'         => '21d',
    'rainandthunder'               => '22',
    'sleetandthunder'              => '23',
    'lightrainshowersandthunder'   => '24d',
    'heavyrainshowersandthunder'   => '25d',
    'lightssleetshowersandthunder' => '26d',
    'heavysleetshowersandthunder'  => '27d',
    'lightssnowshowersandthunder'  => '28d',
    'heavysnowshowersandthunder'   => '29d',
    'lightrainandthunder'          => '30',
    'lightsleetandthunder'         => '31',
    'heavysleetandthunder'         => '32',
    'lightsnowandthunder'          => '33',
    'heavysnowandthunder'          => '34',
    'lightrainshowers'             => '40d',
    'heavyrainshowers'             => '41d',
    'lightsleetshowers'            => '42d',
    'heavysleetshowers'            => '43d',
    'lightsnowshowers'             => '44d',
    'heavysnowshowers'             => '45d',
    'lightrain'                    => '46',
    'lightsleet'                   => '47',
    'heavysleet'                   => '48',
    'lightsnow'                    => '49',
    'heavysnow'                    => '50'
];
if ($data) {
    $data = json_decode($data, true);
    foreach ($data['properties']['timeseries'] as $ts) {
        $kp = strtotime($ts['time']);
        $hour = date('G', $kp);
        if (date("Y-m-d", $kp) > date("Y-m-d") && in_array($hour, $hours)) {
            $details = $ts['data']['instant']['details'];

            $big_data[date("Y-m-d", $kp)][$hour] = [
                'ilm'    => '',
                'temp'   => round($details['air_temperature'], 0),
                'suund'  => $details['wind_from_direction'],
                'kiirus' => $details['wind_speed'],
                'rohk'   => $details['air_pressure_at_sea_level'],
                'vihm'   => '',
            ];
            if (isset($ts['data']['next_6_hours'])) {
                $symbol = $ts['data']['next_6_hours']['summary']['symbol_code'];
                if (str_contains($symbol, '_night')) {
                    $icon = str_replace('_night', '', $symbol); //str_replace('d', 'n', $icon_map[str_replace('_night', '', $symbol)]);
                    $icon = str_replace('d', 'n', $icon_map[$icon]).'.svg';
                } elseif (str_contains($symbol, '_day')) {
                    $icon = str_replace('_day', '', $symbol); //$icon_map[str_replace('_day', '', $symbol)];
                    $icon = $icon_map[$icon].'.svg';
                } else {
                    $icon = $ts['data']['next_6_hours']['summary']['symbol_code'];//$icon_map[$ts['data']['next_6_hours']['summary']['symbol_code']];
                    $icon = $icon_map[$icon].'.svg';
                }
                $big_data[date("Y-m-d", $kp)][$hour]['ilm'] = $icon;
                if (isset($ts['data']['next_6_hours']['summary']['precipitation_amount'])) {
                    $big_data[date("Y-m-d", $kp)][$hour]['vihm'] = $ts['data']['next_6_hours']['summary']['precipitation_amount'];

                }
            }
        }
    }
}

function yr_rida($id) {
    global $big_data;
    foreach (array_keys($big_data) as $kuup) {
        if (isset($big_data[$kuup][$id])) {
            $data = $big_data[$kuup][$id];
            /*if ($id == 0 || $id == 3) {
                $oo = "is_night=1;";
            } else {
                $oo = "";
            }*/
            echo "<td>";
            if ($data['ilm']) {
                echo "<span class='ilm'>
<img src='images/" . $data['ilm'] . "' alt='' width='36px'>
</span>";
            }
            if ($data["temp"] > 0) {
                $t_cl = "pos";
            } else {
                $t_cl = "neg";
            }
            echo "<span class='temp $t_cl'>" . $data["temp"] . "</span>";
            if ($data["suund"] > 340 || $data["suund"] < 20) {
                $wd = "N";
            } elseif ($data["suund"] > 19 && $data["suund"] < 70) {
                $wd = "NE";
            } elseif ($data["suund"] > 69 && $data["suund"] < 110) {
                $wd = "E";
            } elseif ($data["suund"] > 109 && $data["suund"] < 160) {
                $wd = "SE";
            } elseif ($data["suund"] > 159 && $data["suund"] < 200) {
                $wd = "S";
            } elseif ($data["suund"] > 199 && $data["suund"] < 250) {
                $wd = "SW";
            } elseif ($data["suund"] > 249 && $data["suund"] < 290) {
                $wd = "W";
            } else {
                $wd = "NW";
            }
            echo "<span class='tuul'><img src='images/wind/" . $wd . ".png' alt='" . $data['suund'] . "'></span>";
            echo "</td>";
        } else {
            echo "<td></td>";
        }
    }
}
