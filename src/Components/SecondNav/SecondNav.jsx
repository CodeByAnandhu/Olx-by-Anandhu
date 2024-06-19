import "./SecondNav.css"
import { useNavigate} from 'react-router-dom';


function SecondNav() {
  const navigate = useNavigate();
  return (
    <div>
      <div className=" nav  container-fluid d-flex justify-content-center align-items-center flex-wrap p-2">
       <ul className="d-flex justify-content-center align-items-center flex-wrap pt-3" style={{marginTop:"75px"}}>
        <li onClick={() => navigate('/')} className="me-5 category">ALL CATEGORIES  <i className="fa-solid fa-angle-down"></i></li>
        <li className="me-4">Cars</li>
        <li className="me-4">Motorcycles</li>
        <li className="me-4">Mobile Phones</li>
        <li className="me-4">For Sale: Houses & Apartments</li>
        <li className="me-4">Scooters</li>
        <li className="me-4">Commercial & Other Vehicles</li>
        <li className="me-4">For Rent: Houses & Apartments</li>
       </ul>
      </div>
    </div>
  )
}

export default SecondNav
