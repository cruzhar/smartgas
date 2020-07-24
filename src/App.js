import React, { Component } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
// import { fetchPost } from "./utils/Fetch";

import Login from "./components/Login";
import Navbar from "./components/Navbar/navbar";
import Inicio from "./components/Inicio";

//Catalogos
//Pilotos
import Pilotos from "./components/Catalogos/Pilotos";
import CrearPilotos from "./components/Catalogos/Pilotos/PilotosNuevo";
import EditarPiloto from "./components/Catalogos/Pilotos/PilotosEditar";


//Tipo unidad
import TipoUnidad from "./components/Catalogos/TipoUnidad";
import TipoUnidadNuevo from "./components/Catalogos/TipoUnidad/TipoUnidadNuevo";
import TipoUnidadEditar from "./components/Catalogos/TipoUnidad/TipoUnidadEditar";
//Empresa
import Empresa from "./components/Catalogos/Empresa";
import EmpresaNuevo from "./components/Catalogos/Empresa/EmpresaNuevo";
import EmpresaEditar from "./components/Catalogos/Empresa/EmpresaEditar";
//Tarjeta
import Tarjeta from "./components/Catalogos/Tarjeta";
import TarjetaNuevo from "./components/Catalogos/Tarjeta/TarjetaNuevo";
import TarjetaEditar from "./components/Catalogos/Tarjeta/TarjetaEditar";


import Acceso from "./components/Seguridad/Accesos";
import AccesoNuevo from "./components/Seguridad/Accesos/AccesoNuevo";
import AccesoEditar from "./components/Seguridad/Accesos/AccesoEditar";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { auth: false };
  }

  async componentDidMount() {
    await this.authenticateToken();
  }

  authenticateToken = async () => {
//     const data = await fetchPost(
//       `${process.env.REACT_APP_SERVER}/api/authenticateToken`,
//       this.state
//     );


// if(data)
//    { this.auth(data.data);}
//    else{
//     this.auth(false);
//    }
  
this.auth(true);

  };

  Access = (acceso) => {
    // const {
    //   auth: { roles },
    // } = this.state;
    // let resultadoBusqueda;
    // if(roles){
    //   roles.map((data, index) => {
    //     return data.accesses.map((acc, index_p) => {
    //       if (acc.name === acceso) {
    //         resultadoBusqueda = true;
    //         return true;
    //       } else {
    //         return false;
    //       }
    //     });
    //   });
    // }
    // else{
    //   return false;
    // }
  
    // return !!resultadoBusqueda;

    return this.state.auth;

  };

  auth = (auth) => {
    this.setState({
      auth,
    });
  };

  render() {
    const mensaje = this.state.auth ? (
      // `Bienvenido: ${this.state.auth.name}`
      `Bienvenido: Prueba de login`
    ) : (
      <Redirect to="/" />
    );

    return (
      <Router>
        <header className=" container-block App-header ">
          {/* {this.authenticateToken()} */}
          <Navbar auth={this.state.auth} authenticateToken={this.authenticateToken}   Access={this.Access}/>

          <p className="text-right">{mensaje}</p>
          <Switch>
          <Route exact path={`${process.env.PUBLIC_URL}/`} render={() => <Login auth={this.auth}   Access={this.Access}/>} />
          <Route exact path={`${process.env.PUBLIC_URL}/inicio`} render={() => <Inicio auth={this.auth}   Access={this.Access}/>} />
       
          {/* Catalogos*/}
          {/* Pilotos  */}
          <Route exact path={`${process.env.PUBLIC_URL}/pilotos`} render={() => <Pilotos Access={this.Access}/>} />
          <Route exact path={`${process.env.PUBLIC_URL}/pilotos/crear`} render={() => <CrearPilotos Access={this.Access}/>} />
          <Route exact path={`${process.env.PUBLIC_URL}/pilotos/detalle/:id`} render={() => <EditarPiloto modificar={false} Access={this.Access}/>} />
          <Route exact path={`${process.env.PUBLIC_URL}/pilotos/modificar/:id`} render={() => <EditarPiloto modificar={true} Access={this.Access}/>} />

          {/* Tipo Unidad */}
          <Route exact path={`${process.env.PUBLIC_URL}/tipounidad`} render={() => <TipoUnidad Access={this.Access}/>} />
          <Route exact path={`${process.env.PUBLIC_URL}/tipounidad/crear`} render={() => <TipoUnidadNuevo Access={this.Access}/>} />
          <Route exact path={`${process.env.PUBLIC_URL}/tipounidad/detalle/:id`} render={() => <TipoUnidadEditar modificar={false} Access={this.Access}/>} />
          <Route exact path={`${process.env.PUBLIC_URL}/tipounidad/modificar/:id`} render={() => <TipoUnidadEditar modificar={true} Access={this.Access}/>} />
          {/* Empresa  */}
          <Route exact path={`${process.env.PUBLIC_URL}/empresa`} render={() => <Empresa Access={this.Access}/>} />
          <Route exact path={`${process.env.PUBLIC_URL}/empresa/crear`} render={() => <EmpresaNuevo Access={this.Access}/>} />
          <Route exact path={`${process.env.PUBLIC_URL}/empresa/detalle/:id`} render={() => <EmpresaEditar  modificar={false} Access={this.Access}/>} />
          <Route exact path={`${process.env.PUBLIC_URL}/empresa/modificar/:id`} render={() => <EmpresaEditar modificar={true} Access={this.Access}/>} />
          {/* Acceso */}
          <Route exact path={`${process.env.PUBLIC_URL}/acceso`} render={() => <Acceso Access={this.Access}/>} />
          <Route exact path={`${process.env.PUBLIC_URL}/acceso/crear`} render={() => <AccesoNuevo Access={this.Access}/>} />
          <Route exact path={`${process.env.PUBLIC_URL}/acceso/detalle/:id`} render={() => <AccesoEditar  modificar={false} Access={this.Access}/>} />
          <Route exact path={`${process.env.PUBLIC_URL}/acceso/modificar/:id`} render={() => <AccesoEditar modificar={true} Access={this.Access}/>} />
          {/* Empresa  */}
          <Route exact path={`${process.env.PUBLIC_URL}/tarjeta`} render={() => <Tarjeta Access={this.Access}/>} />
          <Route exact path={`${process.env.PUBLIC_URL}/tarjeta/crear`} render={() => <TarjetaNuevo Access={this.Access}/>} />
          <Route exact path={`${process.env.PUBLIC_URL}/tarjeta/detalle/:id`} render={() => <TarjetaEditar modificar={false} Access={this.Access}/>} />
          <Route exact path={`${process.env.PUBLIC_URL}/tarjeta/modificar/:id`} render={() => <TarjetaEditar modificar={true} Access={this.Access}/>} />




         </Switch>
        </header>
      </Router>
    );
  }
}

export default App;
