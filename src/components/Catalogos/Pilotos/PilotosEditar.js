import React, { Component, Fragment } from "react";
import { fetchGet, fetchPut } from "../../../utils/Fetch";
import { withRouter, Redirect } from "react-router-dom";

const initialState = {
  NOMBRE_PILOTO: "",
  ESTADO: true,
};

class EditarPiloto extends Component {
  state = {
    ...initialState,
  };

  clearState = () => {
    this.setState({
      ...initialState,
    });
  };


  async componentDidMount() {
    const { id } = this.props.match.params;

    const data = await fetchGet(
      `${process.env.REACT_APP_SERVER}/api/piloto/${id}`
    );
    this.setState({ ...data.data[0] });
  }
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

  autilizarPiloto = async (e) => {
    e.preventDefault();

    const data = await fetchPut(
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
    const mensaje = this.props.modificar ? (
      "Editar Piloto"
    ) : (
     "Detalle de Piloto"
    );
    return (
      <Fragment>
        {redireccion}
        <h1 className="text-center mb-5">{mensaje}</h1>

        <div className="row justify-content-center">
          <form
            className="col-md-8 col-sm-12"
            onSubmit={(e) => this.autilizarPiloto(e)}
          >
            <div className="form-group">
              <label>Nombre:</label>
              <input
                type="text"
                name="NOMBRE_PILOTO"
                className="form-control"
                placeholder="Nombre del Piloto"
                onChange={this.UpdateState}
                  readOnly={!this.props.modificar}
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
                  readOnly={!this.props.modificar}
                defaultValue={this.state.DIRECCION_PILOTO}
              />
            </div>  <div className="form-group">
              <label>Telefono:</label>
              <input
                type="number"
                name="TELEFONO_PILOTO"
                className="form-control"
                placeholder="Telefono del Piloto"
                  readOnly={!this.props.modificar}
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
                readOnly={!this.props.modificar}

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
                readOnly={!this.props.modificar}

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
                  readOnly={!this.props.modificar}
                onChange={this.UpdateState}
                defaultValue={this.state.ID_EMPRESA}
              />
            </div>
            {this.props.modificar &&(
            
            <button
              disabled={this.validarForm()}
              type="submit"
              className="btn btn-success float-right"
            >
              Editar Piloto
            </button>)}
          </form>
        </div>
      </Fragment>
    );
  }
}

export default withRouter(EditarPiloto);

