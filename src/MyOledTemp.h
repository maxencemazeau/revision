
#ifndef MYOLEDTEMP_H
#define MYOLEDTEMP_H

#include <Adafruit_SSD1306.h>
#include "MyOledView.h"
#include <string>
#include <vector>
using std::vector;

class MyOledTemp: public MyOledView {
    
    public:
        void setText(std::string val);
        void setInt(int val);
    private:
        std::string text;
        int nombre;

        void display(Adafruit_SSD1306 *adafruit);
        void update(Adafruit_SSD1306 *adafruit);
};
#endif