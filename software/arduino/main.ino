// Date and time functions using a DS1307 RTC connected via I2C and Wire lib

#include <avr/wdt.h>
#include <avr/sleep.h>
#include <avr/power.h>
#include <SPI.h>
#include <Wire.h>
#include "nRF24L01.h"
#include "RF24.h"
#include "printf.h"
#include "RTClib.h"
#include <HMC5883L_Simple.h>
#include <DHT22.h>
#include <SFE_BMP180.h>

#define DHT22_PIN 7
const byte LED13 = 2;

RTC_DS1307 rtc;
HMC5883L_Simple Compass;
DHT22 myDHT22(DHT22_PIN);
SFE_BMP180 pressure;
RF24 radio(9,10);

volatile unsigned int counter = 0;
volatile byte flag = 0;

byte addresses[][6] = {"1Node","2Node"};
byte payload[16];                                // nRF sisu
long eeprom_adr = 0;

void setup () {
  // WDT asjad
  MCUSR = 0; //reset the status register of the MCU
  wdt_disable(); //disable the watchdog
  pinMode(LED13, OUTPUT); //pin 13 in OUTPUT
  digitalWrite(LED13, 0); //LED on initially
  setWdt(); //set up the watchdog
   //set up the sleep
  set_sleep_mode(SLEEP_MODE_PWR_DOWN); //sleep mode - POWER DOWN	
  // muu setup
  Serial.begin(57600);
  Wire.begin();
  setup_rtc();
  setup_compass();
  printf_begin();
  radio_setup();
  
  // anna asjadele aega tööle hakata
  delay(2000);
}

void loop () {
   power_all_disable();
   sleep_mode(); //CPU in sleep-this corresponds to sleep_enable+sleep_cpu+sleep_disable
   power_all_enable();
   if (flag) {
      wdt_disable();
      counter = 0;
      flag = 0;
      DateTime now = rtc.now();
      payload[0] = now.year()-2000;			// aasta - 2000
      payload[1] = now.month();
      payload[2] = now.day();
      payload[3] = now.hour();
      payload[4] = now.minute();
      payload[5] = readVcc();				// detsi Volt
      payload[6] = readSolar();				// detsi Volt
      payload[7] = Compass.GetHeadingDegrees()/5.0; 	// x5 kraadi
      byte dht[4];
      loe_dht(&dht);
      payload[8] dht[0];				// .1 täpsusega
      payload[9] dht[1];				// .1 täpsusega
      payload[10] dht[2];				// .1 täpsusega
      payload[11] dht[3];				// .1 täpsusega
      //payload[10] = rõhk 				// +900mBar
      //payload[11] = niiskus				// %
      //payload[12] = tuule kiirus 			// m/s
      //payload[13] = vihm 				// mm
      //payload[14] = lume paksus				// cm
      //payload[15] = varuks...
      for (int i=0; i<16; i++) {
        if (i>11) {
          payload[i] = random(255);
        }  
        Serial.print(payload[i], DEC);
        Serial.print('\t');
      }
      Serial.println();

      radio.stopListening(); 
      radio.writeFast(&payload,16);   //Write to the FIFO buffers        
    
      if(!radio.txStandBy()){ 
          // st ei saanud andmeid saadetud!
          Serial.println("Ei saadetud\n");
      } 
      //delay(30000);
      //other things to do can be put here
      //ledStatus ^= 1; //toggle the LED
      digitalWrite(LED13, 0);
      delay(1000);
      digitalWrite(LED13, 1);      
      setWdt(); //re-set the watchdog
   }	
   
}

void radio_setup() {
  // Setup and configure rf radio
  radio.begin();                          // Start up the radio
  radio.setAutoAck(1);                    // Ensure autoACK is enabled
  radio.setRetries(15,15);                // Max delay between retries & number of retries
  radio.openWritingPipe(addresses[0]);
  radio.openReadingPipe(1,addresses[1]);
  
  radio.stopListening();                 // Start listening
  radio.printDetails();                   // Dump the configuration of the rf unit for debugging
  radio.powerUp(); 
}

long readVcc() {
  long result;
  // Read 1.1V reference against AVcc
  ADMUX = _BV(REFS0) | _BV(MUX3) | _BV(MUX2) | _BV(MUX1);
  delay(2); // Wait for Vref to settle
  ADCSRA |= _BV(ADSC); // Convert
  while (bit_is_set(ADCSRA,ADSC));
  result = ADCL;
  result |= ADCH<<8;
  result = 1126400L / result + 50;         // Back-calculate AVcc in mV
  return result/100.0;                     // vastus 32 tähendab, et pinge on 3.2
}

void setup_compass() {
  Compass.SetDeclination(8, 37, 'E');
  Compass.SetSamplingMode(COMPASS_SINGLE);  
  Compass.SetScale(COMPASS_SCALE_130);
  Compass.SetOrientation(COMPASS_HORIZONTAL_X_NORTH);
}

void setup_rtc() {
  rtc.begin();
  //rtc.adjust(DateTime(__DATE__, __TIME__));
  if (! rtc.isrunning()) {
    Serial.println("RTC is NOT running!");
  }
}

void loe_dht(byte *pdata) {
  DHT22_ERROR_t errorCode;
  // The sensor can only be read from every 1-2s, and requires a minimum
  // 2s warm-up after power-on.
  errorCode = myDHT22.readData();
  switch(errorCode) {
    case DHT_ERROR_NONE:
      Serial.print("Got Data ");
      //Serial.print(myDHT22.getTemperatureC());
      //Serial.print("C ");
      //Serial.print(myDHT22.getHumidity());
      //Serial.println("%");
      // Alternately, with integer formatting which is clumsier but more compact to store and
	  // can be compared reliably for equality:
	  //	  
      //char buf[128];
      //sprintf(buf, "Integer-only reading: Temperature %hi.%01hi C, Humidity %i.%01i %% RH",
      int temp = myDHT22.getTemperatureCInt();
      int niiskus = myDHT22.getHumidityInt();
      //             myDHT22.getTemperatureCInt()/10, abs(myDHT22.getTemperatureCInt()%10),
      //             myDHT22.getHumidityInt()/10, myDHT22.getHumidityInt()%10);
      //Serial.println(buf);
      
      /*byte temp[3];
    int ttt;
    
    temp[0] = (byte) DHT.humidity;
    ttt = DHT.temperature*10.0;
    temp[1] = ttt;
    temp[2] = ttt >> 8;*/
      
      pdata[0] = (byte) temp;
      pdata[1] = (byte) temp >> 8;
      pdata[2] = (byte) niiskus;
      pdata[3] = (byte) niiskus >> 8;
      break;
    case DHT_ERROR_CHECKSUM:
      Serial.print("check sum error ");
      Serial.print(myDHT22.getTemperatureC());
      Serial.print("C ");
      Serial.print(myDHT22.getHumidity());
      Serial.println("%");
      break;
    case DHT_BUS_HUNG:
      Serial.println("BUS Hung ");
      break;
    case DHT_ERROR_NOT_PRESENT:
      Serial.println("Not Present ");
      break;
    case DHT_ERROR_ACK_TOO_LONG:
      Serial.println("ACK time out ");
      break;
    case DHT_ERROR_SYNC_TIMEOUT:
      Serial.println("Sync Timeout ");
      break;
    case DHT_ERROR_DATA_TIMEOUT:
      Serial.println("Data Timeout ");
      break;
    case DHT_ERROR_TOOQUICK:
      Serial.println("Polled to quick ");
      break;
  }
}

int readSolar() {
  int ana =  analogRead(A0);
  
  return 33.0 * ana / 1023.0; //random(255);
}

int loe_malust() {
  
  /* loe mälust, alates algusest
  loe 16 baiti, 
      kui esimene bait ei ole 0, siis saada raadiosse ja kirjuta 1 bait nulliks ja eeprom_adr+16
      kui esimene bait on 0, siis tagasta aadress
  */
  return 0;
}

void kirjuta_mallu() {
  //kirjuta payload eeprom_adr alates mällu ja eeprom_adr+16
}

void setWdt() {
   SREG &= ~(1<<SREG_I); //disable global interrupts
   //prepare the watchdog's register
   WDTCSR |= ((1<<WDCE) | (1<<WDE));
   //set the "Interrupt Mode" with a timeout of 1 sec
   WDTCSR = ((1<<WDIE)| (1<<WDP2) | (1<<WDP1)); 
   SREG |= (1<<SREG_I); //re-enable global interrupts
}

ISR(WDT_vect) {
   if (++counter >= 58) { //set here the # of seconds for the timeout
      flag = 1;
   }
} 
