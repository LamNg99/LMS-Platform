import mongoose, { Document, Model, Schema } from "mongoose";
import { UserProps } from "./user.model";

interface CommentProps extends Document {
  user: UserProps;
  question: string;
  reply?: CommentProps[];
}

interface ReviewProps extends Document {
  user: UserProps;
  rating: number;
  comment: string;
  repliedComment?: CommentProps[];
}

interface LinkProps extends Document {
  title: string;
  url: string;
}

interface CourseDataProps extends Document {
  title: string;
  description: string;
  videoUrl: string;
  videoThumbnail: object;
  videoSection: string;
  videoLength: number;
  videoPlayer: string;
  link: LinkProps[];
  suggestion: string;
  question: CommentProps[];
}

interface CourseProps extends Document {
  name: string;
  description?: string;
  price: number;
  estimatedPrice?: number;
  thumbnail: object;
  tags: string;
  level: string;
  demoUrl: string;
  benefit: { title: string }[];
  prerequisite: { title: string }[];
  review: ReviewProps[];
  courseData: CourseDataProps[];
  rating?: number;
  purchased?: number;
}

const reviewSchema = new Schema<ReviewProps>({
  user: Object,
  rating: {
    type: Number,
    default: 0,
  },
  comment: String,
  repliedComment: [Object],
});

const linkSchema = new Schema<LinkProps>({
  title: String,
  url: String,
});

const commentSchema = new Schema<CommentProps>({
  user: Object,
  question: String,
  reply: [Object],
});

const courseDataSchema = new Schema<CourseDataProps>({
  videoUrl: String,
  //videoThumbnail: Object,
  title: String,
  videoSection: String,
  description: String,
  videoLength: Number,
  videoPlayer: String,
  link: [linkSchema],
  suggestion: String,
  question: [commentSchema],
});

const courseSchema = new Schema<CourseProps>(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    estimatedPrice: {
      type: Number,
    },
    thumbnail: {
      public_id: {
        type: String,
        //require: true,
      },
      url: {
        type: String,
        //require: true,
      },
    },
    tags: {
      type: String,
      required: true,
    },
    level: {
      type: String,
      required: true,
    },
    demoUrl: {
      type: String,
      required: true,
    },
    benefit: [
      {
        title: String,
      },
    ],
    prerequisite: [
      {
        title: String,
      },
    ],
    review: [reviewSchema],
    courseData: [courseDataSchema],
    rating: {
      type: Number,
      default: 0,
    },
    purchased: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const CourseModel: Model<CourseProps> = mongoose.model("Course", courseSchema);

export default CourseModel;
