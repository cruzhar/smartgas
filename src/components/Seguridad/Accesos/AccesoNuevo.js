import React, { Component, Fragment } from "react";
import { fetchPost } from "../../../utils/Fetch";
import { withRouter, Redirect } from "react-router-dom";

const initialState = {
  ID_ACCESO:"",
  NOMBRE_ACCESO:"",
  DESCRIPCION_ACCESO:"",
};

class AccesoNuevo extends Component {
  state = {
    ...initialState,
  };

  clearState = () => {
    this.setState({
      ...initialState,
    });
  };

  UpdateState = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  validarForm = () => {
    const {NOMBRE_ACCESO,
      DESCRIPCION_ACCESO } = this.state;
    const noValido = !NOMBRE_ACCESO || !DESCRIPCION_ACCESO ;
    return noValido;
  };

  CrearAcceso = async (e) => {
    e.preventDefault();

    const data = await fetchPost(
      `${process.env.REACT_APP_SERVER}/api/acceso`,
      this.state
    );
    this.setState({ data: data.data });
    alert(data.message);
    this.props.history.push("/acceso");
  };

  render() {
    const redireccion = this.props.Access("GuardarAccesos") ? (
      ""
    ) : (
      <Redirect to="/" />
    );

    return (
      <Fragment>
        {redireccion}
        <h1 className="text-center mb-5">Nueva Acceso</h1>

        <div className="row justify-content-center">
          <form
            className="col-md-8 col-sm-12"
            onSubmit={(e) => this.CrearAcceso(e)}
          >
            <div className="form-group">
              <label>Nombre:</label>
              <input
                type="text"
                name="NOMBRE_ACCESO"
                className="form-control"
                placeholder="Nombre del acceso"
                onChange={this.UpdateState}
                defaultValue={this.state.NOMBRE_ACCESO}
              />
            </div>
            <div className="form-group">
              <label>Descripcion:</label>
              <input
                type="text"
                name="DESCRIPCION_ACCESO"
                className="form-control"
                placeholder="Descripcion del acceso"
                onChange={this.UpdateState}
                defaultValue={this.state.DESCRIPCION_ACCESO}
              />
            </div>
            
            <button
              disabled={this.validarForm()}
              type="submit"
              className="btn btn-success float-right"
            >
              Crear Acceso
            </button>
          </form>
        </div>
      </Fragment>
    );
  }
}

export default withRouter(AccesoNuevo);
