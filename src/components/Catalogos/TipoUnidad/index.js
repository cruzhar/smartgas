import React, { Component, Fragment } from "react";
import { fetchGet} from "../../../utils/Fetch";
import { Link, Redirect } from "react-router-dom";

const estadoInicial = { BuscarDatos: "", data: null };

class TipoUnidad extends Component {
  constructor(props) {
    super(props);
    this.state = { data: estadoInicial };
  }

  Buscar = async () =>{
    const data = await fetchGet(`${process.env.REACT_APP_SERVER}/api/tipounidad`);
    this.setState({ dataFiltrada: data.data, data: data.data});
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
    const datos = this.state.data.filter((dat) => patt.exec(dat.NOMBRE_TIPO_UNIDAD));

    this.setState({
      dataFiltrada: datos,
    });
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
        <h1 className="text-center mb-5">Tipo Unidad</h1>
        <form class="form-inline " onSubmit={this.BuscarDatos}>
          <label className="ml-5 mr-5">
            <strong>Nombre Tipo Unidad:</strong>
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
            to={`${process.env.PUBLIC_URL}/tipounidad/crear`}
            className="btn btn-link  ml-5 mr-5"
          >
            Crear
          </Link>
        )}

        {this.state.dataFiltrada && (
          <div className="ml-5 mr-5">
            <div className="row border">
              <div className="col-sm-4 col-xs-4">Nombre</div>
              <div className="col-sm-4 col-xs-4 d-none d-sm-block">Descripcion</div>
              <div className="col-sm-4 col-xs-4">Opciones</div>
            </div>
            {this.state.dataFiltrada.map((item) => {
              const { ID_TIPO_UNIDAD } = item;
              return (
                <div className="row border" key={ID_TIPO_UNIDAD}>
                  <div className="col-sm-4 col-xs-4">{item.NOMBRE_TIPO_UNIDAD}</div>
                  <div className="col-sm-4 col-xs-4 d-none d-sm-block">{item.DESCRIPCION_TIPO_UNIDAD}</div>
                  
                  <div className="col-sm-4 col-xs-4">
                
                    {this.props.Access("EditarAccesos")  && (
                      <Link
                        to={`${process.env.PUBLIC_URL}/tipounidad/modificar/${item.ID_TIPO_UNIDAD}`}
                        className="btn btn-warning m-1"
                      >
                        Modificar
                      </Link>
                    )}

                    {this.props.Access("EditarAccesos")  && (
                      <Link
                        to={`${process.env.PUBLIC_URL}/tipounidad/detalle/${item.ID_TIPO_UNIDAD}`}
                        className="btn btn-primary m-1"
                      >
                        Detalles
                      </Link>
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

export default TipoUnidad;
