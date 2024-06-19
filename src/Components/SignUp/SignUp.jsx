
import { useState } from 'react';
import olxLogo from '/public/OLX_green_logo.svg'
import { login , signup } from '../../FireBase';
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
}
from 'mdb-react-ui-kit';



function App() {

  const [SignState , setSignState] = useState('Sign In');
  const [name , setName] = useState('');
  const [email , setEmail] = useState('');
  const [password , setPassword] = useState('');

  const handleSubmit = async (e)=>{

    e.preventDefault();
    if(SignState === 'Sign In'){
      await login(email , password);
   }else{
       await signup(name , email , password);
   }
      
  }

  return (
    <MDBContainer style={{backgroundColor:"#dae6fd"}} fluid>

     <form onSubmit={handleSubmit} style={{border:"none"}}>
      <MDBRow className='d-flex justify-content-center align-items-center h-100'>
        
        <MDBCol col='12'>

          <MDBCard className='text-white my-5 mx-auto' style={{borderRadius: '1rem', border:'none', maxWidth: '400px' , backgroundColor:"#acc2ef", display:"flex" , alignItems:"center"}}>
            <img src={olxLogo} style={{width:"90px", height:"90px", marginBottom:'-30px' , marginTop:"15px"}} alt="" />
            <MDBCardBody className='p-5 d-flex flex-column align-items-center mx-auto w-100'>

              <h2 className="fw-bold mb-2 text-uppercase" style={{color:"0f0f0f0"}}>{SignState==="Sign In" ? 'Login' : 'Sign Up'}</h2>
              <p className="mb-5" style={{color:"rgb(113, 140, 154)"}}>Please enter your login and password!</p>

               { 
                SignState=== 'Sign Up' ?  <MDBInput wrapperClass='mb-1 mx-5 w-100' labelClass='text-white' label='Name' id='formControlLg' value={name} onChange={(e)=>setName(e.target.value)} placeholder='name' type='text' size="lg"/>: <></>
               } 
              <MDBInput wrapperClass='mb-1 mx-5 w-100' labelClass='text-white' label='Email address' value={email} id='formControlLg' pl type='email' onChange={(e)=>setEmail(e.target.value)} placeholder='email' size="lg"/>
              <MDBInput wrapperClass='mb-4 mx-5 w-100' labelClass='text-white' label='Password' id='formControlLg' value={password} type='password'onChange={(e)=>setPassword(e.target.value)} placeholder='password' size="lg"/>

              {/* <p className="small mb-3 pb-lg-2"><a className="text-white-50" href="#!">Forgot password?</a></p> */}
              
              <button style={{
                backgroundColor:"#002F34", padding:"10px 55px", marginTop:"-16px", 
                marginBottom:"20px", fontWeight:"500", 
                fontSize:"17px", color:"white", border:"none" , borderRadius:"8px"}} >{
                  SignState==="Sign In" ? 'Login' : 'Sign Up'
                  
                }</button>
              
            
{/* 
              <div className='d-flex flex-row mt-3 mb-5'>
                <MDBBtn tag='a' color='none' className='m-3' style={{ color: 'white' }}>
                  <MDBIcon fab icon='facebook-f' size="lg"/>
                </MDBBtn>

                <MDBBtn tag='a' color='none' className='m-3' style={{ color: 'white' }}>
                  <MDBIcon fab icon='twitter' size="lg"/>
                </MDBBtn>

                <MDBBtn tag='a' color='none' className='m-3' style={{ color: 'white' }}>
                  <MDBIcon fab icon='google' size="lg"/>
                </MDBBtn>
              </div> */}

              <div>
               {
               
                 SignState==='Sign In' ? <p className="mb-0">Dont have an account? <a href="#!" onClick={()=>setSignState('Sign Up')} className=" fw-bold" style={{color:"#002F34"}}>Sign Up</a></p> :
                  <p className="mb-0">Already Have An Account? <a href="#!" onClick={()=>setSignState('Sign In')} className=" fw-bold" style={{color:"#002F34"}}>Sign In</a></p>
                 
               }
                

              </div>
            </MDBCardBody>
          </MDBCard>

        </MDBCol>
      </MDBRow>
      </form>

    </MDBContainer>
  );
}

export default App;