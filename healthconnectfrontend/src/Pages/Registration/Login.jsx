import React from 'react'
import Template from '../../Components/Registration/Template'
import { useSearchParams } from 'react-router-dom';
import Reset_Password from './Reset_Password';
const Login = () => {

  const { resetToken } = useSearchParams();

  return (
    resetToken ? <Reset_Password /> : <Template formType="login" />
  );
  // return (
  //   {
  //     resetToken ? (<Reset_Password/> ) : (<Template 
  //       formType = "login"
  //     />)
  //   }
  //   // <Template 
  //   //   formType = "login"
  //   // />
  // )
}

export default Login;