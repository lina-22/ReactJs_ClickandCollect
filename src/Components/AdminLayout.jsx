import axios from "axios";
import { useContext, useEffect } from "react";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

import { Outlet } from "react-router-dom";
import { LOG_OUT, SET_USER } from "../actionTypes";
import { AuthContext } from "../contexts";
import { BACKEND_URL } from "../utils";
import logout from '../images/logout.png';

// import MyNavbar from "./NavbarAdmin";
// import Footer from "./Footer";
function AdminLayout() {
  const { auth, authDispatch } = useContext(AuthContext);
  const navigate = useNavigate();
  const logOutHandler = ()=>{
    authDispatch({type:LOG_OUT})
} 
  useEffect(() => {
    if (!auth.user) {
      axios
        .get(`${BACKEND_URL}/profile`)
        .then((res) => {
          const { status, data, message } = res.data;
          if (status) {
            authDispatch({
              type: SET_USER,
              payload: data,
            });
          } else {
            navigate("/login");
          }
        })
        .catch((err) => {
          console.log(err);
          navigate("/login");
        });
    } else {
      if (![1, 2].includes(auth.user.role_id)) {
        navigate("/");
      }
    }
  }, [auth.user]);

  return (
    <div className="mainAdmin">
      {/* <MyNavbar /> */}
      <h1 id="admin">Admin Dashbord</h1>
      <section className="panier_logo">

            {
              auth.user && <img style={{width: 25, cursor: "pointer", marginLeft: 10}} onClick={logOutHandler} title="Log Out" src={logout} alt="" />
            }
          
          </section> 
      <Navbar bg="light" expand="lg" className="py-4 my-4">
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Item>
                <Link className="nav-link mx-3" to="/admin">
                  {" "}
                  Dashboard{" "}
                </Link>
              </Nav.Item>
              <Nav.Item>
                <Link className="nav-link mx-3" to="/">
                  {" "}
                  Accueil{" "}
                </Link>
              </Nav.Item>
              <Nav.Item>
                <Link className="nav-link mx-3" to="/admin/category">
                  Category
                </Link>
              </Nav.Item>

              <Nav.Item>
                <Link className="nav-link mx-3" to="/admin/product">
                  Product
                </Link>
              </Nav.Item>
              <Nav.Item>
                <Link className="nav-link mx-3" to="/admin/product_availables">
                  ProductAvailable
                </Link>
              </Nav.Item>
              <Nav.Item>
                <Link className="nav-link mx-3" to="">
                  ProductLine
                </Link>
              </Nav.Item>
              <Nav.Item>
                <Link className="nav-link mx-3" to="">
                  Reservation
                </Link>
              </Nav.Item>
              <Nav.Item>
                <Link className="nav-link mx-3" to="">
                  Users
                </Link>
              </Nav.Item>
            </Nav>
          </Navbar.Collapse>
        </Navbar>

      {/* <MyNavbar /> */}
      <Outlet />
      {/* <Footer /> */}
    </div>
  );
}

export default AdminLayout;
