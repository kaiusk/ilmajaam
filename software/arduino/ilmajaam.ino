// Date and time functions using a DS1307 RTC connected via I2C and Wire lib

#include <avr/wdt.h>
#include <avr/sleep.h>
#include <avr/power.h>
#include <SPI.h>
#include <Wire.h>
#include "nRF24L01.h"
#include "RF24.h"
//#include "printf.h"
#include "RTClib.h"
#include <HMC5883L_Simple.h>
#include <dht.h>
#include <SFE_BMP180.h>

#define DHT22_PIN 18
#define PWR_PIN 23
#define ALTITUDE 42.0

RTC_DS1307 rtc;
HMC5883L_Simple Compass;
dht DHT;
SFE_BMP180 pressure;
RF24 radio(3,4);

volatile unsigned int counter = 0;
//volatile unsigned int eeprom_adr = 0;
volatile byte flag = 1;

byte addresses[][6] = {"1Node","2Node"};
byte payload[16];                                // nRF sisu


void setup () {
  // WDT asjad
  MCUSR = 0; 			//reset the status register of the MCU
  wdt_disable(); 		//disable the watchdog
  pinMode(PWR_PIN, OUTPUT); 	//pin OUTPUT
  digitalWrite(PWR_PIN, 1); 	//toide sisse
  setWdt(); 			//set up the watchdog
				//set up the sleep
  set_sleep_mode(SLEEP_MODE_PWR_DOWN); //sleep mode - POWER DOWN	
  // muu setup
  hw_setup();
  Serial.begin(57600);
}

void loop () {
   power_all_disable();
   sleep_mode(); 			//CPU in sleep-this corresponds to sleep_enable+sleep_cpu+sleep_disable
   power_all_enable();
   if (flag) {
      wdt_disable();
      counter = 0;
      flag = 0;
      // start
      digitalWrite(PWR_PIN, 1);         // toide sisse
      delay(500);                      	// anna aega asjadel käima minna
      radio_setup();
      DateTime now = rtc.now();
      payload[0] = now.year()-2000;	// aasta - 2000
      payload[1] = now.month();
      payload[2] = now.day();
      payload[3] = now.hour();
      payload[4] = now.minute();
      payload[5] = readVcc();
      payload[6] = readSolar();
      payload[7] = loe_bmp();
      loe_dht(payload);                // 8,9,10
      payload[11] = Compass.GetHeadingDegrees()/2.0;
      payload[12] = readRTCbat();
      
      radio.stopListening(); 
      radio.writeFast(&payload,16);   //Write to the FIFO buffers        
    
      if(!radio.txStandBy() && payload[4]==0 ){ 
          // st ei saanud andmeid saadetud ja on taistund
          Serial.println("Ei saadetud\n");
      } 
      //stop
      // debug
      for (int i=0; i<16; i++) {
        Serial.print(payload[i], DEC);
        Serial.print('\t');
      }
      Serial.println();
      
      delay(500);                      // lase serialil lõpetada

      digitalWrite(PWR_PIN, 0);		// toide välja
      setWdt(); //re-set the watchdog
   }	
   
}

void hw_setup() {
  delay(1000);
  setup_rtc();
  pressure.begin();
  delay(1000);
}

void radio_setup() {
  // Setup and configure rf radio
  radio.begin();                          // Start up the radio
  radio.setAutoAck(1);                    // Ensure autoACK is enabled
  radio.setRetries(15,15);                // Max delay between retries & number of retries
  radio.openWritingPipe(addresses[0]);
  radio.openReadingPipe(1,addresses[1]);
  
  radio.stopListening();                 // Start listening
  //radio.printDetails();                   // Dump the configuration of the rf unit for debugging
  radio.powerUp();
  delay(100);
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
  Compass.SetSamplingMode(COMPASS_SINGLE);  
  Compass.SetScale(COMPASS_SCALE_810); // min tundlikus
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
    int ttt;
    int chk = DHT.read22(DHT22_PIN);
    if (chk == DHTLIB_OK) {
        //Serial.println("OK");
        ttt = DHT.temperature*10.0;
        pdata[8] =  ttt;
        pdata[9] =  ttt >> 8;
	pdata[10] = (byte) DHT.humidity;
    } else {
	pdata[8] = 0;    
	pdata[9] = 0;
	pdata[10] = 0;
    }
}

byte loe_bmp() {
  char status;
  double T,P,p0=0.0;
  
  status = pressure.startTemperature();
  if (status != 0) {
    // Wait for the measurement to complete:
    delay(status);
    status = pressure.getTemperature(T);
    if (status != 0) {
      status = pressure.startPressure(3);
      if (status != 0) {
        // Wait for the measurement to complete:
        delay(status);
        status = pressure.getPressure(P,T);
        if (status != 0) {
          p0 = pressure.sealevel(P,ALTITUDE); 
	} 
      } 
    }
  }
  if (p0>0) return (byte) p0-900.0;
  else return 0;
}

int readSolar() {
  int ana =  analogRead(A0);
  return 33.0 * ana / 1023.0; 
}

int readRTCbat() {
  int ana =  analogRead(A3);
  return 50.0 * ana / 1023.0; //random(255);
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
   if (++counter >= 10) { //set here the # of seconds for the timeout
      flag = 1;
   }
} 
