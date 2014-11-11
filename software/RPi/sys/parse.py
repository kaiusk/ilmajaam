#!/usr/bin/python
import sqlite3
from pygtail import Pygtail

conn = sqlite3.connect('/home/pi/log.db')
c = conn.cursor()

for line in Pygtail("/var/log/ilm/ilm.log"):
    print(line) # debug
    
    if line.find("slog") > -1:
        info = line.split()
        var = info[-1]
        data = var.split("-")
        #kuup DATE, aeg TIME, vcc NUMERIC, solar NUMERIC, suund NUMERIC, temp NUMERIC, rohk NUMERIC, niiskus NUMERIC, kiirus NUMERIC, vihm NUMERIC, lumi NUMERIC
        #0  1  2  3  4  5   6  7    8   9  10  11    12   13   14   15
        #yy-mm-dd-hh-mm-vcc-vp-rohk-t0--t1-hum-suund-vrtc-lumi-vihm-tuul
        #14-10-26-19-25-0-  0- 121 -236-0 -29 -93-   20  -0-   0   -0-
        #[kuup] => kuup
        #[aeg] => aeg
        #[vcc] => data[5]
        #[solar] => data[6]
        #[suund] => data[11]
        #[temp] => temp
        #[rohk] => rohk
        #[niiskus] => data[10]
        #[kiirus] => data[15]
        #[vihm] => data[14]
        #[lumi] => data[13]
        temp = int(data[9])*256 + int(data[8])
        rohk = int(data[7]) + 900
        kuup = "20%s-%s-%s" %(data[0],data[1],data[2])
        aeg = "%s:%s:00" %(data[3],data[4])
        c.execute('INSERT INTO log values((?), (?), (?), (?), (?), (?), (?), (?), (?), (?), (?))', (kuup,aeg,data[5],data[6],data[11],temp,rohk,data[10],data[15],data[14],data[13]))
conn.commit() # tee ainult yks commit
conn.close()

