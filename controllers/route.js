const express = require("express")

const router = express.Router()
const web = require("./web/burgersController")
const api = require("./api/burgersApiController")

router.use(web)
router.use(api)

module.exports = router