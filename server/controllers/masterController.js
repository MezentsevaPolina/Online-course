const ApiError = require('../errors/ApiErrors');
const {Category, Master} = require("../models/models");
class MasterController{
    async registration(req, res){

    }
    async login(req, res){

    }
    async check(req, res, next){
        const {id} = req.query
        if (!id) {
            return next(ApiError.badRequest('Не задан ID'))
        }
        res.json(id)
    }
    async create(req, res){
        const {name, email, password, qualification} = req.body
        const master = await Master.create({name, email, password, qualification})
        return res.json(master)
    }
    async getAll(req, res){
        const masters = await Master.findAll()
        return res.json(masters)
    }
}

module.exports = new MasterController()