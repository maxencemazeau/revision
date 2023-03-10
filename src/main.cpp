#include <iostream>
#include <string>

#include <Arduino.h>
#include "TemperatureStub.h"

#include <myServer.h>
MyServer *myServer = NULL;


using namespace std;

#include <HTTPClient.h>
#include "myFunctions.cpp" //fonctions utilitaires (get_random_string)
#include <WiFiManager.h>
WiFiManager wm;
const char *SSID = "SAC_";
const char *PASSWORD = "sac_";
String ssIDRandom;


#define DHTPIN  15   // Pin utilisée par le senseur DHT11 / DHT22
#define DHTTYPE DHT22  //Le type de senseur utilisé (mais ce serait mieux d'avoir des DHT22 pour plus de précision)
TemperatureStub *temperatureStub = NULL;

float temperature;

int temp = 0;

char strTemperature[128];

bool getter = false;

bool setter = false;

string statut = "";

string data = "";

//Définition de la LED
#define GPIO_PIN_LED_LOCK_ROUGE         12 //GPIO12

#include "MyOled.h"
MyOled *myOled = NULL;

#define SCREEN_WIDTH 128 // OLED display width, in pixels
#define SCREEN_HEIGHT 64 // OLED display height, in pixels

#define OLED_RESET     15 // Reset pin # (or -1 if sharing Arduino reset pin)
#define addrI2C 0x3C

#include "MyOledViewInitialisation.h"
MyOledViewInitialisation *myOledViewInitialisation = NULL;

#define nomSystem "SAC System"
string idDuSysteme = "21546";

#include "MyOledTemp.h"
MyOledTemp *myOledTemp = NULL;

std::string CallBackMessageListener(string message) {
    while(replaceAll(message, std::string("  "), std::string(" ")));
    //Décortiquer le message
    string arg1 = getValue(message, ' ', 1);
    string arg2 = getValue(message, ' ', 2);
    string arg3 = getValue(message, ' ', 3);
    string arg4 = getValue(message, ' ', 4);
    string arg5 = getValue(message, ' ', 5);
    string arg6 = getValue(message, ' ', 6);
    string arg7 = getValue(message, ' ', 7);
    string arg8 = getValue(message, ' ', 8);
    string arg9 = getValue(message, ' ', 9);
    string arg10 = getValue(message, ' ', 10);

    string actionToDo = getValue(message, ' ', 0);
    std::string lireTemp = "25";
    if (string(actionToDo.c_str()).compare(string("lireTemp")) == 0) {
    return(lireTemp.c_str()); }

     
    if(string(actionToDo.c_str()).compare(string("temperature")) == 0){
      return(String(temperature).c_str());
    }

    if(string(arg1.c_str()).compare(string("getData")) == 0){
      //temp = atoi(arg2.c_str());
      data = arg2.c_str();
      getter = true;
      return(String("OK").c_str());
    }

    if(string(arg1.c_str()).compare(string("getValue")) == 0){
      temp = atoi(arg2.c_str());
      getter = true;
      return(String("OK").c_str());
    }



    }


void setup() { 
    Serial.begin(9600);
    delay(100);

    
//Initiation pour la lecture de la température
    temperatureStub = new TemperatureStub;
    temperatureStub->init(DHTPIN, DHTTYPE); //Pin 15 et Type DHT11

//Initialisation de la LED
    pinMode(GPIO_PIN_LED_LOCK_ROUGE,OUTPUT);  

    digitalWrite(GPIO_PIN_LED_LOCK_ROUGE, HIGH);

     myOled = new MyOled(&Wire, addrI2C, SCREEN_HEIGHT, SCREEN_WIDTH);
      myOled->init();

    myOledViewInitialisation = new MyOledViewInitialisation();
    myOledViewInitialisation->setIdDuSysteme(idDuSysteme.c_str());
    myOledViewInitialisation->setNomDuSysteme(nomSystem);
    myOled->displayView(myOledViewInitialisation);

    //Connection au WifiManager
    String ssIDRandom, PASSRandom;
    String stringRandom;
    stringRandom = get_random_string(4).c_str();
    ssIDRandom = SSID;
    ssIDRandom = ssIDRandom + stringRandom;
    stringRandom = get_random_string(4).c_str();
    PASSRandom = PASSWORD;
    PASSRandom = PASSRandom + stringRandom;

    char strToPrint[128];
    sprintf(strToPrint, "Identification : %s   MotDePasse: %s", ssIDRandom, PASSRandom);
    Serial.println(strToPrint);

   if (!wm.autoConnect(ssIDRandom.c_str(), PASSRandom.c_str())){
        Serial.println("Erreur de connexion.");
        }
    else {
        Serial.println("Connexion Établie:");
        }
        
        // ----------- Routes du serveur ---------------- 
    myServer = new MyServer(80);
    myServer->initAllRoutes();
    myServer->initCallback(&CallBackMessageListener);
    
     myOled->clearDisplay();
}

void OledTemp(){
  myOledTemp = new MyOledTemp();
  myOledTemp->setText(data);
  myOledTemp->setInt(temp);
  myOled->displayView(myOledTemp);
  


} 

void loop() {
  // put your main code here, to run repeatedly:

  temperature = temperatureStub->getTemperature();

    /* if(temperature < temp) {
    digitalWrite(GPIO_PIN_LED_LOCK_ROUGE, LOW);
    statut = "supp";
    OledTemp();
  } else if(temperature > temp) {
    digitalWrite(GPIO_PIN_LED_LOCK_ROUGE, HIGH);
    
  } */

  if(getter == true) {
    OledTemp();
  }

  delay(1000);
}