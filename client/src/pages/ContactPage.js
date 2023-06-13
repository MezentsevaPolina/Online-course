import React from 'react';
import "./styles/contacts.css"
import "../components/styles/login.css"
import '../components/styles/background.css'

const ContactPage = () => {
    function Results() {
        document.getElementById("show").classList.toggle("guide-show");
    }

    return <>
        <div className="contact_title">Наши контакты</div>
        <div className="pie" style={{borderRadius: "100% 0 0 0"}}></div>
        <div className="contact_title2">
            <label style={{fontWeight: "bold"}}>Разработка: </label><a href="https://github.com/MezentsevaPolina">Mezentseva Polina (github)</a><br/>
            <label style={{fontWeight: "bold"}}>Администрация: </label><a>+7 (ххх) ххх хх хх,</a> <a>(el.pochta@gmail.com)</a><br/>
            <label style={{fontWeight: "bold"}}>Модерация: </label><a>+7 (ххх) ххх хх хх,</a> <a>(el.pochta@gmail.com)</a><br/>
            <label style={{fontWeight: "bold"}}>VK: </label><a href="client/src/pages">ссыка на несозданную группу</a> <br/>
            <label style={{fontWeight: "bold"}}>Telegram: </label><a href="client/src/pages">ссылка на несозданный канал</a> <br/>
            <button onClick={Results} id="dangeon_master" className="button__log">Хочу стать мастером!</button><br/>
        <div className="guide" id="show">
            Отправь свою анкету, (анкета скорей всего будет прилагаться здесь в виде гугл-формы), на почту администратора (el.pochta@gmail.com) <br/>
            и прими участие в онлайн-собеседовании.
        </div>
        </div>
    </>
};

export default ContactPage;