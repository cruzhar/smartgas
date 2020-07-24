import React, { Component, Fragment } from "react";
import { fetchPost } from "../../../utils/Fetch";
import { withRouter, Redirect } from "react-router-dom";

const initialState = {
  ID_TARJETA:""
  ,NUMERO_TARJETA:""
  ,DESCRIPCION_TARJETA:""
  ,ASIGNADA_TARJETA:""
};

class TarjetaNuevo extends Component {
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
    const { NUMERO_TARJETA,DESCRIPCION_TARJETA,ASIGNADA_TARJETA} = this.state;
    const noValido = !NUMERO_TARJETA|| ! DESCRIPCION_TARJETA || !ASIGNADA_TARJETA;
    return noValido;
  };

  CrearTarjeta = async (e) => {
    e.preventDefault();

    const data = await fetchPost(
      `${process.env.REACT_APP_SERVER}/api/tarjeta`,
      this.state
    );
    this.setState({ data: data.data });
    alert(data.message);
    this.props.history.push("/tarjeta");
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
        <h1 className="text-center mb-5">Nueva Tarjeta</h1>

        <div className="row justify-content-center">
          <form
            className="col-md-8 col-sm-12"
            onSubmit={(e) => this.CrearTarjeta(e)}
          >
            <div className="form-group">
              <label>Numero de Tarjeta:</label>
              <input
                type="text"
                name="NUMERO_TARJETA"
                className="form-control"
                placeholder="Numero de Tarjeta"
                onChange={this.UpdateState}
                defaultValue={this.state.NUMERO_TARJETA}
              />
            </div>

            <div className="form-group">
              <label>Descripcion de Tarjeta:</label>
              <input
                type="text"
                name="DESCRIPCION_TARJETA"
                className="form-control"
                placeholder="Descripcion Tarjeta"
                onChange={this.UpdateState}
                defaultValue={this.state.DESCRIPCION_TARJETA}
              />
            </div>
            <div className="form-group">
              <label>Asignada Tarjeta:</label>
              <input
                type="text"
                name="ASIGNADA_TARJETA"
                className="form-control"
                placeholder="Tarjeta Asignada"
                onChange={this.UpdateState}
                defaultValue={this.state.ASIGNADA_TARJETA}
              />
            </div>

            
            <button
              disabled={this.validarForm()}
              type="submit"
              className="btn btn-success float-right"
            >
              Crear Tarjeta
            </button>
          </form>
        </div>
      </Fragment>
    );
  }
}

export default withRouter(TarjetaNuevo);
