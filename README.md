Ilmajaam (Weather Station)
==========================

Concept
-------
* ATMEGA1284 based outdoor unit
* Raspberry Pi based indoor unit

Outdoor
-------
* Outdoor unit measures:
* * temperature
* * humidity
* * air pressure
* * wind speed
* * wind direction
* * rain fall
* * snow depth
* * Atmega supply voltage
* * Solar charger voltage
* * current timestamp

Measuremnets are sent once per minute to the indoor unit over 2.4GHz radio link (nRF24L01).

Indoor
------
Indoor unit recieves messages, writes them log file.
Using PyParsing log is parsed to SQlite database.
Raspberry Pi is running Apache web server + PHP. 


