/*
 Copyright (C) 2011 J. Coliz <maniacbug@ymail.com>

 This program is free software; you can redistribute it and/or
 modify it under the terms of the GNU General Public License
 version 2 as published by the Free Software Foundation.

 03/17/2013 : Charles-Henri Hallard (http://hallard.me)
              Modified to use with Arduipi board http://hallard.me/arduipi
						  Changed to use modified bcm2835 and RF24 library
TMRh20 2014 - Updated to work with optimized RF24 Arduino library

 */

/**
 * Example RF Radio Ping Pair
 *
 * This is an example of how to use the RF24 class on RPi, communicating to an Arduino running
 * the GettingStarted sketch.
 */

#include <cstdlib>
#include <iostream>
#include <sstream>
#include <string>
#include <syslog.h>

#include <RF24/RF24.h>

using namespace std;
//
// Hardware configuration
//

// CE Pin, CSN Pin, SPI Speed

// Setup for GPIO 22 CE and CE1 CSN with SPI Speed @ 1Mhz
//RF24 radio(RPI_V2_GPIO_P1_22, RPI_V2_GPIO_P1_26, BCM2835_SPI_SPEED_1MHZ);

// Setup for GPIO 22 CE and CE0 CSN with SPI Speed @ 4Mhz
//RF24 radio(RPI_V2_GPIO_P1_15, BCM2835_SPI_CS0, BCM2835_SPI_SPEED_4MHZ);

// Setup for GPIO 22 CE and CE0 CSN with SPI Speed @ 8Mhz
RF24 radio(RPI_V2_GPIO_P1_15, RPI_V2_GPIO_P1_24, BCM2835_SPI_SPEED_8MHZ);


// Radio pipe addresses for the 2 nodes to communicate.
const uint8_t pipes[][6] = {"1Node","2Node"};
//const uint64_t pipes[2] = { 0xABCDABCD71LL, 0x544d52687CLL };


int main(int argc, char** argv){
  //unsigned int counter;
  char hexstring[255] = "";
  char hex[10];
  openlog("slog", LOG_PID|LOG_CONS, LOG_USER);

  // Setup and configure rf radio
  radio.begin();

  // optionally, increase the delay between retries & # of retries
  radio.setRetries(15,15);
  // Dump the configuration of the rf unit for debugging
  radio.printDetails();


  radio.openWritingPipe(pipes[1]);
  radio.openReadingPipe(1,pipes[0]);
  radio.startListening();
  //printf("alustan kuulamist\n");
	
	// forever loop
  while (1) {
        char payload[16];

	while(radio.available()){
		radio.read(&payload,16);
	
		int i;
		for (i = 0; i < 16; i++){
			//if (i > 0) printf(":");
			//printf("%u", payload[i]);
	                sprintf(hex, "%u-", payload[i]);
        	        strcat(hexstring, hex);
		}
		//printf("\n");
	        syslog(LOG_INFO, "%s", hexstring);
        	memset(&payload[0], 0, sizeof(payload));
		memset(&hexstring[0], 0, sizeof(hexstring));
	}			
	delay(925); //Delay after payload responded to, minimize RPi CPU time

  } // forever loop
  closelog();
  return 0;
}

