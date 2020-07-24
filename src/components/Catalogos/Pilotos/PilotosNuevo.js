import React, { Component, Fragment } from "react";
import { fetchPost } from "../../../utils/Fetch";
import { withRouter, Redirect } from "react-router-dom";

const initialState = {
  NOMBRE_PILOTO: "",
  ESTADO: true,
};

class CrearPiloto extends Component {
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
    const {NOMBRE_PILOTO,DIRECCION_PILOTO,ID_EMPRESA,
      TELEFONO_PILOTO,
      DNI_PILOTO,
      TIPO_LICENCIA } = this.state;
    const noValido = !NOMBRE_PILOTO ||!DIRECCION_PILOTO ||!ID_EMPRESA ||!TELEFONO_PILOTO
     ||!DNI_PILOTO ||!TIPO_LICENCIA;
    return noValido;
  };

  CreateCrearPiloto = async (e) => {
    e.preventDefault();

    const data = await fetchPost(
      `${process.env.REACT_APP_SERVER}/api/piloto`,
      this.state
    );
    this.setState({ data: data.data });
    alert(data.message);
    this.props.history.push("/pilotos");
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
        <h1 className="text-center mb-5">Nuevo Piloto</h1>

        <div className="row justify-content-center">
          <form
            className="col-md-8 col-sm-12"
            onSubmit={(e) => this.CreateCrearPiloto(e)}
          >
            <div className="form-group">
              <label>Nombre:</label>
              <input
                type="text"
                name="NOMBRE_PILOTO"
                className="form-control"
                placeholder="Nombre del Piloto"
                onChange={this.UpdateState}
                defaultValue={this.state.NOMBRE_PILOTO}
              />
            </div>
            <div className="form-group">
              <label>Direccion:</label>
              <input
                type="text"
                name="DIRECCION_PILOTO"
                className="form-control"
                placeholder="Nombre del Piloto"
                onChange={this.UpdateState}
                defaultValue={this.state.DIRECCION_PILOTO}
              />
            </div>  <div className="form-group">
              <label>Telefono:</label>
              <input
                type="number"
                name="TELEFONO_PILOTO"
                className="form-control"
                placeholder="Telefono del Piloto"
                onChange={this.UpdateState}
                defaultValue={this.state.TELEFONO_PILOTO}
              />
            </div>  <div className="form-group">
              <label>DNI_PILOTO:</label>
              <input
                type="text"
                name="DNI_PILOTO"
                className="form-control"
                placeholder="DNI del Piloto"
                onChange={this.UpdateState}
                defaultValue={this.state.DNI_PILOTO}
              />
            </div>  <div className="form-group">
              <label>Tipo de Licencia:</label>
              <input
                type="text"
                name="TIPO_LICENCIA"
                className="form-control"
                placeholder="Tipo de licencia del Piloto"
                onChange={this.UpdateState}
                defaultValue={this.state.TIPO_LICENCIA}
              />
            </div>
            <div className="form-group">
              <label>Empresa:</label>
              <input
                type="text"
                name="ID_EMPRESA"
                className="form-control"
                placeholder="Empresa del Piloto"
                onChange={this.UpdateState}
                defaultValue={this.state.ID_EMPRESA}
              />
            </div>
            <button
              disabled={this.validarForm()}
              type="submit"
              className="btn btn-success float-right"
            >
              Crear Piloto
            </button>
          </form>
        </div>
      </Fragment>
    );
  }
}

export default withRouter(CrearPiloto);
