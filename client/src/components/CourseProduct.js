import React, {useContext, useState} from 'react';
import Image from "react-bootstrap/Image";
import {NavLink, useNavigate} from "react-router-dom";
import "./styles/cours-list.css"
import "./styles/product-card.css"
import {COURSE_ROUTE} from "../utils/consts";
import {observer} from "mobx-react-lite";

const CourseProduct = observer(({course}) => {
    const navigate = useNavigate()

    return (
        <div className="card">
            <div className="card__top">
                <a className="card__image">
                    <Image src={process.env.REACT_APP_API_URL + course.img}
                    />
                </a>

                <label onClick={() => navigate(COURSE_ROUTE + "/" + course.id)} className="card__label">{course.name}</label>
            </div>
            <div className="card__bottom">
                <div className="card__prices">
                    <label className="card__price--common">Категория:</label><br/>
                    <label className="card__price--discount">{course.category?.name}</label><br/>
                    <label className="card__price--common">Описание: </label><br/>
                    <div className="card__price--discount">{course.description}</div><br/>
                </div>

            </div>
        </div>
    );
});

export default CourseProduct;