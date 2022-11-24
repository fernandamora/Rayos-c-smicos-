import numpy as np
import cv2
import matplotlib.pyplot as plt
from PIL import ImageEnhance, Image

class detection:

    def __init__(self, ):
        pass

    def enhance(self, img, enh):
        #convierte a escala de grises y formato de PIL
        img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
        img = cv2.cvtColor(img, cv2.COLOR_RGB2GRAY) 
        img = Image.fromarray(img)
        #Ajusta brillo, constrate y nitidez, luego convierte a array
        img = ImageEnhance.Brightness(img).enhance(enh[0])
        img = ImageEnhance.Contrast(img).enhance(enh[1])
        img = ImageEnhance.Sharpness(img).enhance(enh[2])
        img = np.array(img)
        return img

    def threshold(self, img, thresh):
        #Convierte a blanco y negro
        _,img =  cv2.threshold(img, thresh, 255, cv2.THRESH_BINARY)
        return img
    
    def contours(self, trace):
        cnts,_ = cv2.findContours(trace, cv2.RETR_EXTERNAL,cv2.CHAIN_APPROX_NONE)
        CNTS = ()
        for i in range(0, len(cnts)): #Quita algunos de los contornos pequeños que corresponden a ruido
            if cnts[i].shape[0] > 70:
                CNTS += (cnts[i], )
        return CNTS
    
    def drawContours(self, orImage, CNTS):
        #Dibuja los contornos sobre la imagen
        contours = cv2.drawContours(orImage.copy(), CNTS, -1, (0,0,255), 2)
        contours = cv2.putText(contours, "Particulas (aprox): {}".format(len(CNTS)), (50,70), cv2.FONT_HERSHEY_DUPLEX, 1.4, (200,82,150), 5)
        orImageText = cv2.putText(orImage.copy(), "Imagen original", (50,70), cv2.FONT_HERSHEY_DUPLEX, 1.4, (200,82,150), 5)
        frame = cv2.hconcat([orImageText, contours])

        cv2.imshow("img", cv2.resize(frame, (620, 680)))
        
        
    
    def imageDetection(self, bkg, img, cut, enh_bkg, enh_img, thresh):

        img, bkg = cv2.imread(img)[int(cut[0]):int(cut[1])], cv2.imread(bkg)[int(cut[0]):int(cut[1])]

        orImage = img.copy()

        img = self.enhance(img, enh_img)
        img = self.threshold(img, thresh[0])

        bkg = self.enhance(bkg, enh_bkg)
        bkg = self.threshold(bkg, thresh[1])

        trace = cv2.subtract(img, bkg)

        CNTS = self.contours(trace)

        self.drawContours(orImage, CNTS)
        cv2.waitKey(0)
        cv2.destroyAllWindows()

    def videoDetection(self, bkg, video, cut, enh_bkg, enh_img, thresh):
        video = cv2.VideoCapture(video)

        bkg = cv2.imread(bkg)[int(cut[0]):int(cut[1])]
        bkg = self.enhance(bkg, enh_bkg)
        bkg = self.threshold(bkg, thresh[1])

        while video.isOpened():
            ret, frame = video.read()
            if ret:
                img = cv2.rotate(frame, cv2.ROTATE_180)[int(cut[0]):int(cut[1])]

                orImage = img.copy()

                img = self.enhance(img, enh_img)
                img = self.threshold(img, thresh[0])

                trace = cv2.subtract(img, bkg)

                CNTS = self.contours(trace)
                self.drawContours(orImage, CNTS)
                if cv2.waitKey(1) & 0xFF == ord('q'):
                    break

                    
                
        video.release()
        cv2.destroyAllWindows()

