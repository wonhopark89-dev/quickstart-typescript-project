import mongoose, { Schema } from 'mongoose';
import IBlog from '../interfaces/blog';

/**
 * 같은 아이디값으로 다른 Schema 참조
 */
const BlogSchema: Schema = new Schema(
  {
    title: { type: String, unique: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    content: { type: String },
    headline: { type: String },
    picture: { type: String }
  },
  {
    timestamps: true
  }
);

export default mongoose.model<IBlog>('Blog', BlogSchema);
