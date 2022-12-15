#include <Arduino.h>
#include "MyOledTemp.h"
using namespace std;

void MyOledTemp::setText(string val){
    text = val;
}

void MyOledTemp::update(Adafruit_SSD1306 *adafruit){
    Serial.println("Update my view MyOledTemp");
}

void MyOledTemp::display(Adafruit_SSD1306 *adafruit){
    adafruit->setTextSize(2);
    adafruit->setCursor(0, 0);
    adafruit->print(text.c_str());

    adafruit->display();
}