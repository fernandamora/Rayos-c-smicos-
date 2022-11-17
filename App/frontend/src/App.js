import Carousel from 'react-bootstrap/Carousel';
import "bootstrap/dist/css/bootstrap.min.css";
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';


import {axiosInstance} from "../src/config/config"
import { useState } from "react";


function App() {

  const title = "Modificacion de menu";
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

  <div>

    <h1>Prueba</h1>
    <h4>Prueba 2</h4>

  <div>
    <h2>Datos:</h2>
    <h4>lugar: {lugar}</h4>
    <h4>temperatura: {temperatura}</h4>
    <h4>saturacion: {saturacion}</h4>
  </div>
    <Button variant="outline-info" onClick={clickBotonCasa}>Consultar último dato casa</Button>{' '}
    <Button variant="outline-info" onClick={clickBotonUniversidad}>Consultar último dato universidad</Button>{' '}
    <Button variant="outline-success" onClick={cargarDatos}>Consultar datos</Button>{' '}
    <Button variant="outline-dark" onClick={clickTodasCasa}>Consultar casa</Button>{' '}
    <Button variant="outline-dark" onClick={clickTodasUni}>Consultar universidad</Button>{' '}
    <div>
      <Accordion>
        <Accordion.Item eventKey='0'>
            <Accordion.Header>{title}</Accordion.Header>
            <Accordion.Body>
              <Carousel>
        
              <Carousel.Item>
                <img
                      className="d-block w-100"
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Cat_November_2010-1a.jpg/1200px-Cat_November_2010-1a.jpg"
                      alt="First slide"
                    />
                  <Carousel.Caption>
                    <h3>Gato</h3>
                    <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                  </Carousel.Caption>  
                </Carousel.Item>
          
                <Carousel.Item>
                <img
                      className="d-block w-100"
                      src="https://estaticos.muyinteresante.es/uploads/images/gallery/59bbb29c5bafe878503c9872/husky-siberiano-redes.jpg"
                      alt="Second slide"
                    />
                <Carousel.Caption>
                    <h3>Perro</h3>
                    <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                  </Carousel.Caption>   
              </Carousel.Item>
          
              </Carousel>

            </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey='1'>
            <Accordion.Header style={{ backgroundColor: 'pink' }}>Tabla</Accordion.Header>
            <Accordion.Body>
            <Table striped bordered hover>
              <thead>
                <tr style={{ backgroundColor: 'pink' }}>
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
                      <tr key={Ray._id}  style={{ backgroundColor: 'cyan' }}>
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

        <Accordion.Item eventKey='2'>
            <Accordion.Header>Acordion 2</Accordion.Header>
            <Accordion.Body style={{ backgroundColor: 'lightblue' }}>Esto esta dentro del acordion 2</Accordion.Body>
        </Accordion.Item>
      </Accordion>


    </div>
  </div>
  );
}


export default App;
