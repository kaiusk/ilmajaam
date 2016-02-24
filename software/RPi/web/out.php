<?php
$dbhandle = new SQLite3("/home/pi/log.db"); 
$result = $dbhandle->query("select * from log order by rowid desc limit 1"); 
$resx = $result->fetchArray(SQLITE3_ASSOC); 
//if (strtotime($resx["kuup"]." ".$resx["aeg"])<(time()-1800)) exit; 
/*[kuup] => 2014-10-26
    [aeg] => 19:25:00
    [vcc] => 0
    [solar] => 0
    [suund] => 121
    [temp] => 236
    [rohk] => 0
    [niiskus] => 29
    [kiirus] => 92
    [vihm] => 20
    [lumi] => 0*/
if (intval($resx["temp"])>32768)
	$resx["temp"] = (65536 - intval($resx["temp"])) * -1;
$temp = number_format($resx["temp"]/10,1);
//if ($temp>3266.8) $temp = round((6553.6 - $temp) * -1,1);

if ($temp>0) $temp = "+".$temp;
//else $temp = "-".$temp;
$resx["temp"]=$temp;
$resx["kiirus"] = $resx["kiirus"]/10;
echo json_encode($resx);

?>
