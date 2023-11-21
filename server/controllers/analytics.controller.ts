import { Request, Response, NextFunction } from "express";
import { catchAsyncError } from "../middleware/catch-async-error";
import ErrorHandler from "../utils/error-handler";
import { generateTwelveMonthsData } from "../utils/generate-analytics";
import userModel from "../models/user.model";
import CourseModel from "../models/course.model";
import OrderModel from "../models/order.model";

// get user analytics -- only admin can access
export const getUserAnalytics = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const usersData = await generateTwelveMonthsData(userModel);

      res.status(200).json({
        success: true,
        usersData,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

// get course analytics -- only admin can access
export const getCourseAnalytics = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const courseData = await generateTwelveMonthsData(CourseModel);

      res.status(200).json({
        success: true,
        courseData,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

// get order analytics -- only admin can access
export const getOrderAnalytics = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const orderData = await generateTwelveMonthsData(OrderModel);

      res.status(200).json({
        success: true,
        orderData,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);
