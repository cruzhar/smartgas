import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";

class navbar extends Component {
  state = {};
  UpdateState = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  cerrarsesion = async () => {
    await localStorage.removeItem("token", "");
    this.props.authenticateToken();
    this.props.history.push("/");
  };
  render() {
    return (
      <nav className=" navbar  navbar-expand-lg navbar-dark bg-dark">
        <Link to={`${process.env.PUBLIC_URL}/inicio`} className="navbar-brand">
          Smart Gas
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          {this.props.auth && (
            <ul className="navbar-nav mr-auto">
              {this.props.Access("VerClientes") && (
                <li className="nav-item ">
                  <Link
                    to={`${process.env.PUBLIC_URL}/inicio`}
                    className="nav-link"
                  >
                    Inicio
                  </Link>
                </li>
              )}
              <li className="nav-item dropdown">
                <div className="dropdown">
                  <button
                    class="btn nav-link dropdown-toggle"
                    type="button"
                    id="dropdownMenuButton"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    Seguridad
                  </button>
                  <div
                    className="dropdown-menu"
                    aria-labelledby="dropdownMenuButton"
                  >
                    {this.props.Access("VerTiposDeClientes") && (
                      <Link
                        to={`${process.env.PUBLIC_URL}/acceso`}
                        className="dropdown-item"
                      >
                      Acceso
                      </Link>
                    )}
                  </div>
                </div>
              
              </li>
              <li className="nav-item dropdown">
                <div className="dropdown">
                  <button
                    class="btn nav-link dropdown-toggle"
                    type="button"
                    id="dropdownMenuButton"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    Catalogos
                  </button>
                  <div
                    className="dropdown-menu"
                    aria-labelledby="dropdownMenuButton"
                  >
                    {this.props.Access("VerTiposDeClientes") && (
                      <Link
                        to={`${process.env.PUBLIC_URL}/inicio`}
                        className="dropdown-item"
                      >
                      Combustible
                      </Link>
                    )}
                    {this.props.Access("VerRoles") && (
                      <Link
                        to={`${process.env.PUBLIC_URL}/inicio`}
                        className="dropdown-item"
                      >
                        Estaciones
                      </Link>
                    )}
                    {this.props.Access("VerAccesos") && (
                      <Link
                        to={`${process.env.PUBLIC_URL}/inicio`}
                        className="dropdown-item"
                      >
                        Terminales POS
                      </Link>
                    )}
                    <div className="dropdown-divider" />
                    {this.props.Access("VerAccesos") && (
                      <Link
                        to={`${process.env.PUBLIC_URL}/inicio`}
                        className="dropdown-item"
                      >
                        Clientes
                      </Link>
                    )}
                    {this.props.Access("VerAccesos") && (
                      <Link
                        to={`${process.env.PUBLIC_URL}/inicio`}
                        className="dropdown-item"
                      >
                       Tarjetas RFID
                      </Link>
                    )}
                    <div className="dropdown-divider" />
                    {this.props.Access("VerAccesos") && (
                      <Link
                        to={`${process.env.PUBLIC_URL}/pilotos`}
                        className="dropdown-item"
                      >
                       Pilotos
                      </Link>
                    )}
                    {this.props.Access("VerAccesos") && (
                      <Link
                        to={`${process.env.PUBLIC_URL}/inicio`}
                        className="dropdown-item"
                      >
                       Unidades
                      </Link>
                    )}
                    {this.props.Access("VerAccesos") && (
                      <Link
                        to={`${process.env.PUBLIC_URL}/tipounidad`}
                        className="dropdown-item"
                      >
                       Tipo Unidad
                      </Link>
                    )}
                    {this.props.Access("VerAccesos") && (
                      <Link
                        to={`${process.env.PUBLIC_URL}/empresa`}
                        className="dropdown-item"
                      >
                       Empresa
                      </Link>
                    )}

                      {this.props.Access("Tarjetas") && (
                      <Link
                        to={`${process.env.PUBLIC_URL}/tarjeta`}
                        className="dropdown-item"
                      >
                       Tarjeta
                      </Link>
                    )}

                  </div>
                </div>
              
              </li>
              <li className="nav-item dropdown">
                <div className="dropdown">
                  <button
                    class="btn nav-link dropdown-toggle"
                    type="button"
                    id="dropdownMenuButton"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    Operaciones
                  </button>
                  <div
                    className="dropdown-menu"
                    aria-labelledby="dropdownMenuButton"
                  >
                    {this.props.Access("VerTiposDeClientes") && (
                      <Link
                        to={`${process.env.PUBLIC_URL}/inicio`}
                        className="dropdown-item"
                      >
                       Entrega de Tarjetas
                      </Link>
                    )}
                    {this.props.Access("VerRoles") && (
                      <Link
                        to={`${process.env.PUBLIC_URL}/inicio`}
                        className="dropdown-item"
                      >
                        Autorizaciones
                      </Link>
                    )}
                    <div className="dropdown-divider" />
                    {this.props.Access("VerAccesos") && (
                      <Link
                        to={`${process.env.PUBLIC_URL}/inicio`}
                        className="dropdown-item"
                      >
                        Despachos de Combustibles
                      </Link>
                    )}
                    {this.props.Access("VerAccesos") && (
                      <Link
                        to={`${process.env.PUBLIC_URL}/inicio`}
                        className="dropdown-item"
                      >
                        Despachos de Combustibles (manual)
                      </Link>
                    )}
                    {this.props.Access("VerAccesos") && (
                      <Link
                        to={`${process.env.PUBLIC_URL}/inicio`}
                        className="dropdown-item"
                      >
                        Despachos Reversión
                      </Link>
                    )}
                    {this.props.Access("VerAccesos") && (
                      <Link
                        to={`${process.env.PUBLIC_URL}/inicio`}
                        className="dropdown-item"
                      >
                        Visualizar Consumo
                      </Link>
                    )}
                  </div>
                </div>
              
              </li>
            </ul>
          )}
        </div>
      </nav>
    );
  }
}

export default withRouter(navbar);
