import React, { Component, Fragment } from "react";
import { withRouter,Redirect, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
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
        this.props.history.push("/");
      }, 3000);

  };

  validarForm = () => {
    const { user, password } = this.state;

    const noValido = !user || !password;

    return noValido;
  };
  render() {
    const redireccion = this.props.Access("VerClientes") ? (
      ""
    ) : (
      <Redirect to="/" />
    );


    return (
      <Fragment>
       {redireccion}
       <div className="jumbotron">
            <div className="container">
                <h1 className="display-3">SMART GAS </h1>
                <p>
                    Acceso para clientes registrados.
                    <br/>
                </p>
               </div>
        </div>


       <div id="slider" className="carousel slide" data-ride="carousel">
     <ol className="carousel-indicators">
         <li data-target="#slider" data-slide-to="0" className="active"></li>
         <li data-target="#slider" data-slide-to="1"></li>
         <li data-target="#slider" data-slide-to="2"></li>
     </ol>
     <div className="carousel-inner">
         <div className="carousel-item active">
             <img className="img-fluid" src="https://blog.nubecolectiva.com/wp-content/uploads/2019/10/img_destacada_blog_devs-5-930x360.png" alt="problemas de carga"/>
             <div className="elementos">
                 <a className="btn btn-lg btn-primary" rel="noopener noreferrer" href="https://blog.nubecolectiva.com/proteccion-de-rutas-o-vistas-mediante-contrasena-en-laravel-6-2/" target="_blank" role="button">Leer más</a>
             </div>
         </div>
         <div className="carousel-item">
             <img className="img-fluid" src="https://blog.nubecolectiva.com/wp-content/uploads/2019/08/edit_img_destacada_blog_devs-930x360.png" alt="problemas de carga"/>
             <div className="elementos">
                 <a className="btn btn-lg btn-primary" rel="noopener noreferrer" href="https://blog.nubecolectiva.com/5-tips-para-mejorar-la-ux-experiencia-del-usuario-de-un-menu-web-creado-con-bootstrap-4" target="_blank" role="button">Leer más</a>
             </div>
         </div>
         <div className="carousel-item">
             <img className="img-fluid" src="https://blog.nubecolectiva.com/wp-content/uploads/2019/10/edit_img_destacada_blog_devs-3-930x360.png" alt="problemas de carga"/>
             <div className="elementos">
                 <a className="btn btn-lg btn-primary" rel="noopener noreferrer" href="https://blog.nubecolectiva.com/como-crear-animaciones-en-android-trasladar-elemento-en-eje-x-y-java/" target="_blank" role="button">Leer más</a>
             </div>
         </div>
     </div>
     <a className="carousel-control-prev" href="#slider" role="button" data-slide="prev">
         <span className="carousel-control-prev-icon" aria-hidden="true"></span>
         <span className="sr-only">Previous</span>
     </a>
     <a className="carousel-control-next" href="#slider" role="button" data-slide="next">
         <span className="carousel-control-next-icon" aria-hidden="true"></span>
         <span className="sr-only">Next</span>
     </a>
 </div>

 <div className="container servicios">
 
 <div className="row">

     <div className="col-lg-4">
         <svg className="bd-placeholder-img rounded-circle" width="140" height="140" xmlns="https://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" focusable="false" role="img" aria-label="Placeholder: 140x140">
             <title>Placeholder</title>
             <rect width="100%" height="100%" fill="#777" />
             <text x="50%" y="50%" fill="#777" dy=".3em">140x140</text>
         </svg>
         <h2>Servicio 1</h2>
         <p>Donec sed odio dui. Etiam porta sem malesuada magna mollis euismod. Nullam id dolor id nibh ultricies vehicula ut id elit. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Praesent commodo cursus magna.</p>
         <p><Link className="btn btn-secondary" to="#" role="button">Leer más &raquo;</Link></p>
     </div>

     <div className="col-lg-4">
         <svg className="bd-placeholder-img rounded-circle" width="140" height="140" xmlns="https://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" focusable="false" role="img" aria-label="Placeholder: 140x140">
             <title>Placeholder</title>
             <rect width="100%" height="100%" fill="#777" />
             <text x="50%" y="50%" fill="#777" dy=".3em">140x140</text>
         </svg>
         <h2>Servicio 2</h2>
         <p>Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Cras mattis consectetur purus sit amet fermentum. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh.</p>
         <p><Link className="btn btn-secondary" to="#" role="button">Leer más &raquo;</Link></p>
     </div>

     <div className="col-lg-4">
         <svg className="bd-placeholder-img rounded-circle" width="140" height="140" xmlns="https://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" focusable="false" role="img" aria-label="Placeholder: 140x140">
             <title>Placeholder</title>
             <rect width="100%" height="100%" fill="#777" />
             <text x="50%" y="50%" fill="#777" dy=".3em">140x140</text>
         </svg>
         <h2>Servicio 3</h2>
         <p>Donec sed odio dui. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Vestibulum id ligula porta felis euismod semper. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus.</p>
         <p><Link className="btn btn-secondary" to="#" role="button">Leer más &raquo;</Link></p>
     </div>
 </div>

</div>


      </Fragment>
    );
  }
}

export default withRouter(Login);
