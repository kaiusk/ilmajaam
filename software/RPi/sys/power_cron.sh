#!/bin/bash

touch -d '-1 minutes' limit
if [ limit -nt pir ]; then
    gpio mode 2 input
    pwr=$(gpio read 2)
    if  [ "$pwr" = "1" ]; then
      #echo "Aeg magama minna..."
      gpio mode 1 out
      gpio write 1 0
      sleep 1
      gpio write 1 1
    fi
    touch last_notification
fi

