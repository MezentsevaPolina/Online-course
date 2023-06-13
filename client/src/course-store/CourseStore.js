import {makeAutoObservable} from "mobx";

export default class CourseStore{
    constructor(){
        this._categories = []
        this._courses = []
        this._selectedCategory = {}
        makeAutoObservable(this)
    }
    setCategories(category){
        this._categories = category
    }
    setCourses(course){
        this._courses = course
    }
    setSelectedCategory(category){
        this._selectedCategory = category
    }
    get categories(){
        return this._categories
    }
    get courses(){
        return this._courses
    }
    get selectedCategory(){
        return this._selectedCategory
    }
}