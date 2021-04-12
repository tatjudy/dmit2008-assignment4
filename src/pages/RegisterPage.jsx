import React, {useState, useContext} from 'react';
import styled from 'styled-components'
import {Redirect} from 'react-router-dom'

import firebaseApp from './../firebase/firebaseConfig'
import AuthContext from './../auth/AuthContext'
import FormInput from './../components/forms/FormInput'
import Button from './../components/buttons/Button'
const RegisterPageStyles = styled.aside` 
    width: 480px;
    margin: 6rem auto 0;
    header{
        text-align:center;
        margin-bottom: 3rem;
    }
    h2{
        font-size: 2rem;
        font-weight: 700;
    }
    .create-account{
        margin-top: 2rem;
    }
   
         
`

const LoginPageStyles = styled.aside ` 

   max-width: 380px;
   margin: 6rem auto 0;

   h1{
       font-size: 2.25rem;
   }
       
`

const RegisterPage = (props) => {
    const auth = useContext(AuthContext)
    const [email, setEmail]=useState('')
    const[password, setPassword] = useState('')
    const [isValid, setIsValid] = useState(false)

    const handleClick = (e) => {
        firebaseApp.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Redirect to login route
            // Use conditional rendering
            setIsValid(true)

        })
        .catch((error) => {
        // Catch errors
        // You do not have to handle errors
        });        
    }

    if(isValid) {
        return <Redirect to="/login"/>
    }
    else {
        return ( 
            <RegisterPageStyles>
            <header>
            <h2>Unlimited Free Trial Sign Up</h2>
            <p>no credit card required</p>
            </header> 
            <FormInput label="name on the account" type="text"/>
            <FormInput label="valid email address" type="email" onChange={(e)=> setEmail(e.target.value.trim())}/>
            <FormInput label="password (min 6 charachters)" type="text" onChange={(e)=> setPassword(e.target.value.trim())}/>
            <Button className="create-account" uiStyle="login" label="create a free account" onClick={handleClick}/>
            
            </RegisterPageStyles>
        );
    }

}
 
export default RegisterPage;