import Carousel from 'react-bootstrap/Carousel';
import "bootstrap/dist/css/bootstrap.min.css";
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';

import {axiosInstance} from "../src/config/config"
import { useState } from "react";

function App() {
  const [facc, setfacc] = useState("0");
  const [sacc, setsacc] = useState("1");
  const [tacc, settacc] = useState("1");
  const [lugar, setLugar] = useState("");
  const [temperatura, setTemperatura] = useState("");
  const [saturacion, setSaturacion] = useState("");
  const [consulta, setConsulta] = useState("casa");
  const [RayCosObj, setRayCosObj] = useState([
    {
      _id: 1,
      lugar: "ninguno",
      temperatura: 0,
      saturacion: 0,
      luz: 0,
    }
  ]);

  function Facc() {
    setfacc("0");
    setsacc("1");
    settacc("1");
  }

  function Sacc() {
    setfacc("1");
    setsacc("0");
    settacc("1");
  }

  function Tacc() {
    setfacc("1");
    setsacc("1");
    settacc("0");
  }
  //Solicitar todos los datos

  function cargarDatos() {
    axiosInstance
    .get(`/api/RayosCosmicos`)
    .then((res) =>{
      setRayCosObj(res.data)
    })
    .catch((err) => console.error(err));
    
  }

  //Solicitar ultimo dato de la base de datos
  function lastData()  {
    axiosInstance
    .get(`/api/RayosCosmicos/ultimo/lugar/${consulta}`)
    .then((res) => {
      console.log(res.data[0].temperatura);
      setLugar(res.data[0].lugar)
      setTemperatura(res.data[0].temperatura)
      setSaturacion(res.data[0].saturacion)
    }).catch((err) => console.error(err))
  };

  function cargarDatosLugar() {
    axiosInstance
    .get(`/api/RayosCosmicos/lugar/${consulta}`)
    .then((res) =>{
      setRayCosObj(res.data)
    })
    .catch((err) => console.error(err));
  }

  function clickTodasCasa() {
    setConsulta("casa");
    cargarDatosLugar();
  }

  function clickTodasUni() {
    setConsulta("universidad");
    cargarDatosLugar();
  }

  function clickBotonCasa() {
    setConsulta("casa");
    lastData();
  }

  function clickBotonUniversidad() {
    setConsulta("universidad");
    lastData();
  }

  return (

  <body style={{
    height: '750vh',
    width: '201.5vh',
    backgroundImage: `url(${require("../src/imagenes/bkg.png")})`,
  }}>

<div className="text-center" >

    <h1 style={{color: 'white', textShadow: '#d989b0 2px 2px 4px ', fontFamily: 'Garamond', fontSize: 60, fontWeight: 'bold'}}>Detección computacional de partículas por medio de una cámara de niebla de difusión continua</h1>
  
    <div style={{display: 'flex',
        justifyContent: 'center',
        fontFamily: 'Garamond', fontSize: 20
        }}>
      <Accordion defaultActiveKey="0" >
        <Accordion.Item onClick = {() => {
          Facc();
        }} eventKey={facc} style={{fontFamily: 'Garamond'}}>
            <Accordion.Header style={{fontFamily: 'Garamond'}}>Sobre el proyecto</Accordion.Header>
            <Accordion.Body >
            <h3 align="left">Resumen</h3>
            <p align="left">
            Partiendo de la construcción de una cámara de niebla de difusión continua y una muestra radiactiva de un electrodo de aleación tungsteno-torio al 2%, se computarizaron las condiciones ambientales mediante la construcción de un circuito utilizando un sensor de gases MQ-135, una fotoresistencia y un sensor de temperatura LM35, para determinar la concentración de alcohol, temperatura y nivel de iluminación. La detección de partículas se llevó a cabo usando Python 3.10.6 y Arduino IDE. Además, se implementó un código en Python para realizar el rastreo y conteo de las trazas de las partículas. Finalmente, se obtuvieron resultados exitosos logrando monitorizar las condiciones ambientales y la detección de partículas.
            </p>

            <img
                      className="d-block w-100"
                      src={require("../src/imagenes/poster.png")}
                    /> 
            
            </Accordion.Body>
        </Accordion.Item>
      </Accordion>

      <Accordion defaultActiveKey="2">
        <Accordion.Item  onClick= {() => {
          cargarDatos();
          Sacc();
        }} eventKey={sacc} style={{fontFamily: 'Garamond'}}>
              <Accordion.Header style={{fontFamily: 'Garamond'}}>Datos</Accordion.Header>
              <Accordion.Body>
              <Table striped bordered hover>
                <thead>
                  <tr style={{ backgroundColor: '#c7cad1' }}>
                    <th>Lugar</th>
                    <th>Temperatura (°C)</th>
                    <th>Concentración de Alcohol (mg/L)</th>
                    <th>Luz (Lux)</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    RayCosObj.map((Ray) => {
                      return(
                        <tr key={Ray._id}  style={{ backgroundColor: 'white' }}>
                          <td>{Ray.lugar}</td>
                          <td>{Ray.temperatura}</td>
                          <td>{Ray.saturacion}</td>
                          <td>{Ray.luz}</td>
                        </tr>

                      );
                    })
                  }
                </tbody>
              </Table>

              </Accordion.Body>
          </Accordion.Item>
      </Accordion>

      <Accordion defaultActiveKey="2">
      <Accordion.Item onClick= {() => {
          Tacc();
        }} eventKey = {tacc}>
            <Accordion.Header style={{fontFamily: 'Garamond'}}>Galeria</Accordion.Header>
            <Accordion.Body > 
            <Carousel>
        
              <Carousel.Item>
                <img
                      className="d-block w-100"
                      src={require("../src/imagenes/img1.png")}
                    /> 
                </Carousel.Item>

                <Carousel.Item>
                <img
                      className="d-block w-100"
                      src={require("../src/imagenes/img2.png")}
                    /> 
                </Carousel.Item>

                <Carousel.Item>
                <img
                      className="d-block w-100"
                      src={require("../src/imagenes/img3.png")}
                    /> 
                </Carousel.Item>

                <Carousel.Item>
                <img
                      className="d-block w-100"
                      src={require("../src/imagenes/img4.png")}
                    /> 
                </Carousel.Item>

                <Carousel.Item>
                <img
                      className="d-block w-100"
                      src={require("../src/imagenes/img5.png")}
                    /> 
                </Carousel.Item>

                <Carousel.Item>
                <img
                      className="d-block w-100"
                      src={require("../src/imagenes/img6.png")}
                    /> 
                </Carousel.Item>
          

          
              </Carousel>
            </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  </div>

  </body>
  );
}


export default App;
