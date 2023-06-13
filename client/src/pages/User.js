
import React, {useEffect, useState} from 'react';
import Avatar from "../accets/avatar.jpeg"
import './styles/user.css'
import '../components/styles/background.css'
import {NavLink, useParams} from "react-router-dom";
import {CERTIFICATE_ROUTE, FAVOURITES_ROUTE, MASTER_ROUTE, SHOP_ROUTE} from "../utils/consts";
import {fetchOneUser, updateUser} from "../http/userAPI";



const User = () => {
    const {id} = useParams()
    useEffect(()=> {
        fetchOneUser(id).then(data => setUser(data))
    }, [])
    const [user, setUser] = useState('')
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [dateOfBirth, setDateOfBirth] = useState('')
    const [town, setTown] = useState('')


    const saveData = () => {
        const formData = new FormData()
        formData.append('name', name)
        formData.append('email', email)
        formData.append('dateOfBirth', dateOfBirth)
        formData.append('town', town)
        updateUser(formData).then(data => alert("Данные обновлены!"))
    }

    const logOut = () => {
        user.setUser({})
        user.setIsAuth(false)
        localStorage.clear()
    }

    return <>
        <div className="title__div">
            <a className="user__title">Личный кабинет</a>
        </div>
        <div className="fio__div">
            <img className="avatar" src={Avatar}/><a>{user.name}</a>
        </div>
        <div className="radius" style={{position: "fixed"}}></div>
        <div className="describe__data">
            <label>Имя</label><br/>
            <input className="the_input" type="text"
                   value={user.name}
                   onChange={e => setName(e.target.value)}
            /><br/>
            <label>Email</label><br/>
            <input className="the_input" type="text"
                   value={user.email}
                   onChange={e => setEmail(e.target.value)}
            /><br/>

            <label>Дата рождения</label><br/>
            <input className="the_input" type="text"
                   value={user.dateOfBirth}
                   onChange={e => setDateOfBirth(e.target.value)}
            /><br/>
            <label>Город</label><br/>
            <input className="the_input" type="text"
                   value={user.town}
                   onChange={e => setTown(e.target.value)}
            /><br/>
            <div>
                <input type="radio" name="rb" id="rb1" checked/> <label htmlFor="rb1">Женский</label>
            </div>

            <div>
                <input type="radio" name="rb" id="rb2"/> <label htmlFor="rb2">Мужской</label>
            </div>

            <button onClick={saveData} className="button__log">сохранить</button>
        </div>
        <div className="describe">
            <a className="contact_title">О себе</a><br/>
            <a className="contact_title2">Данные в Вашем профиле видны только Вам и мастеру.<br/>Вносите корректные данные, они будут отображаться в сертификате.</a>
        </div>
        <div className="menu">
            <p className="menu__btn"><NavLink to="/" >Текущие курсы</NavLink></p><br/>
            <p className="menu__btn"><NavLink to={FAVOURITES_ROUTE} >Избранные курсы</NavLink></p><br/>
            <p className="menu__btn"><NavLink to={CERTIFICATE_ROUTE} >Сертификаты</NavLink></p><br/>
            <p className="menu__btn"><NavLink to={MASTER_ROUTE}>Создать свой курс</NavLink></p><br/>
            <p className="menu__btn"><NavLink to={SHOP_ROUTE} onClick={() => logOut()}>Выйти</NavLink></p><br/>
            <p className="menu__btn"><NavLink to={SHOP_ROUTE} onClick={() => logOut()}>Удалить профиль</NavLink></p>
        </div>
    </>
};

export default User;