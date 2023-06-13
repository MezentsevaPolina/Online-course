import React, {useContext, useEffect, useState} from 'react';
import {NavLink} from "react-router-dom";
import {SHOP_ROUTE} from "../utils/consts";
import {createCategory, fetchCategories} from "../http/categoryAPI";
import {observer} from "mobx-react-lite";
import {Context} from "../index";

const AdminPanel = observer(() => {
    const {course} = useContext(Context)
    const [name, setName] = useState('')
    useEffect(() =>{
        fetchCategories().then(data => course.setCategories(data))

    }, [])
    const addCategory = ()=>{
        const formData = new FormData()
        formData.append('name', name)
        createCategory(formData).then(data => alert("Создано!"))
    }
    return (
        <div>
            <NavLink to={SHOP_ROUTE} className="back">Назад</NavLink>
            <h1 className="m_panel_title">Панель администратора</h1>
            <div className="creating-panel">
                <label>Создать категорию:</label><br/>
                <label>Название<font color="#8b0000">*</font>:</label>
                <input type="text"
                       value={name}
                       onChange={e => setName(e.target.value)}
                /> <br/>
                <button style={{margin: "0 auto", display: "block"}} onClick={addCategory}>Создать</button>
            </div><br/>
            <div className="creating-panel" style={{marginTop: "300px"}}>
                {course.categories.map(category =>
                    <div style={{marginLeft: "50px"}}>
                        <label
                            htmlFor={category.id}

                            key={category.id}
                        >
                            {category.name}
                        </label>
                    </div>
                )}
            </div>

        </div>
    );
});

export default AdminPanel;