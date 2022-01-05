import { Button, Flex, Input, Image, Stack } from '@chakra-ui/react'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCustomers } from '../state/redux/ducks/customer';
import { RootState } from '../state/reducers';

import { sendAuthorizationRequest, sendTokenRequest } from "../actions/sign-in";
import {isValidSession, getAllSessionParameters, decodeIdToken} from "../actions/session";
import { loginSuccess, login } from '../state/redux/ducks/user';

const Login = () => {

  const dispatch = useDispatch();  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const {email, password} = formData;
  const onChange = e => setFormData({...formData, [e.target.name]: e.target.value});
 
  const handleLogin = () => {
    dispatch(login(formData));
    // dispatch(getCustomers());
    // sendAuthorizationRequest();
    
  };

  const user = useSelector((state: RootState) => state.user) ;

  const [tokenObject, setTokenObject] = useState({
    tokenResponse: null as any,
    idToken: null as any,
    isLoggedIn: false,
    error: null as any
  });
  

  useEffect(()=>{

    //dispatch(loginSuccess({token: idToken}));
    // if (user.token !== null) 
    console.log("useEffect user:", user);

    // if (tokenObject.idToken !== null) 
    if (user.token !== null) 
    {

      console.log(user.token);
      //dispatch(loginSuccess(tokenObject.idToken));
      dispatch(getCustomers(user.token));

      return;

    }

    // const sessionIsValid = isValidSession()        ;
    // console.log('isValidSession:', sessionIsValid);

    // // See if there is a valid session.
    // if (sessionIsValid) {
      
    //   const session = getAllSessionParameters(); 

    //   const _tokenResponse = {
    //     access_token: session.ACCESS_TOKEN,
    //     refresh_token: session.REFRESH_TOKEN,
    //     scope: session.SCOPE,
    //     id_token: session.ID_TOKEN,
    //     token_type: session.TOKEN_TYPE,
    //     expires_in: parseInt(session.EXPIRES_IN),
    //   };

    //   setTokenObject({
    //     ...tokenObject,
    //     tokenResponse: _tokenResponse,
    //     idToken: decodeIdToken(session.ID_TOKEN),
    //     isLoggedIn: true,
    //   });

    //   return;
    // }

    // const code = new URL(window.location.href).searchParams.get("code");
    // console.log('code', code);

  },[tokenObject, user])  


  return (

    <Stack p={20}>
        <Image mb={6} src='/wso2_is.svg' />
        <Button mb={6} onClick={() => handleLogin()} colorScheme = "teal">Log in</Button>
    </Stack>

    // <Flex alignItems= "center" justifyContent = "center">
    //   <Flex direction = "column"  p = {12} rounded = {6}>
    //     {/* <Heading mb = {6}>Log in</Heading>  */}
    //     <Input 
    //         name="email" 
    //         placeholder="customer1@gmail.com" 
    //         value={email} onChange={e => onChange(e)}
    //         variant = "filled" 
    //         mb={3} 
    //         type = "email" 
    //     />
    //     <Input 
    //         name="password" 
    //         placeholder="*********" 
    //         value={password} onChange={e => onChange(e)}
    //         variant = "filled" 
    //         mb={6} 
    //         type = "password" 
    //     />
    //     <Button mb={6} onClick={() => handleLogin()} colorScheme = "teal">Log in</Button>
    //   </Flex>

    // </Flex>
  )

}
export default Login