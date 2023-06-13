import React, {useEffect, useState} from 'react';
import './styles/coursePage.css'
import {SHOP_ROUTE} from "../utils/consts";
import './styles/certificate.css'
import {NavLink} from "react-router-dom";
import {useParams} from "react-router-dom";
import MasterEx from "./example-certificate.jpg"//для кнопки Назад
import '../components/styles/background.css'
import {fetchOneCourse} from "../http/courseAPI";
import Image from "react-bootstrap/Image";
import favourites from "./Favourites";

const CoursePage = () => {

    const [course, setCourse] = useState({skills: [], materials: []})
    const {id} = useParams()

    useEffect(()=>{
        fetchOneCourse(id).then(data => setCourse(data))
    }, [])

    return <>
        <div className="circle" style={{top: "40%", left: "calc(50% - 25em)", position: "absolute"}}></div>
        <div className="radius" style={{top: "130%"}}></div>
        <div className="circle" style={{top: "200%", left: "-10em", position: "absolute", width: "70em", height: "70em"}}></div>
        <div className="course-main-img"><Image src={process.env.REACT_APP_API_URL + course.img}/></div>
        <div className="c_title" id="name"><NavLink to={SHOP_ROUTE} className="back">Назад</NavLink>{course.name}</div>
        <button className="bt_fav">добавить в избранное</button>
        <div className="c_title2">{course.description}</div>

        <div className="crs_content_div">
            <h1 style={{color: "rgb(58, 11, 84)"}}>Содержание курса. Чему вы научитесь?</h1>
            <ol role="list">
                {course.skills?.map(skills =>
                    <li key={skills.id}>{skills.description}</li>
                )}
            </ol>
        </div>
        <div className="crs_content_div">
            <h1 style={{color: "rgb(58, 11, 84)"}}>Поехали!</h1> <br/>
            <div id="content">
                <div className="textcols-item">
                    {course.content}
                </div>
                <div className="textcols-item">
                    <Image src={process.env.REACT_APP_API_URL + course.material1}/>
                    <Image src={process.env.REACT_APP_API_URL + course.material2}/>
                    <Image src={process.env.REACT_APP_API_URL + course.material3}/>
                </div>
            </div>

        </div>

    </>
};

export default CoursePage;