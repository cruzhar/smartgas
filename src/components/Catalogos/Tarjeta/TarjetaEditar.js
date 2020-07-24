
  import React, { Component, Fragment } from "react";
  import { fetchPut,fetchGet } from "../../../utils/Fetch";
  import { withRouter, Redirect } from "react-router-dom";
  
  const initialState = {
    ID_TARJETA:""
  ,NUMERO_TARJETA:""
  ,DESCRIPCION_TARJETA:""
  ,ASIGNADA_TARJETA:""
  };
  
  class TarjetaEditar extends Component {
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
    
  async componentDidMount() {
    const { id } = this.props.match.params;

    const data = await fetchGet(
      `${process.env.REACT_APP_SERVER}/api/tarjeta/${id}`
    );
    this.setState({ ...data.data[0] });
  }
  
    EditarTarjeta = async (e) => {
      e.preventDefault();
  
      const data = await fetchPut(
        `${process.env.REACT_APP_SERVER}/api/tarjeta/${this.state.ID_TARJETA}`,
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

      const mensaje = this.props.modificar ? (
        "Editar Tarjeta"
      ) : (
        "Detalle Tipo Tarjeta"
      );
  
      return (
        <Fragment>
          {redireccion}
      <h1 className="text-center mb-5">{mensaje}</h1>

      <div className="row justify-content-center">
       <form
    className="col-md-8 col-sm-12"
    onSubmit={(e) => this.EditarTarjeta(e)}
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
        readOnly={!this.props.modificar} 
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
        readOnly={!this.props.modificar} 
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
        readOnly={!this.props.modificar} 
      />
    </div>

    
    <button
      disabled={this.validarForm()}
      type="submit"
      className="btn btn-success float-right"
    >
      Editar Tarjeta
    </button>
  </form>
</div>
        </Fragment>
      );
    }
  }
  
  export default withRouter(TarjetaEditar);
  