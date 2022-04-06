
#include <ESP8266WiFi.h>
#include <WiFiClient.h>
#include <ESP8266WebServer.h>
#include <EEPROM.h>
#include <Ultrasonic.h>

// Replace with your network credentials
const char* ssid     = "Navin";
const char* password = "$#56akaliacolony";

// Set your Static IP address
IPAddress local_IP(192, 168, 18, 184);
// Set your Gateway IP address
IPAddress gateway(192, 168, 18, 1);

IPAddress subnet(255, 255, 255, 0);
IPAddress primaryDNS(8, 8, 8, 8);   //optional
IPAddress secondaryDNS(8, 8, 4, 4); //optional

//Function Decalration
bool testWifi(void);
void setupAP(void);

int statusCode;
String st;
String page = "";
String successpage = "";

//esp8266 pinout gpio
//gpio16 D0
//gpio5 D1
//gpio4 D2
//gpio0 D3
//gpio2 D4
//gpio14 D5
//gpio12 D6
//gpio13 D7
//gpio15 D8
//gpio3 RXD0
//gpio1 TXD0
//gpio10 S3
//gpio09 S2

String content;
String esid = "";
String epass = "";

const int WATER_MOTOR_PIN_1 = 16;
const int trigPin = 13; // D7
const int echoPin = 12; // D6
const int LEDPin = 5;
const int MOTOR_PIN = 4;
const int HOT_SPOT_PIN = 14;

Ultrasonic ultrasonic(trigPin, echoPin);
//define sound speed in cm/uS
#define SOUND_SPEED 0.034
#define CM_TO_INCH 0.393701

long duration;
float distanceCm;
float distanceInch;

//Variables
int i = 0;
int counterThirtyMin = 0;


ESP8266WebServer server(80);   //instantiate server at port 80 (http port)


void createWebServer()
{
  {
    server.on("/", []() {

      IPAddress ip = WiFi.softAPIP();
      String ipStr = String(ip[0]) + '.' + String(ip[1]) + '.' + String(ip[2]) + '.' + String(ip[3]);
      content = "<!DOCTYPE HTML>\r\n<html style=\"font-size:50px;\">WMS Wifi Credentials Settings";
      content += "<form action=\"/scan\" method=\"POST\"><input type=\"submit\" style=\"width:300px;height:50px;margin:20px;\" value=\"scan\"></form>";
      content += ipStr;
      content += "<p>";
      content += st;
      content += "</p><form method='get' action='setting'><label style='font-size: 32px;'>SSID: </label><input name='ssid' style='width:300px;height:50px;margin:20px;font-size: 40px;' length=32><br/><label style='font-size: 32px;'>PASS: </label><input name='pass' style='width:300px;height:50px;margin:20px;font-size: 40px;' length=64><br/><input type='submit' style='width:300px;height:50px;margin:20px;font-size:32px;' value='Save' ></form>";
      content += "</html>";
      server.send(200, "text/html", content);
    });
    server.on("/scan", []() {
      //setupAP();
      IPAddress ip = WiFi.softAPIP();
      String ipStr = String(ip[0]) + '.' + String(ip[1]) + '.' + String(ip[2]) + '.' + String(ip[3]);

      content = "<!DOCTYPE HTML>\r\n<html>go back";
      server.send(200, "text/html", content);
    });

    server.on("/restart", []() {
      ESP.restart();
    });

    server.on("/setting", []() {
      String qsid = server.arg("ssid");
      String qpass = server.arg("pass");
      if (qsid.length() > 0 && qpass.length() > 0) {
        Serial.println("clearing eeprom");
        for (int i = 0; i < 96; ++i) {
          EEPROM.write(i, 0);
        }
        Serial.println(qsid);
        Serial.println("");
        Serial.println(qpass);
        Serial.println("");

        Serial.println("writing eeprom ssid:");
        for (int i = 0; i < qsid.length(); ++i)
        {
          EEPROM.write(i, qsid[i]);
          Serial.print("Wrote: ");
          Serial.println(qsid[i]);
        }
        Serial.println("writing eeprom pass:");
        for (int i = 0; i < qpass.length(); ++i)
        {
          EEPROM.write(32 + i, qpass[i]);
          Serial.print("Wrote: ");
          Serial.println(qpass[i]);
        }
        EEPROM.commit();
        content = "<!DOCTYPE HTML>\r\n<html>{\"Success\":\"saved to eeprom... reset to boot into new wifi\"}";
        server.send(200, "text/html", content);
      } else {
        Serial.println("Sending 404");
        content = "<!DOCTYPE HTML>\r\n<html>{\"Error\":\"404 not found\"}";
        server.send(200, "text/html", content);
      }
    });
  }
}


void launchWeb()
{
  Serial.println("");
  if (WiFi.status() == WL_CONNECTED)
    Serial.println("WiFi connected");
    Serial.print("Local IP: ");
    Serial.println(WiFi.localIP());
    Serial.print("SoftAP IP: ");
    Serial.println(WiFi.softAPIP());
    createWebServer();
    //un comment start camera webserver if requirent is to show camera on hotspot.
    //startCameraServer();
    // Start the server
    server.begin();
    Serial.println("Server started");
}

void setupAP(void)
{
  WiFi.mode(WIFI_STA);
  WiFi.disconnect();
  delay(100);
  int n = WiFi.scanNetworks();
  Serial.println("scan done");
  if (n == 0)
    Serial.println("no networks found");
  else
  {
    Serial.print(n);
    Serial.println(" networks found");
    for (int i = 0; i < n; ++i)
    {
      // Print SSID and RSSI for each network found
      Serial.print(i + 1);
      Serial.print(": ");
      Serial.print(WiFi.SSID(i));
      Serial.print(" (");
      Serial.print(WiFi.RSSI(i));
      Serial.print(")");
      //Serial.println((WiFi.encryptionType(i) == ENC_TYPE_NONE) ? " " : "*");
      delay(10);
    }
  }
  Serial.println("");
  st = "<ol>";
  for (int i = 0; i < n; ++i)
  {
    // Print SSID and RSSI for each network found
    st += "<li>";
    st += WiFi.SSID(i);
    st += " (";
    st += WiFi.RSSI(i);

    st += ")";
    //st += (WiFi.encryptionType(i) == ENC_TYPE_NONE) ? " " : "*";
    st += "</li>";
  }
  st += "</ol>";
  delay(100);
  WiFi.softAP("pumpWMS", "");
  Serial.println("Initializing_softap_for_wifi credentials_modification");
  //launchWeb();
  Serial.println("over");
}


//----------------------------------------------- Fuctions used for WiFi credentials saving and connecting to it which you do not need to change
bool testWifi(void)
{
  int c = 0;
  //Serial.println("Waiting for Wifi to connect");
  while ( c < 20 ) {
    if (WiFi.status() == WL_CONNECTED)
    {
      return true;
    }
    delay(500);
    Serial.print("*");
    c++;
  }
  Serial.println("");
  Serial.println("Connect timed out, opening HOTSPOT");
  return false;
}


void setup(void){
  //the HTML of the web page
  page = "<h1>WMS Web Server</h1><p><a href=\"LEDOn\"><button>ON</button></a>&nbsp;<a href=\"LEDOff\"><button>OFF</button></a></p>";
  successpage = "<h1>Success</h1>";
  
  //make the LED pin output and initially turned off

  pinMode(LEDPin, OUTPUT);
  pinMode(MOTOR_PIN, OUTPUT);
  pinMode(WATER_MOTOR_PIN_1, OUTPUT);
  
  pinMode(HOT_SPOT_PIN, INPUT);
  pinMode(trigPin, OUTPUT);
  pinMode(echoPin, INPUT);

  
  digitalWrite(LEDPin, LOW);
  digitalWrite(MOTOR_PIN, LOW);
  digitalWrite(WATER_MOTOR_PIN_1, LOW);


  //EEPROM code start
  Serial.println();
  Serial.println("Disconnecting current wifi connection");
  WiFi.disconnect();
  EEPROM.begin(512); //Initialasing EEPROM
  delay(10);
  Serial.println();
  Serial.println();
  Serial.println("Startup");
  
  delay(1000);
  Serial.begin(115200);

    //If reset wifi button pressed which is 15 pin then just start hotspot
  if(testWifi()== false && (digitalRead(HOT_SPOT_PIN) == LOW)){
     Serial.println(" Set wifi hotspot");
     Serial.println("Turning the HotSpot On");
     setupAP();// Setup HotSpot
  }

  if(digitalRead(HOT_SPOT_PIN) == HIGH){
        if (!WiFi.config(local_IP, gateway, subnet, primaryDNS, secondaryDNS)) {
          Serial.println("STA Failed to configure");
        }

        //---------------------------------------- Read eeprom for ssid and pass
        Serial.println("Reading EEPROM ssid");
      
      
        for (int i = 0; i < 32; ++i)
        {
          esid += char(EEPROM.read(i));
        }
        Serial.println();
        Serial.print("SSID: ");
        Serial.println(esid);
        Serial.println("Reading EEPROM pass");
      
        for (int i = 32; i < 96; ++i)
        {
          epass += char(EEPROM.read(i));
        }
        Serial.print("PASS: ");
        Serial.println(epass);
        
        WiFi.begin(esid.c_str(), epass.c_str());
        //WiFi.begin(ssid, password); //begin WiFi connection
        
        Serial.println("");
     
    
        // Wait for connection
        while (WiFi.status() != WL_CONNECTED) {
          delay(500);
          Serial.print(".");
        }
        Serial.println("");
        Serial.print("Connected to ");
        Serial.println(ssid);
        Serial.print("IP address: ");
        Serial.println(WiFi.localIP());
      
        WiFi.setAutoReconnect(true);
        WiFi.persistent(true);
  }

  if(digitalRead(HOT_SPOT_PIN) == HIGH){
     
    server.on("/", [](){
      server.send(200, "text/html", page);
    });
  }

  if(digitalRead(HOT_SPOT_PIN) == LOW){
     createWebServer();
  }

    server.on("/ultrasonic", [](){
      int dist = ultrasonic.read();
      String s =  "<!DOCTYPE html PUBLIC \"-//W3C//DTD XHTML 1.0 Transitional//EN\"\"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd\">";  // let's put a proper header
      s +=  "<html><head><title>ESP Server</title><meta http-equiv=\"Content-Type\" content=\"text/html;charset=utf-8\" ></head>";
      s += "<body style=\"color: dimgray; background-color: palegoldenrod; font-size: 12pt; font-family: sans-serif;\">";      // and a proper body style
  
      s += "<p>{ distance: ";
      s += dist;
      s +=" }</p>";
      s += "</body></html>"; // and close it off properly
      server.send(200, "text/html", s);
      delay(1000);
    });
    
    server.on("/LEDOn", [](){
      server.send(200, "text/html", successpage);
      digitalWrite(LEDPin, HIGH);
      delay(1000);
    });
    server.on("/LEDOff", [](){
      server.send(200, "text/html", successpage);
      digitalWrite(LEDPin, LOW);
      delay(1000); 
    });
    server.on("/MOTOROff", [](){
      server.send(200, "text/html", successpage);
      digitalWrite(MOTOR_PIN, LOW);
      delay(1000); 
    });
    server.on("/MOTOROn", [](){
      server.send(200, "text/html", successpage);
      digitalWrite(MOTOR_PIN, HIGH);
      delay(1000); 
    });
    server.on("/watermotoroff", [](){
      server.send(200, "text/html", successpage);
      digitalWrite(WATER_MOTOR_PIN_1, LOW);
      delay(1000); 
    });
    server.on("/watermotoron", [](){
      server.send(200, "text/html", successpage);
      digitalWrite(WATER_MOTOR_PIN_1, HIGH);
      delay(1000); 
    });
    
    server.begin();
    Serial.println("Web server started!");
  
}
 
void loop(void){

  
    //this code will restart esp32 cam after every 30 miniutes start
    if(counterThirtyMin < 3600){
      counterThirtyMin++;
    }
    if(counterThirtyMin >= 3600) {
      counterThirtyMin = 0;
      ESP.restart();
    }
    //this code will restart esp32 cam after every 30 miniutes end
     
     server.handleClient();
     
  //Serial.println(digitalRead(HOT_SPOT_PIN));
  delay(1000);
}
