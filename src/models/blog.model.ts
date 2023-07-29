import { Schema, model, Document,Types } from 'mongoose';

 export interface IBlog extends Document {
  title: string;
  content: string;
  authorId: Types.ObjectId; 
  category: string[];
  tags: string[];
  likes: string[];
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
  authorId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
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
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
blogSchema.index({ title: 'text', tags: 'text', content: 'text' }, { weights: { title: 5, tags: 2, content: 1 } });

const Blog = model<IBlog>('Blog', blogSchema);

export default Blog;
