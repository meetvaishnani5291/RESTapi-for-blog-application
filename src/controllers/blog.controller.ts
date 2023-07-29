import { NextFunction, Response } from 'express';
import Blog, { IBlog } from '../models/blog.model';
import { CustomRequest } from '../interfaces/customRequest.interface';
import { CreateBlog, UpdateBlog } from '../types/blogs.type';
import { getFilteredBlogs } from '../utils/getFilteredBlogs.util';
import { NotFoundExpception } from '../errors/customErrors';

// Function to create a new blog post
export const createBlog = async (req: CustomRequest, res: Response,next : NextFunction) => {
  try {
    const authorId :string = req.user!._id; 

    const blog: IBlog = await Blog.create({ ...req.body as CreateBlog, authorId });

    res.status(201).json(blog);
  } catch (error) {
      next(error);
  }
};

// Function to update an existing blog post
export const updateBlog = async (req: CustomRequest, res: Response,next : NextFunction) => {
  try {
    const blogId = req.params.id;

    let updatedBlog: IBlog | null = await Blog.findByIdAndUpdate(
      blogId,
      req.body as UpdateBlog,
    );

    if (!updatedBlog) throw new NotFoundExpception("Blog not found");

    updatedBlog = await Blog.findById(blogId);
    res.json(updatedBlog);
  } catch (error) {
    next(error);
  }
};

// Function to delete a blog post
export const deleteBlog = async (req: CustomRequest, res: Response,next : NextFunction) => {
  try {
    const blogId = req.params.id;

    const deletedBlog: IBlog | null = await Blog.findByIdAndDelete(blogId);

    if (!deletedBlog) throw new NotFoundExpception("Blog not found");

    res.json(deletedBlog);
  } catch (error) {
    next(error);
  }
};

// Function to fetch a specific blog post by its ID
export const getBlogByID = async (req: CustomRequest, res: Response,next : NextFunction) => {
    try {
        const blogId = req.params.id;
    
      const blog: IBlog | null = await Blog.findOne({_id: blogId});
      
      if (!blog) throw new NotFoundExpception("Blog not found");
  
      res.json(blog);
    } catch (error) {
      next(error);
    }
  };

// Function to fetch all blogs posted by user
export const getMyBlogs = async (req: CustomRequest, res: Response,next : NextFunction) => {
  try {
    const userId : string = req.user!._id;
    const blogs = await getFilteredBlogs(req.blogQueryOptions!,userId);
    if (blogs.length === 0) throw new NotFoundExpception( 'Blog not found' );
    
    res.json(blogs);
  } catch (error) {
    next(error);
  }
};

// Function to fetch all blog posts with pagination support
export const getAllBlogs = async (req: CustomRequest, res: Response,next : NextFunction) => {
  try {
    const blogs =await getFilteredBlogs(req.blogQueryOptions!);
    if (blogs.length ===0) throw new NotFoundExpception("Blog not found"); 
    res.json(blogs);
  } catch (error) {
    next(error);
  }
};
