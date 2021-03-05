import React from 'react';
import '../style/Register.css';
import {useRef} from 'react'


const firstName = useRef();
const lastName = useRef();
const email = useRef();
const password = useRef();
const confirmPassword = useRef();

const Register = () => {
  return (
    <div className="register">
      <div class="grid-container">
        <div class="grid-item">1</div>
        <div class="grid-item">Register</div>
        <div class="grid-item">3</div>
        <div class="grid-item">4</div>
        <div class="grid-item">
          <form key="1" style={styles.form} onSubmit={createUser}>
          <div class="inner-grid"><input required="firstName" key="2" placeholder="First name" /></div>

          <div class="inner-grid"><input required="lastName" key="3" placeholder="Last name" /></div>
          
          <div class="inner-grid"><input required="email" key="4" placeholder="email" /></div>
          
          <div class="inner-grid"><input required="password" key="5" placeholder="password" /></div>

          <div class="inner-grid"><input required="confirmPassword" key="6" placeholder="confirm password" /></div>

          <div class="inner-grid">
            <button className="registerButton" key="7" style={{...styles.input, ...styles.button}}>Register</button>
          </div>
          </form>
        </div>
        <div class="grid-item">6</div>
        <div class="grid-item">7</div>
        <div class="grid-item">8</div>
        <div class="grid-item">9</div>
      </div>
    </div>
  );
}
 
export default Register(createUser);