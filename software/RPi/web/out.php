<?php
$dbhandle = new SQLite3("/home/pi/log.db"); 
$result = $dbhandle->query("select * from log order by rowid desc limit 1"); 
$resx = $result->fetchArray(SQLITE3_ASSOC); 
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
if ($resx["temp"]>0) $resx["temp"] = "+".($resx["temp"]/10);
else $resx["temp"] = "-".($resx["temp"]/10);
$resx["kiirus"] = $resx["kiirus"]/10;
echo json_encode($resx);

?>