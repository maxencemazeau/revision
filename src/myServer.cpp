/**
    Gestion d'un serveur WEB
    @file MyServer.cpp
    @author Alain Dubé
    @version 1.1 20/11/20 
*/
#include <Arduino.h>
#include "MyServer.h"
using namespace std;

typedef std::string (*CallbackType)(std::string);
CallbackType MyServer::ptrToCallBackFunction = NULL;

//Exemple pour appeler une fonction CallBack
//if (ptrToCallBackFunction) (*ptrToCallBackFunction)(stringToSend); 
void MyServer::initCallback(CallbackType callback) {
    ptrToCallBackFunction = callback;
    }

void MyServer::initAllRoutes() { 
    currentTemperature = 3.3f;

    //Initialisation du SPIFF.
    if (!SPIFFS.begin(true)) {
        Serial.println("An Error has occurred while mounting SPIFFS");
        return;
        }

    //Route initiale (page html)
    this->on("/", HTTP_GET, [](AsyncWebServerRequest *request) {
        request->send(SPIFFS, "/index.html", "text/html");
        });

    //Route du script JavaScript
    this->on("/script.js", HTTP_GET, [](AsyncWebServerRequest *request) {
        request->send(SPIFFS, "/script.js", "text/javascript");
        });

    this->on("/style.css", HTTP_GET, [](AsyncWebServerRequest *request) {
        request->send(SPIFFS, "/style.css", "text/css");
        });

    this->on("/sac.png", HTTP_GET, [](AsyncWebServerRequest *request) {
        request->send(SPIFFS, "/sac.png", "");
        });
   
    this->onNotFound([](AsyncWebServerRequest *request){
        request->send(404, "text/plain", "Page Not Found");
        });

    this->on("/getData", HTTP_GET, [](AsyncWebServerRequest *request) {
        AsyncResponseStream *response = request->beginResponseStream("text/html");
        AsyncWebParameter* data = request->getParam(0);
        // int temp = atoi(data->value().c_str());
        String temp = data->value().c_str();
        String sendTo = ("button getData ");
        String actionToSend = (sendTo + temp);
        Serial.println(actionToSend);
        if (ptrToCallBackFunction) (*ptrToCallBackFunction)(actionToSend.c_str()); //Exemple pour appeler une fonction CallBack
        request->send(200, "text/plain", "getData");
        });

        this->on("/getValue", HTTP_GET, [](AsyncWebServerRequest *request) {
        AsyncResponseStream *response = request->beginResponseStream("text/html");
        AsyncWebParameter* value = request->getParam(0);
        int temp = atoi(value->value().c_str());
        String sendTo = ("button getData ");
        String actionToSend = (sendTo + temp);
        Serial.println(actionToSend);
        if (ptrToCallBackFunction) (*ptrToCallBackFunction)(actionToSend.c_str()); //Exemple pour appeler une fonction CallBack
        request->send(200, "text/plain", "getValue");
        });

    this->on("/getTemperature", HTTP_GET, [](AsyncWebServerRequest *request){
        std::string repString = "";
        if(ptrToCallBackFunction) repString = (*ptrToCallBackFunction)("temperature");
        String temperature = String(repString.c_str());
        request->send(200, "text/plain", temperature);
    });

    this->on("/getAllWood", HTTP_GET, [](AsyncWebServerRequest *request){
        Serial.println("getAllWoodOptions... ");

        HTTPClient http;
        String woodApiRestAddress = "http://123.456.789.123/getAllWoods";
        http.begin(woodApiRestAddress);
        http.GET();
        String response = http.getString();
        Serial.println(response);
        request->send(200, "text/plain", response);
    });
   
    
    this->begin();
};

