#!/bin/bash

echo `ifconfig | grep "inet " | head -n1 | awk '{print $2}'`

