import React, {createContext} from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import UserStore from "./course-store/UserStore";
import CourseStore from "./course-store/CourseStore";


export const Context = createContext(null)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Context.Provider value={{
        user: new UserStore(),
        course: new CourseStore()
    }}>
        <App />
    </Context.Provider>
);

