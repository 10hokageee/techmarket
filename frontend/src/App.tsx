import { Outlet } from 'react-router-dom';
import './App.scss';
import { Header } from './shared/Header/Header';
import { Footer } from './shared/Footer/Footer';
import { Features } from './shared/Features/Features';

export const App = () => {
  return (
    <div className="App">
      <Header />
      <main className='main'>
        <Outlet />
      </main>

      <Features />
      <Footer />
    </div>
  );
};