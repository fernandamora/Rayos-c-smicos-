from socket import timeout
import serial
import time
import requests
import numpy as np

def main():
    SerialPort = "COM3"
    try:
        dev = serial.Serial(SerialPort, 115200, timeout = 1)
        dev.close()
        dev.open()
        dev.flushInput()
        dev.flushOutput()
        while(1):
            time.sleep(10)
            dev.write(str.encode('s'))
            dev.flushInput()
            data = dev.readline()
            data = data.decode().split(',')
            print(data)
            resp = requests.post("http://localhost:5000/api/RayosCosmicos", json={"lugar": "universidad", "temperatura": 20*np.random.rand(), "saturacion":  int(data[0]), "luz":  int(data[1])})
            print(resp.text)
            
    except Exception as error:
        print(error)
    except KeyboardInterrupt:
        dev.close()
    finally:
        dev.close()


if __name__ == '__main__':
    main()

# mongodb+srv://josuejaramillo:<fernandalamasmora>@rayoscosmicos.giewzds.mongodb.net/?retryWrites=true&w=majority