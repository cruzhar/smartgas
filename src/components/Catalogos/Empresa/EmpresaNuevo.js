import React, { Component, Fragment } from "react";
import { fetchPost } from "../../../utils/Fetch";
import { withRouter, Redirect } from "react-router-dom";

const initialState = {
  ID_EMPRESA:"",
  NOMBRE_EMPRESA:"",
  DIRECCION_EMPRESA:"",
  TELEFONO_EMPRESA:""
};

class EmpresaNuevo extends Component {
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
    const {NOMBRE_EMPRESA,
      DIRECCION_EMPRESA,
      TELEFONO_EMPRESA } = this.state;
    const noValido = !NOMBRE_EMPRESA || !DIRECCION_EMPRESA  || !TELEFONO_EMPRESA;
    return noValido;
  };

  CrearEmpresa = async (e) => {
    e.preventDefault();

    const data = await fetchPost(
      `${process.env.REACT_APP_SERVER}/api/empresa`,
      this.state
    );
    this.setState({ data: data.data });
    alert(data.message);
    this.props.history.push("/empresa");
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
        <h1 className="text-center mb-5">Nueva Empresa</h1>

        <div className="row justify-content-center">
          <form
            className="col-md-8 col-sm-12"
            onSubmit={(e) => this.CrearEmpresa(e)}
          >
            <div className="form-group">
              <label>Nombre:</label>
              <input
                type="text"
                name="NOMBRE_EMPRESA"
                className="form-control"
                placeholder="Nombre de la Empresa"
                onChange={this.UpdateState}
                defaultValue={this.state.NOMBRE_EMPRESA}
              />
            </div>
            <div className="form-group">
              <label>Dirección:</label>
              <input
                type="text"
                name="DIRECCION_EMPRESA"
                className="form-control"
                placeholder="Dirección de la empresa"
                onChange={this.UpdateState}
                defaultValue={this.state.DIRECCION_EMPRESA}
              />
            </div>
            <div className="form-group">
              <label>Telefono:</label>
              <input
                type="number"
                name="TELEFONO_EMPRESA"
                className="form-control"
                placeholder="Telefono de la empresa"
                onChange={this.UpdateState}
                defaultValue={this.state.TELEFONO_EMPRESA}
              />
            </div>
            <button
              disabled={this.validarForm()}
              type="submit"
              className="btn btn-success float-right"
            >
              Crear Empresa
            </button>
          </form>
        </div>
      </Fragment>
    );
  }
}

export default withRouter(EmpresaNuevo);
