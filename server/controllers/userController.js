const ApiError = require('../errors/ApiErrors');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {User, Favourites} = require('../models/models')

const generateJwt = (id, email, role) =>{
    return jwt.sign(
        {id, email, role},
        process.env.SECRET_KEY,
        {expiresIn: '24h'}
    )
}

class UserController{
    async registration(req, res, next){
        const {name, email, password} = req.body
        if (!email || !password){
            return next(ApiError.badRequest('Некорректный email или пароль'))
        }
        const candidate = await User.findOne({where: {email}})
        if (candidate){
            return next(ApiError.badRequest('Пользователь с таким email уже существует'))
        }
        const hashPassword = await bcrypt.hash(password, 5)
        const user = await User.create({name, email, password: hashPassword})
        const favourites = await Favourites.create({userId: user.id})
        const token = generateJwt(user.id, user.email, user.role)
        return res.json({token})
    }
    async login(req, res, next){
        const {email, password} = req.body
        const user = await User.findOne({where: {email}})
        if (!user){
            return next(ApiError.badRequest('Некорректный email'))
        }
        let comparePassword = bcrypt.compareSync(password, user.password)
        if (!comparePassword){
            return next(ApiError.badRequest('Некорректный пароль'))
        }
        const token = generateJwt(user.id, user.email, user.role)
        return res.json({token})
    }
    async check(req, res, next){
        const token = generateJwt(req.user.id, req.user.email, req.user.role)
        return res.json({token})
    }
    async getAll(req, res){
        const users = await User.findAll()
        return res.json(users)
    }
    async getOne(req, res){
        const {id} = req.params
        const user = await User.findOne(
            {where: {id}},
        )
        return res.json(user)
    }
    async update(req, res, next){
        const user = req.body
        try{
            const updatedUser = await User.update(
                user,
                {where: {id: req.params.id}}
            )
            return res.json(updatedUser)
        } catch (error){
            res.json({message: error.message})
        }
    }

    async delete (req, res){
        try{
            await User.destroy(
                {where: {id: req.params.id}}
            )
            return res.json({message: "user deleted"})
        } catch (error){
            res.json({message: error.message})
        }
    }
}

module.exports = new UserController()