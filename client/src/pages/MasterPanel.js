import React from 'react';
import {NavLink} from "react-router-dom";
import {CREATING_ROUTE, CREATING_WRITE_ROUTE, USER_ROUTE} from "../utils/consts";
import "../components/styles/creating-course.css"

const MasterPanel = () => {
    function Results() {
        document.getElementById("show1").classList.add("show1");
    }
    function NoResults() {
        document.getElementById("show1").classList.remove("show1");
    }
    function Results2() {
        document.getElementById("show2").classList.add("show2");
    }
    function NoResults2() {
        document.getElementById("show2").classList.remove("show2");
    }
    return <>
        <NavLink to={USER_ROUTE} className="back">Назад</NavLink>
        <div className="m_panel_title">
            <h1>Добро пожаловать, мастер!</h1>
            <h2>Здесь вы можете создать и опубликовать свой курс, либо написать и выложить статью.</h2>
        </div>
        <div className="m_panel_buttons">
            <NavLink to={CREATING_ROUTE}
                     onMouseEnter={Results}
                     onMouseLeave={NoResults}
                     id="b1">Создать курс
            </NavLink>
            <NavLink to={CREATING_WRITE_ROUTE}
                     onMouseEnter={Results2}
                     onMouseLeave={NoResults2}
                     id="b2">Написать статью
            </NavLink>
        </div>
        <div className="texts">
            <div className="texts-div" id="show1">
                Создайте свой курс, заполнив форму данными и прикрепив необходимые фото/видео материалы, а также материалы в текстовом формате.
                Все прикреплённые материалы будут доступны только вашим ученикам.
            </div>
            <div className="texts-div" id="show2">
                Хотите вовлечь своих учеником в будущую профессию и рассказать много интересного? Напишите свою статью, в которой можете
                поделиться своим опытом и историями, выложенными в общий доступ.
            </div>
        </div>
    </>
};

export default MasterPanel;