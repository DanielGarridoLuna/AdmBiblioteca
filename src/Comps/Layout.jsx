import React from 'react';
import { useLocation } from 'react-router-dom';
import Barra from './Barra';

function Layout({ children }) {
  const location = useLocation();

  // Rutas donde no se debe mostrar la barra
  const rutasSinBarra = ['/login', '/ticket', '/cali', '/cobranza'];
  const mostrarBarra = !rutasSinBarra.includes(location.pathname);

  return (
    <div style={styles.container}>
      {mostrarBarra && (
        <div style={styles.barraWrapper}>
          <Barra />
        </div>
      )}
      <div style={styles.content}>
        <main style={styles.main}>{children}</main>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'row', // Cambiado a horizontal
    height: '100vh',
    width: '100vw',
  },
  barraWrapper: {
    width: 200, // Ajusta el ancho de la barra lateral
    minWidth: 60,
    background: '#fff',
   
    zIndex: 1000,
    height: '100vh',
    position: 'relative',
  },
  content: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    overflow: 'auto',
  },
  main: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    
  },
};

export default Layout;