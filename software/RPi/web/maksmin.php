<?php
$dbhandle = new SQLite3("/home/pi/log.db"); 
$eile = date("Y-m-d", strtotime("-24 hours"));
$maks = false;
$min = false;
$result = $dbhandle->query("select * from log where kuup>'".$eile."' order by rowid"); 
while ($resx = $result->fetchArray(SQLITE3_ASSOC)) {
	if ($resx["temp"]>0) $temp = $resx["temp"]/10;
	if (!$maks || $temp>$maks) $maks = $temp;
	if (!$min || $temp<$min) $min = $temp;
}
echo json_encode(array("min"=>$min, "maks"=>$maks));
?>
