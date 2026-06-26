import express from "express"
import authRegister from "../controller/auth.controller.js"
import userVerification from "../middleware/userVerification.js"

const authRoutes=express.Router()

authRoutes.post("/signup", userVerification({ mustNotExist: true }), authRegister.signup)
authRoutes.post("/login", userVerification({ mustExist: true }), authRegister.login)
authRoutes.post("/logout",authRegister.logout)

export default authRoutes;