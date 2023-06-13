import React, {useContext} from 'react';
import "./styles/cours-list.css"
import CourseNav from "./CourseNav";
import CourseProduct from "./CourseProduct";
import {observer} from "mobx-react-lite";
import {Context} from "../index";

const CourseList = observer(() => {
    const {course} = useContext(Context)
    return <>
        <CourseNav/>
        <div className="cards">
            {course.courses.map(course =>
                    <CourseProduct key={course.id} course={course}/>
            )}
        </div>
    </>
});

export default CourseList;