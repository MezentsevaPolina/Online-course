const sequelize = require('../db')

const {DataTypes} = require('sequelize')


const User = sequelize.define('user', { //пользователь
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement:true},
    name: {type: DataTypes.STRING},
    email: {type: DataTypes.STRING, unique: true},
    password: {type: DataTypes.STRING},
    role: {type: DataTypes.STRING, defaultValue: "MASTER"},
    qualification: {type: DataTypes.STRING, defaultValue: "none"},
    town: {type: DataTypes.STRING},
    dateOfBirth: {type: DataTypes.STRING}
})

const Favourites = sequelize.define('favourites', { //избранное
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement:true},
})

const FavouritesCourses = sequelize.define('favourites_courses', { //избранные курсы
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement:true},
})

const Certificates = sequelize.define('certificates', { //сертификаты-раздел
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement:true},
})

const CertificatesCourses = sequelize.define('certificates_courses', { //сертификаты
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement:true},
})

const Course = sequelize.define('course', { //курс
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement:true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
    description: {type: DataTypes.STRING, allowNull: false},
    rating: {type: DataTypes.INTEGER, defaultValue: 0},
    price: {type: DataTypes.INTEGER},
    duration1: {type: DataTypes.INTEGER},
    content: {type: DataTypes.TEXT, allowNull: false},
    img: {type: DataTypes.STRING},
    material1: {type: DataTypes.STRING},
    material2: {type: DataTypes.STRING},
    material3: {type: DataTypes.STRING}
})

const Category = sequelize.define('category', { //категория курса
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement:true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false}
})

const Rating = sequelize.define('rating', { //рейтинг курса
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement:true},
    rate: {type: DataTypes.INTEGER, allowNull: false}
})

const CourseMaterials = sequelize.define('course-materials', { //материалы курса
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    filename: {type: DataTypes.STRING, allowNull: false},
    title: {type: DataTypes.STRING, allowNull: false},
    description: {type: DataTypes.STRING, allowNull: false}
})

const CourseSkills = sequelize.define('course-skills', { //список навыков курса
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    description: {type: DataTypes.STRING, allowNull: false}
})


User.hasOne(Favourites)     //1 to 1
Favourites.belongsTo(User)

User.hasOne(Certificates)     //1 to 1
Certificates.belongsTo(User)

User.hasMany(Rating)    //1 to many
Rating.belongsTo(User)

Favourites.hasMany(FavouritesCourses)   //1 to many
FavouritesCourses.belongsTo(Favourites)

Certificates.hasMany(CertificatesCourses)   //1 to many
CertificatesCourses.belongsTo(Certificates)

Course.hasOne(FavouritesCourses) //1 to 1
FavouritesCourses.belongsTo(Course)

Course.hasMany(Rating) //1 to many
Rating.belongsTo(Course)

Course.hasMany(CourseSkills, {as: 'skills'});
CourseSkills.belongsTo(Course)

Course.hasMany(CourseMaterials, {as: 'materials'});
CourseMaterials.belongsTo(Course)

Category.hasMany(Course)    //1 to many
Course.belongsTo(Category)

User.hasMany(Course)  //1 to many
Course.belongsTo(User)


module.exports = {
    User,
    Favourites,
    FavouritesCourses,
    Certificates,
    CertificatesCourses,
    Course,
    Rating,
    Category,
    CourseMaterials,
    CourseSkills
}