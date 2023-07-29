import express from 'express';
import {
  createBlog,
  updateBlog,
  deleteBlog,
  getAllBlogs,
  getMyBlogs,
  getBlogByID,
} from '../controllers/blog.controller';

import validateRequest from "../middlewares/validation.middleware";
import { createBlogSchema } from '../validations/createBlogSchema';
import { updateBlogSchema } from '../validations/updateBlogSchema';
import fetchQueryPerameter from '../middlewares/pagination.middleware';


const router = express.Router();

// Route for creating a new blog
router.post('', validateRequest(createBlogSchema), createBlog);

// Route for updating an existing blog
router.put('/:id', validateRequest(updateBlogSchema), updateBlog);

// Route for deleting a blog
router.delete('/:id', deleteBlog);

// Route for fetching all blogs from users
router.get( '/myblogs',fetchQueryPerameter, getMyBlogs);

// Route for fetching a specific blog by its ID
router.get('/:id', getBlogByID);

// Route for fetching all blogs with pagination and sorting support
router.get('', fetchQueryPerameter, getAllBlogs);


export default router;
