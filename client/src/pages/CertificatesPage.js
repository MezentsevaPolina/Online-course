import React from 'react';
import {NavLink} from "react-router-dom";
import {USER_ROUTE} from "../utils/consts";
import "./styles/certificate.css"
import Certificate from "../components/Certificate";

const CertificatesPage = () => {
    return <>
        <div className="title__div">
            <NavLink to={USER_ROUTE} className="back">Назад</NavLink><a className="user__title">Мои сертификаты</a>
        </div>
        <div className="circle"></div>
        <div className="certs">
            <Certificate/>
            <Certificate/>
            <Certificate/>
            <Certificate/>
        </div>

    </>
};

export default CertificatesPage;