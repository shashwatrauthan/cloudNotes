import { useState } from "react";
import alertContext from "./AlertContext";

const AlertState = (props)=>
{
    const [alert,setAlert] = useState(null);

    const showAlert = (variant, msg)=>
    {
      setAlert({
        variant:variant,
        msg:msg
      })
  
      setTimeout(() => {
        setAlert(null);
      }, 2000);
    }

    return (
        <alertContext.Provider value={{ alert, showAlert }}>
            {props.children}
        </alertContext.Provider>
    )
}

export default AlertState;