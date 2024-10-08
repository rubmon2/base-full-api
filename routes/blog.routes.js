import {deteleteBlog,createBlog,getAllblogs,getblogId,updateBlog} from "../controllers/blog.Controllers.js"
import express from "express"

const router= express.Router()



router.post("/",createBlog)
router.get("/",getAllblogs)
router.get("/:id",getblogId)
router.delete("/:id",deteleteBlog)
router.put("/:id",updateBlog)


export default router