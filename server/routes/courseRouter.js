const Router = require('express')
const router = new Router()
const courseController = require('../controllers/courseController')
const checkRole = require('../middleware/chekRoleMiddleware')


router.post('/',checkRole('MASTER'), courseController.create)
router.get('/',courseController.getAll)
router.get('/:id', courseController.getOne)
router.put('/:id', courseController.update)
router.delete('/:id', courseController.delete)

module.exports = router