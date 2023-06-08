import React, { useEffect } from "react";
import Config from "./../../services/config";
const url=Config.appUrl;


const Email = (props) => {
  
    return (
      <div style={{ float: "left",width:'700px' }}>
        <div style={{ float: "left",width:'100%' }}>
          <span>
            Hi,
            <br />  <span style={{paddingTop:'15px'}}>Please click below to reset password.</span>
          </span>
        </div>
  
        <div style={{ float: "left",width:'100%',fontWeight:'700' }}>
            <a href={url+"/password/"+props.token}>Reset Password</a>
        </div>
        <div style={{ float: "left", marginTop: "10px",width:'100%'}}>
          <span>Thanks.</span>
        </div>
      </div>
    );
  };
  
  export default Email;
  