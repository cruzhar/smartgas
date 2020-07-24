
  import React, { Component, Fragment } from "react";
  import { fetchGet, fetchPut } from "../../../utils/Fetch";
  import { withRouter, Redirect } from "react-router-dom";
  
  const initialState = {
    ID_ACCESO:"",
    NOMBRE_ACCESO:"",
    DESCRIPCION_ACCESO:"",
  };
  
  class AccesoEditar extends Component {
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
  
    async componentDidMount() {
      const { id } = this.props.match.params;
  
      const data = await fetchGet(
        `${process.env.REACT_APP_SERVER}/api/acceso/${id}`
      );
      this.setState({ ...data.data[0] });
    }

    Editaracceso = async (e) => {
      e.preventDefault();
  
      const data = await fetchPut(
        `${process.env.REACT_APP_SERVER}/api/acceso/${this.state.ID_ACCESO}`,
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
  
      const mensaje = this.props.modificar ? (
        "Editar acceso"
      ) : (
        "Detalles de acceso"
      );
      return (
        <Fragment>
          {redireccion}
          <h1 className="text-center mb-5">{mensaje}</h1>
  
          <div className="row justify-content-center">
            <form
              className="col-md-8 col-sm-12"
              onSubmit={(e) => this.Editaracceso(e)}
            >
              <div className="form-group">
                <label>Nombre:</label>
                <input
                  type="text"
                  name="NOMBRE_ACCESO"
                  className="form-control"
                  placeholder="Nombre de la acceso"
                  onChange={this.UpdateState}
                  readOnly={!this.props.modificar}
                  defaultValue={this.state.NOMBRE_ACCESO}
                />
              </div>
              <div className="form-group">
                <label>Descripcion:</label>
                <input
                  type="text"
                  name="DESCRIPCION_ACCESO"
                  className="form-control"
                  placeholder="Descripcion de la acceso"
                  onChange={this.UpdateState}
                  defaultValue={this.state.DESCRIPCION_ACCESO}
                  readOnly={!this.props.modificar}
                />
              </div>
              {this.props.modificar &&(
              <button
                disabled={this.validarForm()}
                type="submit"
                className="btn btn-success float-right"
              >
                Editar Acceso
              </button>
              )}
            </form>
          </div>
        </Fragment>
      );
    }
  }
  
  export default withRouter(AccesoEditar);
  