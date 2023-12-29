import { Schema, model } from 'mongoose';
import { ICourse, ICourseModel, IDetails, ITag } from './course.interface';

export const tagSchema = new Schema<ITag>({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

export const detailsSchema = new Schema<IDetails>({
  level: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
});

export const courseSchema = new Schema<ICourse, ICourseModel>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    instructor: {
      type: String,
      required: true,
      trim: true,
    },
    categoryId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    tags: [tagSchema],
    startDate: {
      type: String,
      required: true,
    },
    endDate: {
      type: String,
      required: true,
    },
    language: {
      type: String,
      required: true,
    },
    provider: {
      type: String,
      required: true,
    },
    durationInWeeks: {
      type: Number,
      required: true,
    },
    details: detailsSchema,
    createdBy: { type: Schema.ObjectId, required: true, ref: 'User' },
  },
  { timestamps: true },
);
// courseSchema.pre(/^find/, function (this: Query<ICourse, Document>, next) {

//   next();
// });

courseSchema.statics.isCourseExists = async function (id) {
  const existingCourse = await this.findById(id);
  return existingCourse ? true : false;
};

export const Course = model<ICourse, ICourseModel>('Course', courseSchema);
