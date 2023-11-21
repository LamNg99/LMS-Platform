import mongoose, { Document, Model, Schema } from "mongoose";

interface FaqProps extends Document {
  question: string;
  answer: string;
}

interface CategoryProps extends Document {
  title: string;
}

interface BannerImageProps extends Document {
  public_id: string;
  url: string;
}

interface LayoutProps extends Document {
  type: string;
  faq: FaqProps[];
  catagory: CategoryProps[];
  banner: {
    image: BannerImageProps;
    title: string;
    subtitle: string;
  };
}

const FaqSchema = new Schema<FaqProps>({
  question: {
    type: String,
  },
  answer: {
    type: String,
  },
});

const CatagorySchema = new Schema<CategoryProps>({
  title: {
    type: String,
  },
});

const BannerImageSchema = new Schema<BannerImageProps>({
  public_id: {
    type: String,
  },
  url: {
    type: String,
  },
});

const LayoutSchema = new Schema<LayoutProps>({
  type: {
    type: String,
  },
  faq: [FaqSchema],
  catagory: [CatagorySchema],
  banner: {
    image: BannerImageSchema,
    title: {
      type: String,
    },
    subtitle: {
      type: String,
    },
  },
});

const LayoutModel: Model<LayoutProps> = mongoose.model("Layout", LayoutSchema);

export default LayoutModel;
