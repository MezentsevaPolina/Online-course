import React, {useContext} from 'react';
import {Context} from "../index";
import {observer} from "mobx-react-lite";

const CourseNav = observer(() => {
    const {course} = useContext(Context)


    return (
        <div className="curs__navigation" id="navDiv">
            <a
                style={{cursor:"pointer"}}
                onClick={()=> course.setSelectedCategory('')}
            >Все категории</a>
            {course.categories.map(category =>
                <a
                    style={{cursor: "pointer"}}
                    active={category.id === course.selectedCategory.id}
                    onClick={() => course.setSelectedCategory(category)}
                    key={category.id}>
                    {category.name}
                </a>
            )}
        </div>
    );
});

export default CourseNav;