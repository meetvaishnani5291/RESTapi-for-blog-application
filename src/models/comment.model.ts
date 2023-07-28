import { Schema, model, Document, Types } from 'mongoose';

interface IComment extends Document {
  blogId: Types.ObjectId;
  content: string;
  commenterId: Types.ObjectId;
}

const commentSchema = new Schema<IComment>({
  blogId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  commenterId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
});

const Comment = model<IComment>('Comment', commentSchema);

export default Comment;
