import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Accordion } from 'react-bootstrap';
import '../App.css'; // Asegúrate de tener este archivo CSS para los estilos personalizados
import { getAuth, signOut } from 'firebase/auth';
import { useAuth } from '../BD/AuthContext';
import { collection, getDocs, query, where, updateDoc } from 'firebase/firestore';
import { db } from '../BD/firebase-config';
import { useNavigate, useLocation } from 'react-router-dom';

function Barra() {
  const navigate = useNavigate();

  const CerrarSesion = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        navigate('/login');
      })
      .catch((error) => {
        console.error('Error al cerrar sesión:', error);
      });
  };

 const handleNavigateToMaterial = (tipo) => {
    navigate('/material', { state: { tipo } });
  };

  return (

    <div className="bg-light border-end"

      style={{ width: '250px', minHeight: '250vh', position: 'fixed' }}>





      <Accordion className="custom-accordion">
        <Accordion.Item eventKey="0">
          <Accordion.Header>Material</Accordion.Header>
          <Accordion.Body>
            <ul className="list-group">
              <li className="list-group-item"  onClick={() => handleNavigateToMaterial('add')}>
                Subir Material
              </li>
              <li className="list-group-item" onClick={() => handleNavigateToMaterial('view')}>
                Buscar Material
              </li>
              <li className="list-group-item" onClick={() => handleNavigateToMaterial('modi')}>
                Modificar Material
              </li>
               <li className="list-group-item" onClick={() => handleNavigateToMaterial('dele')}>
                Borrar Material
              </li>
            </ul>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>

  



      <div className="my-5">

        <li className="btn btn-danger text-white my-2 w-100" onClick={CerrarSesion}>
          Cerrar Sesión
        </li>
      </div>




    </div>
  );
}

export default Barra;