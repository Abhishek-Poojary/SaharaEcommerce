
import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom"
import { loadUser } from "../../actions/userAction";

const Protected =({children})=>{

    const dispatch=useDispatch();
    
    const {isAuthenticated,error,loading} =useSelector((state)=>state.user);
    
    useEffect(()=>{
        dispatch(loadUser());
      },[dispatch])
      
     
      return(
        <Fragment>
        {loading === false &&(isAuthenticated === false)?(
            <Navigate to="/login" replace/>
        ):(
           <div>
               {children}
           </div>
        )
                
         
        }
      </Fragment>
          
      )
      

   
}

export default Protected;