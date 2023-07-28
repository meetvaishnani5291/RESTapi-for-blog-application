import { Schema, model, Document,Types } from 'mongoose';

interface IBlog extends Document {
  title: string;
  content: string;
  author: Types.ObjectId; // Assuming it will be the user's ObjectId as a string
  category: string[];
  tags: string[];
  likes: string[]; // Assuming it will be an array of user's ObjectId as strings
  createdAt: Date;
}

const blogSchema = new Schema<IBlog>({
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 200,
  },
  content: {
    type: String,
    required: true,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  category: [
    {
      type: String,
      trim: true,
      maxlength: 50,
    },
  ],
  tags: [
    {
      type: String,
      trim: true,
      maxlength: 50,
    },
  ],
  likes: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  // comments: [
  //   {
  //     text: {
  //       type: String,
  //       required: true,
  //       maxlength: 500,
  //     },
  //     commenter: {
  //       type: Schema.Types.ObjectId,
  //       ref: 'User',
  //       required: true,
  //     },
  //     createdAt: {
  //       type: Date,
  //       default: Date.now,
  //     },
  //   },
  // ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Blog = model<IBlog>('Blog', blogSchema);

export default Blog;
