import {BrowserRouter} from "react-router-dom";
import AppRouter from "./components/AppRouter";
import Header from "./components/header/Header";
import "./App.css";
import {observer} from "mobx-react-lite";
import {useContext, useEffect, useState} from "react";
import {Context} from "./index";
import {check} from "./http/userAPI";
import Loading from "./accets/lilac-lite.svg"


const App = observer(() => {
    const {user} = useContext(Context)
    const [loading, setLoading] = useState(true)

    useEffect(()=>{
        setTimeout(()=>{
            check().then(data => {
                user.setUser(data)
                user.setIsAuth(true)
            }).finally (() => setLoading(false))
        }, 1000)
    }, [])

    if (loading){
        return <img src={Loading} alt="Spinner" className="loader"/>
    }

  return (
      <BrowserRouter>
          <Header/>
          <AppRouter/>
      </BrowserRouter>
      );
});

export default App;
