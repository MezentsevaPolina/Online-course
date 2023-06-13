import React, {useContext, useEffect, useState} from 'react';
import {NavLink} from "react-router-dom";
import {SHOP_ROUTE} from "../utils/consts";
import {Context} from "../index";
import {createCourse} from "../http/courseAPI";
import {observer} from "mobx-react-lite";
import {fetchCategories} from "../http/categoryAPI";

const CreatingCourse = observer(() => {
    const {course} = useContext(Context)
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState(0)
    const [duration, setDuration] = useState(0)
    const [content, setContent] = useState('')
    const [file, setFile] = useState(null)
    const [file1, setFile1] = useState(null)
    const [file2, setFile2] = useState(null)
    const [file3, setFile3] = useState(null)
    const [materials, setMaterials] = useState([])
    const [skills, setSkills] = useState([])

    useEffect(() =>{
        fetchCategories().then(data => course.setCategories(data))

    }, [])

    const addSkills = () =>{
        setSkills([...skills, {description: '', number: Date.now()}])
    }
    const removeSkill = (number) =>{
        setSkills(skills.filter(i => i.number !== number))
    }
    const selectFile = e =>{
        console.log(e.target.files)
        setFile(e.target.files[0])
        let file = document.getElementById ('uploaded-file').value;
        file = file.replace(/\\/g,"/").split('/').pop();
        document.getElementById ('file-name').innerHTML =  file;
    }
    const selectFile1 = e =>{
        console.log(e.target.files)
        setFile1(e.target.files[0])
        let file = document.getElementById ('uploaded-file1').value;
        file = file.replace(/\\/g,"/").split('/').pop();
        document.getElementById ('file-name1').innerHTML =  file;
    }
    const selectFile2 = e =>{
        console.log(e.target.files)
        setFile2(e.target.files[0])
        let file = document.getElementById ('uploaded-file2').value;
        file = file.replace(/\\/g,"/").split('/').pop();
        document.getElementById ('file-name2').innerHTML =  file;
    }
    const selectFile3 = e =>{
        console.log(e.target.files)
        setFile3(e.target.files[0])
        let file = document.getElementById ('uploaded-file3').value;
        file = file.replace(/\\/g,"/").split('/').pop();
        document.getElementById ('file-name3').innerHTML =  file;
    }
    const changeSkills = (key, value, number) =>{
        setSkills(skills.map(i => i.number === number ? {...i, [key]: value} : i))
    }

    const addCourse = ()=>{
        const formData = new FormData()
        formData.append('name', name)
        formData.append('description', description)
        formData.append('price', `${price}`)
        formData.append('duration1', `${duration}`)
        formData.append('content', content)
        formData.append('img', file)
        formData.append('material1', file1)
        formData.append('material2', file2)
        formData.append('material3', file3)
        formData.append('categoryId', course.selectedCategory.id)
        formData.append('materials', JSON.stringify(materials))
        formData.append('skills', JSON.stringify(skills))
        createCourse(formData).then(data => alert("Создано!"))
    }

    return <>
        <NavLink to={SHOP_ROUTE} className="back">Назад</NavLink>
            <h1 className="m_panel_title">Создайте свой курс!</h1>
        <div style={{width: "60%", marginLeft: "20%"}}>
            <label className="c_title2">
                Создайте свой курс, заполнив форму данными и прикрепив необходимые изображения и материалы в текстовом формате.
                Все прикреплённые материалы будут выложены в общий доступ.
            </label>
        </div>

        <div className="creating-panel">
            <label>Название<font color="#8b0000">*</font>:</label>
            <input type="text"
                value={name}
                   onChange={e => setName(e.target.value)}
            /> <br/>
            <label>Описание<font color="#8b0000">*</font>:</label>
            <textarea
                value={description}
                onChange={e => setDescription(e.target.value)}
            /> <br/>
            <label>Выберите категорию<font color="#8b0000">*</font>:</label><br/>
            <div>
                {course.categories.map(category =>
                    <div style={{marginLeft: "50px"}}>
                        <input type="radio" name="rb" id={category.id}/>
                        <label
                            htmlFor={category.id}
                            onClick={() => course.setSelectedCategory(category)}
                            key={category.id}
                        >
                            {category.name}
                        </label>
                    </div>
                )}
            </div>
            <div className="line-div">
                <label>Опишите навыки, которые смогут приобрести ученики после прохождения курса<font color="#8b0000">*</font> (минимум 1 навык):</label><br/>
                <button onClick={addSkills}>Добавить навык</button><br/>
                {skills.map(i =>
                    <div key={i.number}>
                        <input
                            value={i.description}
                            onChange={(e) => changeSkills('description', e.target.value, i.number)}
                            type="text" placeholder="Введите описание навыка"
                        />
                        <button onClick={() => removeSkill(i.number)}>удалить</button>
                    </div>)
                }
            </div>

            <label>Добавьте обложку на карточку курса<font color="#8b0000">*</font>:</label><br/>

            <label className="input-file">
                <input
                    onChange={selectFile}
                    accept="image/*, .png, .jpeg"
                    type="file"
                    name="file"
                    id="uploaded-file"
                />
                <span id="file-name">Выберите файл</span>
            </label>
             <br/>
            <label>Введите текст. Не забудьте указать авторство!<font color="#8b0000">*</font>:</label>
            <textarea id="cont"
                value={content}
                onChange={e => setContent(e.target.value)}
                placeholder="Начните писать!"
            /> <br/>

            <div className="line-div">
                <label>Добавьте изображения:</label><br/>
                <label className="input-file">
                    <input
                        onChange={selectFile1}
                        accept="image/*, .png, .jpeg"
                        type="file"
                        name="file"
                        id="uploaded-file1"
                    />
                    <span id="file-name1">Выберите файл</span>
                </label>
                <br/>
                <label className="input-file">
                    <input
                        onChange={selectFile2}
                        accept="image/*, .png, .jpeg"
                        type="file"
                        name="file"
                        id="uploaded-file2"
                    />
                    <span id="file-name2">Выберите файл</span>
                </label>
                <br/>
                <label className="input-file">
                    <input
                        onChange={selectFile3}
                        accept="image/*, .png, .jpeg"
                        type="file"
                        name="file"
                        id="uploaded-file3"
                    />
                    <span id="file-name3">Выберите файл</span>
                </label>
                <br/>

            </div>

            <button style={{margin: "0 auto", display: "block"}} onClick={addCourse}>Создать</button>
        </div>

    </>
});
export default CreatingCourse;