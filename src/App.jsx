import { Provider } from 'react-redux';
import store from './redux/store';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Students from './pages/Students';
import AddStudent from './pages/AddStudent';
import Login from './pages/Login';
import FAQ from './pages/FAQ';
import Achievements from './pages/Achievements';
import Programs from './pages/Programs';
import Gallery from './pages/Gallery';
import Staff from './pages/Staff';
import News from './pages/News';
import Contact from './pages/Contact';
import Layout from './components/Layout';
import NotFound from './pages/NotFound';
import { ToastContainer } from 'react-toastify';
import StudentDashboard from './components/StudentDashboard';

function App() {
  return (
<Provider store={store}>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/students" element={<Students />} />
            <Route path="/add-student" element={<AddStudent />} />
            <Route path="/login" element={<Login />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/achievements" element={<Achievements />} />
            <Route path="/programs" element={<Programs />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/staff" element={<Staff />} />
            <Route path="/news" element={<News />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/Dashboard" element={<StudentDashboard />} />
            {/* erro page */}
            <Route path="*" element={<NotFound/>} />
          </Routes>
        </Layout>
      </Router>
      <ToastContainer position="top-right" autoClose={3000} />
    </Provider>
  );
}

export default App;
