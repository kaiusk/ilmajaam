<?php
$out = array();
exec('python /root/ilmajaam/software/RPi/sys/dht.py', $out);
print_r($out);
	#	if ($res>0) $res = "+$res<span class=\"dimmed xxsmall\">&deg;C</span>";
?>
