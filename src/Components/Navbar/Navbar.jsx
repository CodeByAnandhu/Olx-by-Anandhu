
import "./Navbar.css"
import olxLogo from '/public/OLX_green_logo.svg'
import { logout } from '../../FireBase';
import { useUser } from '../../UserContext';
import { useState } from "react";
import { useNavigate  } from 'react-router-dom';
function Navbar() {

  const navigate = useNavigate()

  const { user } = useUser();
  console.log("user" , user)

  const [isActiveDropDown , setIsActive] = useState(false);

  const handleState = () =>{

    if(isActiveDropDown){
      setIsActive(false);
    }else{
      setIsActive(true);
    }

  }
  


  
  return (

     
    
      <nav className="navbar bg-body-tertiary" style={{position:"fixed", zIndex:"100", width:"100%", height:"120px", marginTop:"-43px"}}>
        <div className="container-fluid">
          <img className="olxLogo" src={olxLogo} alt="" />
          <div className=" col-2 dropdown  dropdown-div ">
          <i className="fa-solid fa-magnifying-glass"></i> <button 
              className="btn contryBox  dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            > 
           
              India
            </button>
            <ul className="dropdown-menu">
              <li>
                <a className="dropdown-item" href="#">
                  Kerala
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  Tamilnadu
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  Karnadaka
                </a>
              </li>
            </ul>
          </div>
          <form  className="col-7 d-flex rounded-4 " role="search">
            <input
              className="form-control p-2"
              type="search"
              placeholder="Find Cars, Mobile Phone's and More..."
              aria-label="Search"
            />
            <button className="btn btn-dark rounded-3  col-1 searchBtn" type="submit">
            <i className="searchIcon fa-solid fa-magnifying-glass "></i>
            </button>
          </form>
       
           <div  className="Language">ENGLISH <i className="fa-solid fa-angle-down"></i></div>
           {/* <span>{user ? user.email : "Guest"}</span> */}
           {/* <div onClick={()=>logout()} className="Login-Logout" style={{cursor:'pointer'}}>Logout</div> */}
           <i onClick={handleState} className="fa-solid fa-user"></i>

           {isActiveDropDown && <div className="dropdownMenu">
            <span className="userName"><i className="fa-solid fa-user"></i> Anandhu</span>
            <div className="itemss">
            <span onClick={() => navigate("/userAds")}><i className="fa-brands fa-adversal"></i> Your Ads</span>
            <span  onClick={()=>logout()} ><i className="fa-solid fa-right-from-bracket"></i> Logout</span>
            <span><i className="fa-solid fa-circle-question"></i> Help</span>
            </div>
           </div>
           }
          
            

           
           <button onClick={() => navigate("/uplode")} className="sell-button">
    <div className="sell-button-inner">
      <span className="plus-icon">+</span> SELL
    </div>
  </button>
  
        </div>
      </nav>
   
  );
}

export default Navbar;
