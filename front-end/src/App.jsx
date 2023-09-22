import './App.css';
import { createBrowserRouter, RouterProvider, Route, createRoutesFromElements, Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element = {<Roote/>}></Route>
    )
  )
  return (
    <>
      <RouterProvider router={router}/>
    </>
  );
}

const Roote = () => {
  return (
    <div>
      <Navbar/>
      <div>
        <Outlet/>
      </div>
    </div>
  );
}

export default App;
