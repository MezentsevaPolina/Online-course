const {Course, CourseMaterials, CourseSkills, Category} = require("../models/models")
const ApiError = require('../errors/ApiErrors')
const uuid = require('uuid')
const path = require('path');

class CourseController{
    async create(req, res, next){
        try{
            let {name, description, price, duration1, content, categoryId, userId, materials, skills} = req.body
            const {img, material1, material2, material3} = req.files
            let fileName = uuid.v4() + img.name
            await img.mv(path.resolve(__dirname, '..', 'static', fileName))
            if (material2 && material3 && material1){
                let fileNameM1 = uuid.v4() + material1.name
                await material1.mv(path.resolve(__dirname, '..', 'static', fileNameM1))
                let fileNameM2 = uuid.v4() + material2.name
                await material2.mv(path.resolve(__dirname, '..', 'static', fileNameM2))
                let fileNameM3 = uuid.v4() + material3.name
                await material3.mv(path.resolve(__dirname, '..', 'static', fileNameM3))
                const course = await Course.create({name, description, price, duration1, content, categoryId, userId, img: fileName,
                    material1: fileNameM1, material2: fileNameM2,  material3: fileNameM3});
                return res.json(course)
            }
            if (material1 && material2){
                let fileNameM1 = uuid.v4() + material1.name
                await material1.mv(path.resolve(__dirname, '..', 'static', fileNameM1))
                let fileNameM2 = uuid.v4() + material2.name
                await material2.mv(path.resolve(__dirname, '..', 'static', fileNameM2))
                const course = await Course.create({name, description, price, duration1, content, categoryId, userId, img: fileName,
                    material1: fileNameM1,  material2: fileNameM2, material3: "example.jpg"});
                return res.json(course)
            }
            if (material1 && material3){
                let fileNameM1 = uuid.v4() + material1.name
                await material1.mv(path.resolve(__dirname, '..', 'static', fileNameM1))
                let fileNameM3 = uuid.v4() + material3.name
                await material3.mv(path.resolve(__dirname, '..', 'static', fileNameM3))
                const course = await Course.create({name, description, price, duration1, content, categoryId, userId, img: fileName,
                    material1: fileNameM1,  material3: fileNameM3, material2: "example.jpg"});
                return res.json(course)
            }
            if (material2 && material3){
                let fileNameM2 = uuid.v4() + material2.name
                await material2.mv(path.resolve(__dirname, '..', 'static', fileNameM2))
                let fileNameM3 = uuid.v4() + material3.name
                await material3.mv(path.resolve(__dirname, '..', 'static', fileNameM3))
                const course = await Course.create({name, description, price, duration1, content, categoryId, userId, img: fileName,
                    material2: fileNameM2,  material3: fileNameM3, material1: "example.jpg"});
                return res.json(course)
            }

            if (material1){
                let fileNameM1 = uuid.v4() + material1.name
                await material1.mv(path.resolve(__dirname, '..', 'static', fileNameM1))
                const course = await Course.create({name, description, price, duration1, content, categoryId, userId, img: fileName,
                    material1: fileNameM1, material2: "example.jpg", material3: "example.jpg"});
                return res.json(course)
            }
            if (material2){
                let fileNameM2 = uuid.v4() + material2.name
                await material2.mv(path.resolve(__dirname, '..', 'static', fileNameM2))
                const course = await Course.create({name, description, price, duration1, content, categoryId, userId, img: fileName,
                    material2: fileNameM2, material1: "example.jpg", material3: "example.jpg"});
                return res.json(course)
            }
            if (material3){
                let fileNameM3 = uuid.v4() + material3.name
                await material3.mv(path.resolve(__dirname, '..', 'static', fileNameM3))
                const course = await Course.create({name, description, price, duration1, content, categoryId, userId, img: fileName,
                    material3: fileNameM3, material2: "example.jpg", material1: "example.jpg"});
                return res.json(course)
            }

            if (materials) {
                materials = JSON.parse(materials)
                materials.forEach(i =>
                        CourseMaterials.create({
                            filename: fileName,
                            title: i.title,
                            description: i.description,
                            courseId: course.id
                        })
                )
            }
            if (skills) {
                skills = JSON.parse(skills)
                skills.forEach(i =>
                    CourseSkills.create({
                        description: i.description,
                        courseId: course.id
                    })
                )
            }
            const course = await Course.create({name, description, price, duration1, content, categoryId, userId, img: fileName});
            return res.json(course)

        } catch (e) {
            console.log(e)
            next(ApiError.badRequest(e.message))
        }

    }
    async getAll(req, res){
        let {categoryId, userId, limit, page} = req.query
        page = page || 1
        limit = limit || 20
        let offset = page * limit - limit
        let courses;
        if (!categoryId && !userId){ //не указано ничего
            courses = await Course.findAndCountAll({limit, offset,
                include: [
                    {model: Category, as: 'category'}
                ]})
        }
        if (categoryId && !userId){ //указана только категория
            courses = await Course.findAndCountAll({where:{categoryId}, limit, offset,
                include: [
                    {model: Category, as: 'category'}
                ]})
        }
        if (!categoryId && userId){ //указан только мастер
            courses = await Course.findAndCountAll({where:{userId}, limit, offset})
        }
        if (categoryId && userId){ //указано всё
            courses = await Course.findAndCountAll({where:{categoryId, userId}, limit, offset})
        }
        return res.json(courses)
    }
    async getOne(req, res){
        const {id} = req.params
        const course = await Course.findOne(
            {
                where: {id},
                include: [
                    {model: CourseSkills, as: 'skills'},
                    {model: CourseMaterials, as: 'materials'}
                ]
            }
        )
        return res.json(course)

    }
    async update(req, res){
        const course = req.body
        try{
            const updatedCourse = await Course.update(
                course,
                {where: {id: req.params.id}}
            )
            return res.json(updatedCourse)
        } catch (error){
            res.json({message: error.message})
        }
    }

    async delete (req, res){
        try{
            await Course.destroy(
                {where: {id: req.params.id}}
            )
            return res.json({message: "course deleted"})
        } catch (error){
            res.json({message: error.message})
        }
    }
}

module.exports = new CourseController()