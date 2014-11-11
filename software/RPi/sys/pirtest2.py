#!/usr/bin/python
import RPi.GPIO as GPIO
import time

GPIO.setmode(GPIO.BOARD)
PIR_PIN = 11
LED_PIN = 13
SW_PIN  = 12

GPIO.setup(PIR_PIN, GPIO.IN)
GPIO.setup(LED_PIN, GPIO.IN)
GPIO.setup(SW_PIN, GPIO.OUT)

def MOTION(PIR_PIN):
        global LED_PIN, SW_PIN
        f = open('pir', 'w')
        f.write("Liigub!")
        f.close()
        if(GPIO.input(LED_PIN) == 0):		#power is off
                GPIO.output(SW_PIN, GPIO.LOW)
                time.sleep(1)
                GPIO.output(SW_PIN,GPIO.HIGH) 
        f.close()

time.sleep(2)

try:
        GPIO.add_event_detect(PIR_PIN, GPIO.RISING, callback=MOTION)
        while 1:
                time.sleep(100)

except KeyboardInterrupt:
        #print " Quit"
        GPIO.cleanup()
