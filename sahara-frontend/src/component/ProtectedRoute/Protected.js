
import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom"
import { loadUser } from "../../actions/userAction";

const Protected = ({ adminRoute, children }) => {

  const dispatch = useDispatch();

  const { isAuthenticated, error, loading, user } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch])




  return (
    <Fragment>
      {loading === false && (isAuthenticated === false) ?
        (
          <Navigate to="/login" replace />
        )
        :
        (loading === false &&
          (adminRoute === true ?
            (user.userRole !== 'admin' ?
              (
                <Navigate to="/login" replace />
              )
              :
              (
                children
              )
            )
            :
            (children)

          )
        )
      }
    </Fragment>
  )
}

export default Protected;