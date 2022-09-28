void setup() { 
  Serial.begin(9600);
}


void loop() {
  
  int mqVal = analogRead(A0);//Leemos el sensor
  

  Serial.println(mqVal);
  int lmVal = analogRead(A1);
  Serial.print(",");
  Serial.println(lmVal);
  delay(100); 
}
