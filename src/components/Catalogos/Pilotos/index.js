import React, { Component, Fragment } from "react";
import { fetchGet, fetchDelete } from "../../../utils/Fetch";
import { Link, Redirect } from "react-router-dom";

const estadoInicial = { BuscarDatos: "", data: null,estado:"Re Activar" };

class Pilotos extends Component {
  constructor(props) {
    super(props);
    this.state = { data: estadoInicial };
  }

  Buscar = async () =>{
    const data = await fetchGet(`${process.env.REACT_APP_SERVER}/api/piloto`);
    this.setState({ dataFiltrada: data.data, data: data.data,estado:"Re Activar" });
  }

   componentDidMount() {
   this.Buscar();
  }
  // cambioEstado = async (e) => {
  //  const data = await fetchGet(`${process.env.REACT_APP_SERVER}/api/piloto`);
  //   this.setState({ dataFiltrada: data.data, data: data.data });
  //   const { name, value } = e.target;
  //   this.setState({
  //     [name]: value,
  //   });
  // };

  BuscarDatos = (e) => {
    e.preventDefault();
    const patt = new RegExp(`${this.state.BuscarDatos}`, "gi");
    const datos = this.state.data.filter((dat) => patt.exec(dat.NOMBRE_PILOTO));

    this.setState({
      dataFiltrada: datos,
    });
  };

  Eliminar = async (ID_PILOTO) => {
    const data = await fetchDelete(
      `${process.env.REACT_APP_SERVER}/api/piloto/${ID_PILOTO}/${false}`
    );
    alert(data.message);
    const dataGet = await fetchGet(
      `${process.env.REACT_APP_SERVER}/api/piloto`
    );
    this.setState({ dataFiltrada: dataGet.data, data: dataGet.data });
  };


  ActivoReactivo =  (e) => {
    e.preventDefault();
    console.log(this.state.estado,"Re Activar")
  if(this.state.estado==="Re Activar")
{
this.Inactivos();
}
else{
  this.Buscar();
}
  };


  Reactivar = async (ID_PILOTO) => {
    const data = await fetchDelete(
      `${process.env.REACT_APP_SERVER}/api/piloto/${ID_PILOTO}/${true}`
    );
    alert(data.message);
   this.Inactivos();
  };

  Inactivos = async () => {
  const data = await fetchGet(`${process.env.REACT_APP_SERVER}/api/piloto/inactivo`);
  this.setState({ dataFiltrada: data.data, data: data.data,estado:"Activos"  });
};

cambioEstado = (e) => {
  const { name, value } = e.target;
  this.setState({
    [name]: value,
  });
};
  render() {
    const redireccion = this.props.Access("VerAccesos") ? (
      ""
    ) : (
      <Redirect to="/" />
    );

    return (
      <Fragment>
        {redireccion}
        <h1 className="text-center mb-5">Pilotos</h1>
        <form class="form-inline " onSubmit={this.BuscarDatos}>
          <label className="ml-5 mr-5">
            <strong>Nombre/Clte:</strong>
          </label>
          <input
            class="form-control mr-sm-5"
            type="search"
            name="BuscarDatos"
            onChange={this.cambioEstado}
            defaultValue={this.state.BuscarDatos}
            placeholder=""
            aria-label="Search"
          />
          <button class="btn btn-outline-dark my-2 my-sm-0" type="submit">
            Buscar
          </button>
        </form>

        {this.props.Access("GuardarAccesos") && (
          <Link
            to={`${process.env.PUBLIC_URL}/pilotos/crear`}
            className="btn btn-link  ml-5 mr-5"
          >
            Crear
          </Link>
        )}

        {this.props.Access("GuardarAccesos") && (
          <button 
          onClick={this.ActivoReactivo}
          className="btn btn-link  float-right  ml-5 mr-5">
           {
             this.state.estado
           } 

          </button>
        )}

        {this.state.dataFiltrada && (
          <div className="ml-5 mr-5">
            <div className="row border">
            {/* d-sm-none d-md-none d-lg-block */}
              <div className="col-md-2">Pilotos</div>
              <div className="col-md-2    d-none      d-sm-none d-md-block d-lg-blocK">TELEFONO</div>
              <div className="col-md-2 d-none   d-sm-none d-md-block d-lg-block">DNI</div>
              <div className="col-md-2 d-none  d-sm-none d-md-block d-lg-blocK">TIPO LICENCIA</div>
              <div className="col-md-2 d-none  d-sm-none d-md-block d-lg-blocK" >EMPRESA</div>
              {/* d-none  d-sm-none d-md-none d-lg-block */}
              <div className="col-md-2">Opciones</div>
            </div>
            {this.state.dataFiltrada.map((item) => {
              const { ID_PILOTO } = item;
              return (
                <div className="row border" key={ID_PILOTO}>
                  <div className="col-md-2">{item.NOMBRE_PILOTO}</div>
                  <div className="col-md-2">{item.TELEFONO_PILOTO}</div>
                  <div className="col-md-2  d-none d-sm-none d-md-block d-lg-block">{item.DNI_PILOTO}</div>
                  <div className="col-md-2 d-none d-sm-none d-md-block d-lg-block">{item.TIPO_LICENCIA}</div>
                  <div className="col-md-2  d-none d-sm-none d-md-block d-lg-block" >{item.ID_EMPRESA}</div>
                  
                  <div className="col-md-2">
                
                    {this.props.Access("EditarAccesos") && item.ESTADO && (
                      <Link
                        to={`${process.env.PUBLIC_URL}/pilotos/modificar/${item.ID_PILOTO}`}
                        className="btn btn-warning m-1"
                      >
                        Modificar
                      </Link>
                    )}

                    {this.props.Access("EditarAccesos")  && item.ESTADO&& (
                      <Link
                        to={`${process.env.PUBLIC_URL}/pilotos/detalle/${item.ID_PILOTO}`}
                        className="btn btn-primary"
                      >
                        Detalles
                      </Link>
                    )}
                    {this.props.Access("EliminarAccesos")  && item.ESTADO&& (
                      <button
                        onClick={() => {
                          if (window.confirm("Seguro que deseas el piloto")) {
                            this.Eliminar(item.ID_PILOTO);
                          }
                        }}
                        type="button"
                        className="btn btn-danger m-1 "
                      >
                        &times; Eliminar
                      </button>
                    )}

                    {this.props.Access("EliminarAccesos")  && !item.ESTADO && (
                      <button
                        onClick={() => {
                          if (window.confirm("Seguro que deseas el piloto")) {
                            this.Reactivar(item.ID_PILOTO);
                          }
                        }}
                        type="button"
                        className="btn btn-danger m-1 "
                      >
                        &times; Activar
                      </button>
                    )}

                  </div>
                  {/* </td> */}
                  {/* </tr> */}
                </div>
              );
            })}
          </div>
        )}
      </Fragment>
    );
  }
}

export default Pilotos;
