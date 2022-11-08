
#define LED 13

int cont = 0;
int contTemp = 0;

int banderaLed = 0;

int banderaImprimir = 0;

int temperatura = 0;
int bandTemp = 0;

void setup()
{
    Serial.begin(115200);

    init_Timer();

    pinMode(LED, OUTPUT);
}

void muestreo()
{
    temperatura = analogRead(A0);
}

void imprimirMuestra()
{
    Serial.print("Temp = ");
    Serial.println(temperatura);
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
    if (bandTemp == 1)
    {
        bandTemp = 0;
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

    contTemp = contTemp + 1;
    if (contTemp == 200)
    {
        contTemp = 0;
        bandTemp = 1;
    }

    cont = cont + 1;
    if (cont == 500)
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