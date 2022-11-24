#define LED 13

int cont = 0;
int contMuestreo = 0;

int banderaLed = 0;

int banderaImprimir = 0;

int temperatura = 0;
int bandMuestreo = 0;

// variables para le muestreo
double mqVal = 0;
double fotoVal = 0;
double tempVal = 0;

void setup()
{
  Serial.begin(115200);

  init_Timer();

  pinMode(LED, OUTPUT);
}

// Funcion que muestrea los datos de los sensores
void muestreo()
{
  mqVal = analogRead(A6);
  fotoVal = analogRead(A3);
  tempVal = analogRead(A2);

  mqVal = mqVal * 5 / 1024;                   // Convierte a voltaje
  mqVal = 1000 * ((5 - mqVal) / mqVal);       // Convierte a rs
  mqVal = 0.4091 * pow(mqVal / 5463, -1.497); // Convierte a concentracion de alcohol mg/L

  tempVal = (tempVal / 1024) * 5000; // Convierte a milivoltios
  tempVal = tempVal / 10;            // Convierte a celcius

  fotoVal = (fotoVal * 3000 * 10) / (10 * 10 * (1024 - fotoVal)); // Convierte a Lux
}

void imprimirMuestra()
{

  String datosPython = String(mqVal) + "," + String(fotoVal) + "," + String(tempVal);

  Serial.print(datosPython);
  // Serial.println(temperatura);
}

void serialEvent()
{
  while (Serial.available())
  {
    char cmd = (char)Serial.read();

    if (cmd == 's')
    {
      banderaImprimir = 1;
    }
  }
}

void loop()
{
  if (bandMuestreo == 1)
  {
    bandMuestreo = 0;
    muestreo();
  }

  if (banderaImprimir == 1)
  {
    banderaImprimir = 0;
    imprimirMuestra();
  }

  if (banderaLed == 1)
  {
    banderaLed = 0;
    digitalWrite(LED, !digitalRead(LED));
  }

  // digitalWrite(LED, HIGH);
  // delay(1000);
  //  digitalWrite(LED, LOW);
  //  delay(1000);

  // Serial.println("Hola Mundo");
  // delay(2000);
}

ISR(TIMER1_COMPA_vect)
{

  contMuestreo = contMuestreo + 1;
  if (contMuestreo == 1000)
  {
    contMuestreo = 0;
    bandMuestreo = 1;
  }

  cont = cont + 1;
  if (cont == 200) // contador de titileo del led
  {
    cont = 0;
    banderaLed = 1;
  }
}

void init_Timer()
{
  /* Example code with timer interrupt that will create an interruption each
   *  1 s using timer1 and prescalar of 1024.
  Calculations (for 500ms):
      System clock 16 Mhz and Prescalar 1024;
      Timer 1 speed = 16Mhz/1024 = 15625 hz
      Pulse time = 1/15625 hz =  64us
      Count up to = 1s / 64us = 15625 (so this is the value the OCR register should have)*/

  cli(); // stop interrupts for till we make the settings

  TCNT1 = 0;               // Initialize counter value to 0
  TCCR1A = 0;              // Reset entire TCCR1A to 0
  TCCR1B = 0;              // Reset entire TCCR1B to 0
  TCCR1B |= (1 << WGM12);  // set the timer 1 for (CTC) mode.
  TCCR1B |= (1 << CS10);   // Set CS10 and CS12 bits, so we get prescalar 1024
  TIMSK1 |= (1 << OCIE1A); // Set OCIE1A to 1 so we enable compare match A
  OCR1A = 16000;           // Finally we set compare register A to this value
  sei();                   // Enable back the interrupts
}

// void setup()
// {
//   Serial.begin(115200);
// }

// void loop()
// {

//   int mqVal = analogRead(A0); // Leemos el sensor
//   // Serial.println(mqVal);
//   // Serial.print(",");
//   int fotoVal = analogRead(A1);
//   // Serial.println(fotoVal);
//   String data(mqVal, fotoVal);
//   Serial.println(data);
//   delay(100);
// }
