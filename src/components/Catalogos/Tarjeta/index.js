import React, { Component, Fragment } from "react";
import { fetchGet} from "../../../utils/Fetch";
import { Link, Redirect } from "react-router-dom";

const estadoInicial = { BuscarDatos: "", data: null };

class Tarjeta extends Component {
  constructor(props) {
    super(props);
    this.state = { data: estadoInicial };
  }

  Buscar = async () =>{
    const data = await fetchGet(`${process.env.REACT_APP_SERVER}/api/tarjeta`);
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
    const datos = this.state.data.filter((dat) => patt.exec(dat.NUMERO_TARJETA));

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
        <h1 className="text-center mb-5">Tarjeta</h1>
        <form class="form-inline " onSubmit={this.BuscarDatos}>
          <label className="ml-5 mr-5">
            <strong>Numero de Tarjeta:</strong>
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
            to={`${process.env.PUBLIC_URL}/tarjeta/crear`}
            className="btn btn-link  ml-5 mr-5"
          >
            Crear
          </Link>
        )}

        {this.state.dataFiltrada && (
          <div className="ml-5 mr-5">
            <div className="row border">
              <div className="col-sm-4 col-xs-4">Numero de Tarjeta</div>
              <div className="col-sm-4 col-xs-4 d-none d-sm-block">Descripcion Tarjeta</div>
              <div className="col-sm-4 col-xs-4">Tarjeta Asigna</div>
            </div>
            {this.state.dataFiltrada.map((item) => {
              const { ID_TARJETA } = item;
              return (
                <div className="row border" key={ID_TARJETA}>
                  <div className="col-sm-3 col-xs-3">{item.NUMERO_TARJETA}</div>
                  <div className="col-sm-3 col-xs-3 d-none d-sm-block">{item.DESCRIPCION_TARJETA}</div>
                  <div className="col-sm-3 col-xs-3 d-none d-sm-block">{item.ASIGANADA_TARJETA}</div>
                  <div className="col-sm-3 col-xs-3">
                
                    {this.props.Access("EditarAccesos")  && (
                      <Link
                        to={`${process.env.PUBLIC_URL}/tarjeta/modificar/${item.ID_TARJETA}`}
                        className="btn btn-warning m-1"
                      >
                        Modificar
                      </Link>
                    )}

                    {this.props.Access("EditarAccesos")  && (
                      <Link
                        to={`${process.env.PUBLIC_URL}/tarjeta/detalle/${item.ID_TARJETA}`}
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

export default Tarjeta;
