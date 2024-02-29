import React,{useState} from 'react'; 
import Axios from 'axios';
import styled from "styled-components";
import { mobile } from '../../components/decorators/responsive';
import { Marginer } from '../../components/decorators/margin';

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://images.pexels.com/photos/6984661/pexels-photo-6984661.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 25%;
  padding: 20px;
  background-color: white;
  ${mobile({ width: "75%" })}
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  padding: 10px;
  margin: 10px 0;
  font-size: 15px;
`;

const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 0px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
`;

const MutedLink = styled.a`
  font-size: 13px;
  color: rgba(51, 51, 51, 0.8);
  font-weight: 500;
  text-decoration: none;
`;

const BoldLink = styled.a`
  font-size: 13px;
  color: rgb(1, 1, 44);
  font-weight: 500;
  text-decoration: none;
  margin: 0 4px;
`;

const SmallText = styled.h5`
  color: #270101;
  font-weight: 500;
  font-size: 12px;
  z-index: 10;
  margin: 0;
  margin-top: 5px;
`;


function Register() {

        const [businessNameReg, setBusinessNameReg] = useState("");
        const [passwordReg, setPasswordReg] = useState("");
        const [passwordReg2, setPasswordReg2] = useState("");
        const [email, setEmail] = useState("");
        const [phone_number, setPhoneNumber] = useState("");
        const [address, setAddress] = useState("");
        const [city, setCity] = useState("");
        const [state, setState] = useState("");
        const [country, setCountry] = useState("");
        const [role, setRole] = useState("")
        const [signupStatus, setSignupStatus] = useState("");
        const [errors, setErrors] = useState({});
        
        const register = (e) => {
            console.log(role)
            e.preventDefault();
            Axios.post('/signup_business',{
                businessName: businessNameReg,
                password: passwordReg,
                pass2: passwordReg2,
                email: email,
                phone_number: phone_number,
                address: address,
                city: city,
                state: state,
                country: country,
                userRole: role

            }).then((response) => {
                console.log(response)
            })
        }
        return (
            <Container>
            <Wrapper>
              <Title>CREATE ACCOUNT</Title>
              <Form>
              <SmallText>{signupStatus}</SmallText>
              <Input type="text" placeholder="Business Name"  onChange = {(e)=>{setBusinessNameReg(e.target.value);}}  />
             
              <Input type="email" placeholder="Email" onChange = {(e)=>{setEmail(e.target.value);}} />
           
              <Input type="text" placeholder="Phone Number"  onChange = {(e)=>{setPhoneNumber(e.target.value);}}  />
  
              <Input type="text" placeholder="Address" onChange = {(e)=>{setAddress(e.target.value);}} />
          
              <Input type="text" placeholder="City"  onChange = {(e)=>{setCity(e.target.value);}}  />
          
              <Input type="text" placeholder="State" onChange = {(e)=>{setState(e.target.value);}} />
         
              <Input type="text" placeholder="Country"  onChange = {(e)=>{setCountry(e.target.value);}}  />
           
              <Input type="text" placeholder="Role" onChange = {(e)=>{setRole(e.target.value);}} />
      
              <Input type="password" placeholder="Password"  onChange = {(e)=>{setPasswordReg(e.target.value); }}  />
     
              <Input type="password" placeholder="Confirm Password" onChange = {(e)=>{setPasswordReg2(e.target.value);}}  />

              <Marginer direction="vertical" margin="1em" />
                <MutedLink href="#">
                      Already have an account?
                      <BoldLink href="/login" >
                          <b>Sign-in</b>
                      </BoldLink>
                 </MutedLink>
      
      
                <Agreement>
                  By creating an account, I consent to the processing of my personal
                  data in accordance with the <b>PRIVACY POLICY</b>
                </Agreement>
                <Button type="submit" onClick = {register} >CREATE</Button>
              </Form>
            </Wrapper>
          </Container>

         );
    
}

export default Register;