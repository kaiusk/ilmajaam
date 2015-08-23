<?php
	$f = file("/sys/bus/w1/devices/28-000004d06b45/w1_slave");
	if (strpos($f[0], "YES")>0) {
		list($x, $t) = explode("=", $f[1]);
		$res = sprintf("%.1f", $t/1000); //round($t/1000,1);
		if ($res>0) $res = "+$res<span class=\"dimmed xxsmall\">&deg;C</span>";
		elseif ($res<0) $res = "-$res<span class=\"dimmed xxsmall\">&deg;C</span>";
	} else $res = "--";
	echo $res;	
	exit;
?>
