const {Category} = require('../models/models')
const ApiError = require('../errors/ApiErrors');
class CategoryController{
    async create(req, res){
        const {name} = req.body
        const category = await Category.create({name})
        return res.json(category)
    }
    async getAll(req, res){
        const categories = await Category.findAll()
        return res.json(categories)
    }
    async update(req, res){
        const {name} = req.body
        try{
            const updatedCategory = await Category.update(
                {name},
                {where: {id: req.params.id}}
            )
            return res.json(updatedCategory)
        } catch (error){
            res.json({message: error.message})
        }
    }

    async delete (req, res){
        try{
            await Category.destroy(
                {where: {id: req.params.id}}
            )
            return res.json({message: "category deleted"})
        } catch (error){
            res.json({message: error.message})
        }
    }
}

module.exports = new CategoryController()