
import React,{useState, useEffect} from 'react'; 
import Axios from 'axios'
import styled from "styled-components";
import { mobile } from '../../components/decorators/responsive';
import { Marginer } from '../../components/decorators/margin';
//import { Redirect, Route } from "react-router";
//import {useHistory} from "react-router-dom"
//import { setUserSession } from './Util/Common';


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
  width: 35%;
  padding: 20px;
  background-color: white;
  ${mobile({ width: "75%" })}
`;

const Title = styled.h1`
  font-size: 20px;
  font-weight: 500;
  text-align: center;
`;

const Form = styled.form`
   font-size: 12px;
  
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

const BigButton = styled.button`
  width: 30%;
  border: none;
  padding: 15px 20px;
  background-color: #2e8b57;
  color: white;
  cursor: pointer;
`;

const SmallButton = styled.span`
  border: none;
  min-width: 17%;
  padding: 13px;
  margin: 11px 0;
  background-color: #ff6347;
  color: white;
  cursor: pointer;
  font-size: 12px;

  
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

function NewProduct() {
    const [productName, setProductName] = useState("");
    const [size, setSize] = useState("");
    const [category, setCategory] = useState("");
    const [categoryData, setCategoryData] = useState(null);
    const [quantity, setQuantity] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");

    useEffect(() => {
        // Fetch data from an API
        fetch('get_category')
          .then(response => response.json())
          .then(data => setCategoryData(data))
          .catch(error => console.error(error));
      }, []);

    const handleChange = (e) => {
        setCategory(e.target.value)
    }

    //const [error, setError] = useState(null);
    //const [loading, setLoading] = useState(false);
    //let history =  useHistory();

    const submitProduct = (e) => {
        e.preventDefault();
        //setLoading(true);
        Axios.post('/add_product',{
            product_name: productName,
            size: size,
            category: category,
            quantity: quantity,
            description: description,
            price: price,
        }).then((response) => {
          console.log(response)
          /*
            if(response.data === "unauthenticated" ){
                console.log("jsjsjsj")
                setLoginStatus(response.data)
                
                //setLoading(false);
            }
            if(response.data.data === "authenticated" ){
                //<Redirect to = "/register" />
                //setLoginStatus(response.data)
               // setLoading(false);
               console.log(response.data.token, response.data.user )
                //setUserSession(response.data.token, response.data.user)
                //history.push('/dashboard')
                //console.log(response.data.user)
            }*/
        })
    }
    return (
        <>
        <Container>
        <Wrapper>
            <Title>Add New Product</Title>
            <Form>
            <SmallText>{}</SmallText>
            <Input type="text" placeholder="Product Name"  onChange = {(e)=>{setProductName(e.target.value);}}  />
            <Input type="text" placeholder="Size" onChange = {(e)=>{setSize(e.target.value);}} />
            <Input type="text" placeholder="Select Category" list="categoryData" value={category} onChange={handleChange} />
            {categoryData ? (
                <datalist id="categoryData">
                    {categoryData.map(option => (
                        <option key={option._id} value={option.category} />
                    ))}
                </datalist>
                ):(
                    <p>Loading data...</p>     
            )}
            <Input type="number" placeholder="Price" onChange = {(e)=>{setPrice(e.target.value);}} />
            <Input type="number" placeholder="Quantity"  onChange = {(e)=>{setQuantity(e.target.value); }}  />
            <Input type="text" placeholder="Description"  onChange = {(e)=>{setDescription(e.target.value); }}  />

            <Marginer direction="vertical" margin="1em" />
            <Button type="submit" onClick = {submitProduct} >CREATE</Button>
            </Form>
        </Wrapper>
        </Container>
      </>
  );
}

export default NewProduct
