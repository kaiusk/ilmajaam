#!/bin/bash

echo `ifconfig | grep "inet " | grep -v "127.0.0.1"| head -n1 | awk '{print $2}'`

