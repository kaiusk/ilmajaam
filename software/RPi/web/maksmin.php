<?php
$dbhandle = new SQLite3("/home/pi/log.db"); 
$eile = date("Y-m-d", strtotime("-24 hours"));
$maks = false;
$min = false;
$result = $dbhandle->query("select * from log where date(kuup)>date('".$eile."') order by rowid"); 
while ($resx = $result->fetchArray(SQLITE3_ASSOC)) {
	if ($resx["kuup"]>date("Y-m-d")) continue;
	if ($resx["temp"]>0) $temp = $resx["temp"]/10;
	if ($temp>3266.8) $temp = round((6553.6 - $temp) * -1,1);
	if (!$maks || $temp>$maks) $maks = $temp;
	if (!$min || $temp<$min) $min = $temp;
}
echo json_encode(array("min"=>$min, "maks"=>$maks));
?>
