import './App.css'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { NavBar } from './components/NavBar'
import { Rutas } from './routes/Rutas'


function App() {


  return (
    <>
      <Header/>

      <NavBar/>

      <main>
       <Rutas/>

      </main>

      
      <Footer/>
    </>
  )
}

export default App
