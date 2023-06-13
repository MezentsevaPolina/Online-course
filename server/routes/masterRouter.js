const Router = require('express')
const router = new Router()
const masterController = require('../controllers/masterController')

router.post('/registration', masterController.registration)
router.post('/login', masterController.login)
router.get('/auth', masterController.check)
router.post('/',masterController.create)
router.get('/',masterController.getAll)

module.exports = router