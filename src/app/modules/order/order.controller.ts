import httpStatus from 'http-status';
import sendResponse from '../../utils/catchAsync';
import catchAsync from '../../utils/sendResponse';
import { OrderServices } from './order.service';

const createOrder = catchAsync(async (req, res) => {
  const result = await OrderServices.createOrderIntoDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Order created successfully',
    data: result,
  });
});

export const OrderControllers = {
  createOrder,
};
