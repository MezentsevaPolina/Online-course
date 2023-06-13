import React, {useContext, useEffect} from 'react';
import MainCaptions from "../components/MainCaptions";
import CourseList from "../components/CourseList";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {fetchCourses} from "../http/courseAPI";
import {fetchCategories} from "../http/categoryAPI";

const Shop = observer(() => { //основная страница
    const {course} = useContext(Context)

    useEffect(() =>{
        fetchCategories().then(data => course.setCategories(data))
        fetchCourses(null).then(data => course.setCourses(data.rows))
    }, [])

    useEffect(()=>{
        fetchCourses(course.selectedCategory.id).then(data => course.setCourses(data.rows))
    }, [course.selectedCategory])

    return (
        <div>
            <MainCaptions/>
            <CourseList/>
        </div>
    );
});

export default Shop;