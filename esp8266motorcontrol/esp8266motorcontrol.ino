
#include <ESP8266WiFi.h>
#include <WiFiClient.h>
#include <ESP8266WebServer.h>
#include <EEPROM.h>

// Replace with your network credentials
const char* ssid     = "Navin";
const char* password = "$#56akaliacolony";

String content;
String esid = "";
String epass = "";

// Set your Static IP address
IPAddress local_IP(192, 168, 18, 182);
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
int LEDPin = 13;
int MOTOR_PIN = 12;
int HOT_SPOT_PIN = 14;

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
  //make the LED pin output and initially turned off
  pinMode(LEDPin, OUTPUT);
  pinMode(MOTOR_PIN, OUTPUT);
  pinMode(HOT_SPOT_PIN, INPUT);
  
  digitalWrite(LEDPin, LOW);
  digitalWrite(MOTOR_PIN, LOW);

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
  
    server.on("/LEDOn", [](){
      server.send(200, "text/html", page);
      digitalWrite(LEDPin, HIGH);
      delay(1000);
    });
    server.on("/LEDOff", [](){
      server.send(200, "text/html", page);
      digitalWrite(LEDPin, LOW);
      delay(1000); 
    });
    server.on("/MOTOROff", [](){
      server.send(200, "text/html", page);
      digitalWrite(MOTOR_PIN, LOW);
      delay(1000); 
    });
    server.on("/MOTOROn", [](){
      server.send(200, "text/html", page);
      digitalWrite(MOTOR_PIN, HIGH);
      delay(1000); 
    });
    server.begin();
    Serial.println("Web server started!");
  
}
 
void loop(void){

  server.handleClient();
     
  //Serial.println(digitalRead(HOT_SPOT_PIN));
  //delay(1000);
}
