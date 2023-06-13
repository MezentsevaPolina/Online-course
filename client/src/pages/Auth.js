import React, {useContext, useState} from 'react';
import {NavLink, useLocation, useNavigate} from "react-router-dom";
import {LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE} from "../utils/consts";
import "../components/styles/login.css"
import {login, registration} from "../http/userAPI";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import validator from "validator/es";

const Auth = observer(() => {
    const {user} = useContext(Context)
    const location = useLocation()
    const navigate = useNavigate()
    const isLogin = location.pathname === LOGIN_ROUTE
    let [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const signIn = async () => {
        try{
            let data;
            if (isLogin){
                data = await login(email, password);
            } else{
                data = await registration(name, email, password);
            }
            user.setUser(data)
            user.setIsAuth(true)
            navigate(SHOP_ROUTE)
        } catch (e) {
            alert(e.response.data.message)
        }
    }



    return (
        <div>
            <p className="g_title">{isLogin ? "Вход": "Регистрация"}</p>
            {isLogin ?
                <p
                    className="g_title2">войдите в систему или <NavLink to={REGISTRATION_ROUTE} className="registration">Загеристрируйтесь!</NavLink>
                </p>
                :
                <p
                    className="g_title2">есть аккаунт? <NavLink to={LOGIN_ROUTE} className="registration">Войдите!</NavLink>
                    <p style={{color: "darkred", letterSpacing: "2px", textAlign: "center"}}>* - обязательные поля</p>
                </p>
            }
            {isLogin ?
                <div className="login-form">
                    <label>Email:</label><input
                    id="emInput"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="the_input" type="text"
                /><br/>
                    <label>Пароль:</label> <input
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className="the_input" type="password"
                /><br/>
                </div>
                :
                <div className="login-form">
                    <label>Фамилия Имя:
                        <input
                            value={name}
                            onChange={e => setName(e.target.value)}
                            className="the_input" type="text"/>
                        <font color="#8b0000">*</font></label> <br/>
                    <label>Email:
                        <input
                            id="emInput"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            className="the_input" type="text"/>
                        <font color="#8b0000">*</font></label> <br/>
                    <label>Пароль:
                        <input
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            className="the_input" type="password"/>
                        <font color="#8b0000">*</font></label> <br/>
                </div>
            }
            <p style={{textAlign: "center"}}><button
                onClick={signIn}
                className="button__log"
            >{isLogin ? "войти" : "зарегистрироваться"}</button></p>
        </div>
    );
});

export default Auth;