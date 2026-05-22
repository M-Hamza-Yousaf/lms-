import { useLocation } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar.jsx';
import Footer from './components/Footer/Footer.jsx';
import AppRoutes from './routes/AppRoutes.jsx';

function App() {
  const location = useLocation();
  const hideLayout = location.pathname.startsWith('/student') ||
                     location.pathname.startsWith('/teacher') ||
                     location.pathname.startsWith('/admin');

  return (
    <>
      {!hideLayout && <Navbar />}
      <AppRoutes />
      {!hideLayout && <Footer />}
    </>
  );
}

export default App;