import { Schema, model } from 'mongoose';
import { ICategoryModel, TCategory } from './category.interface';

//category schema object
const categorySchema = new Schema<TCategory, ICategoryModel>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    createdBy: { type: Schema.ObjectId, required: true, ref: 'User' },
  },
  { timestamps: true },
);
categorySchema.statics.isCategoryExists = async function (id) {
  const existingCategory = await this.findById(id);
  return existingCategory ? true : false;
};
//category model
export const Category = model<TCategory, ICategoryModel>('Category', categorySchema);
