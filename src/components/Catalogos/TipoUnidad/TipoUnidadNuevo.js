import React, { Component, Fragment } from "react";
import { fetchPost } from "../../../utils/Fetch";
import { withRouter, Redirect } from "react-router-dom";

const initialState = {
  ID_TIPO_UNIDAD:""
  ,NOMBRE_TIPO_UNIDAD:""
  ,DESCRIPCION_TIPO_UNIDAD:""
};

class TipoUnidadNuevo extends Component {
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
    const {NOMBRE_TIPO_UNIDAD,DESCRIPCION_TIPO_UNIDAD} = this.state;
    const noValido = !NOMBRE_TIPO_UNIDAD || ! DESCRIPCION_TIPO_UNIDAD;
    return noValido;
  };

  CrearTipoUnidad = async (e) => {
    e.preventDefault();

    const data = await fetchPost(
      `${process.env.REACT_APP_SERVER}/api/tipounidad`,
      this.state
    );
    this.setState({ data: data.data });
    alert(data.message);
    this.props.history.push("/tipounidad");
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
        <h1 className="text-center mb-5">Nuevo Tipo Unidad</h1>

        <div className="row justify-content-center">
          <form
            className="col-md-8 col-sm-12"
            onSubmit={(e) => this.CrearTipoUnidad(e)}
          >
            <div className="form-group">
              <label>Nombre:</label>
              <input
                type="text"
                name="NOMBRE_TIPO_UNIDAD"
                className="form-control"
                placeholder="Nombre del Tipo Unidad"
                onChange={this.UpdateState}
                defaultValue={this.state.NOMBRE_TIPO_UNIDAD}
              />
            </div>

            <div className="form-group">
              <label>Descripcion:</label>
              <input
                type="text"
                name="DESCRIPCION_TIPO_UNIDAD"
                className="form-control"
                placeholder="Descripcion"
                onChange={this.UpdateState}
                defaultValue={this.state.DESCRIPCION_TIPO_UNIDAD}
              />
            </div>

            
            <button
              disabled={this.validarForm()}
              type="submit"
              className="btn btn-success float-right"
            >
              Crear Tipo Unidad
            </button>
          </form>
        </div>
      </Fragment>
    );
  }
}

export default withRouter(TipoUnidadNuevo);
