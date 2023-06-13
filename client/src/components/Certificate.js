import React from 'react';
import "../pages/styles/certificate.css"
import CertificateImage from "../pages/example-certificate.jpg"
import Download from "../accets/download.svg"

const Certificate = () => {
    return <>
        <div className="cert">
            <div className="cert__top">
                <a href="client/src/components#" className="card__image">
                    <img
                        src={CertificateImage}
                    />
                </a>
                <div className="card__favor">
                    <img src={Download} className="download"/>
                </div>
            </div>
            <div className="cert__bottom">
                <div className="cert__label">
                    Наименование сертификата
                    <button className="cert__open">Открыть</button>
                </div>
            </div>
        </div>
    </>
};

export default Certificate;