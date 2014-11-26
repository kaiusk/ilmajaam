#!/bin/bash

touch -d '-10 minutes' limit
if [ limit -nt pir ]; then
    gpio mode 0 input
    pwr=$(gpio read 0)
    if  [ "$pwr" = "1" ]; then
      gpio mode 1 out
      gpio write 1 0
      sleep 1
      gpio write 1 1
    fi
fi

