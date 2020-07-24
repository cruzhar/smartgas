import React, { Component, Fragment } from "react";
import { withRouter } from "react-router-dom";
// import { fetchPost } from "../../utils/Fetch";
// import Error from '../Alertas/Error';

const initialState = {
  user: "",
  password: "",
};

class Login extends Component {
  state = {
    ...initialState,
  };

  actualizarState = (e) => {
    const { name, value } = e.target;

    this.setState({
      [name]: value,
    });
  };

  limpiarState = () => {
    this.setState({ ...initialState });
  };

  iniciarSesion = async (e) => {
    e.preventDefault();
    // const data = await fetchPost(
    //   `${process.env.REACT_APP_SERVER}/api/auth`,
    //   this.state
    // );

    // if (data.data) {
    //   localStorage.setItem("token", data.token);
    //   this.props.auth(data.data);
    //   alert(`Datos de Acceso Correctos, Bienvenido ${data.data.name}`);
    //   setTimeout(() => {
    //     this.props.history.push("/client");
    //   }, 3000);
    // } else {
    //   alert("Datos de Acceso Incorrectos");
    // }



    this.props.auth(true);
      alert(`Datos de Acceso Correctos, Bienvenido Prueba Login`);
      setTimeout(() => {
        this.props.history.push("/inicio");
      }, 500);

  };

  validarForm = () => {
    const { user, password } = this.state;

    const noValido = !user || !password;

    return noValido;
  };
  render() {
    const { user, password } = this.state;

    return (
      <Fragment>
        <h1 className="text-center mb-5">Iniciar Sesión</h1>
        <div className="row  justify-content-center">
          <form onSubmit={(e) => this.iniciarSesion(e)} className="col-md-8">
            <div className="form-group">
              <label>Usuario</label>
              <input
                onChange={this.actualizarState}
                value={user}
                type="text"
                name="user"
                className="form-control"
                placeholder="Nombre Usuario"
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                onChange={this.actualizarState}
                value={password}
                type="password"
                name="password"
                className="form-control"
                placeholder="Password"
              />
            </div>

            <button
              disabled={this.validarForm()}
              type="submit"
              className="btn btn-success float-right"
            >
              Iniciar Sesión
            </button>
          </form>
        </div>
      </Fragment>
    );
  }
}

export default withRouter(Login);
