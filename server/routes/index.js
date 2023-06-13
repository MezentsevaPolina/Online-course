const Router = require('express')
const router = new Router()
const courseRouter = require('./courseRouter')
const categoryRouter = require('./categoryRouter')
const userRouter = require('./userRouter')
const masterRouter = require('./masterRouter')

router.use('/course', courseRouter)
router.use('/category', categoryRouter)
router.use('/user', userRouter)
router.use('/master', masterRouter)

module.exports = router