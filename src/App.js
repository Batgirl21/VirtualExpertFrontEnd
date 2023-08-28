/* eslint-disable prettier/prettier */
import React, { Suspense, useEffect } from 'react'
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import './scss/style.scss'
import { useDispatch, useSelector } from 'react-redux'
import { Axios } from './AxiosConfig'
import { expertLoaded, loginSuccess, logout, userLoaded, userLoading } from './slice/loginSlice'

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'))
const Register = React.lazy(() => import('./views/pages/register/Register'))
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'))
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'))
const Expertlogin = React.lazy(() => import('./views/pages/login/Expertlogin'))


const App = () => {
  const dispatch = useDispatch();
  const isLogin = useSelector((state) => state.login.isAuthenticated);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(userLoading());
    Axios.get("/user/gettoken")
      .then(async (resp) => {
        await dispatch(loginSuccess(resp.data))
        await Axios.get("/user/dashboard", {
          headers: {
            "User-Authorization": resp.data.token,
            "Content-Type": 'application/json'
          }
        })
          .then((res) => {
            dispatch(userLoaded(res.data));
            navigate("/")
          }).catch(err => {
            dispatch(userLoading());
    Axios.get("/expert/gettoken")
      .then(async (resp) => {
        await dispatch(loginSuccess(resp.data))
        await Axios.get("/expert/Expertdashboard", {
          headers: {
            "Expert-Authorization": resp.data.token,
            "Content-Type": 'application/json'
          }
        })
          .then((res) => {
            dispatch(expertLoaded(res.data));
            navigate("/")
          }).catch(err => {
            dispatch(logout())
            console.log(err)
          })
      }).catch(err => {
        dispatch(logout())
        console.log(err)
      })
          })
      }).catch(err => {
        dispatch(logout())
        console.log(err)
      })
    // eslint-disable-next-line
  }, [])
  

  const tokenRefresh = () => {
    Axios.get("/user/gettoken")
      .then(async (resp) => {
        await dispatch(loginSuccess(resp.data))
      }).catch(err => {
        dispatch(logout())
        console.log(err)
      })
    setTimeout(() => {
      tokenRefresh()
    }, (900 * 1000) - 500)

  }

  useEffect(() => {
    tokenRefresh();
  }, [])
  return (
    <div>
      {isLogin ?
        <Suspense>
          <Routes>
            <Route path="*" name="Home" element={<DefaultLayout />} />
          </Routes>
        </Suspense> :
        <Suspense>
          <Routes>
            <Route exact path="/login" name="Login Page" element={<Login />} />
            <Route exact path="/expertlogin" name="Login Page" element={<Expertlogin />} />
            <Route exact path="/register" name="Register Page" element={<Register />} />
            <Route exact path="/404" name="Page 404" element={<Page404 />} />
            <Route exact path="/500" name="Page 500" element={<Page500 />} />
            <Route
              path="*"
              element={<Navigate to="/login" replace />}
            />
          </Routes>
        </Suspense>}
       

    </div>
  )
}

export default App
