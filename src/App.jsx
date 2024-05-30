import ProductForm from "./components/Forms/ProductForm"
import 'bootstrap/dist/css/bootstrap.min.css';
import './components/CSS/ProductForm.css'
import './components/CSS/Table.css'
import './components/CSS/Header.css'
import './App.css'
import { Container, Row } from "react-bootstrap";
import Header from "./components/Header/Header";

function App() {

  return (
    <>
      <h1 className="heading text-center p-5">Employee Management CRUD</h1>

      <Row className="w-100">
        <Header />
      </Row>  
    
      <Row className="row d-flex align-content-center">
        {/* Header */}
        {/* Form */}
        <ProductForm />
      </Row>
    </>
  )
}

export default App
