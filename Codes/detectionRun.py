import detectionLib as dl

if __name__ == "__main__":
    
    bkg = "../Imagenes/bkg.png"
    img = "../Imagenes/Ps4.png"
    cut = [480,1500]
    enh_bkg = [0.34, 5, 2]
    enh_img = [0.34, 4, 4]
    thresh = [30, 10]

    #dl.detection().imageDetection(bkg, img, cut, enh_bkg, enh_img, thresh)

    video = r"C:\Users\josue\Desktop\Git-H-L\Camara de niebla\TOMA 2\Video_up_view.mp4"

    dl.detection().videoDetection(bkg, video, cut, enh_bkg, enh_img, thresh)
