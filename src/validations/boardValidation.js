import Joi from 'joi'
import { StatusCodes } from 'http-status-codes'
import ApiError from '~/utils/ApiErrors'
import { BOARD_TYPES } from '~/utils/constants'

const createNew = async ( req, res, next ) => {
  // Mặc định chúng ta không cần custom message ở BE vì để cho FE tự validate và custom message cho đẹp
  // BE chỉ cần validate đảm bảo dữ liệu chuẩn xác và trả về message mặc định từ thư viện là được
  // Quan trọng: Việc validate dữ liệu bắt buộc phải có ở phía BE vì đây là điểm cuối để lưu trữ dữ liệu vào data
  // Thông thường trong thực tế, điều tốt nhất cho hệ thống là hãy luôn validate dữ liệ cả BE và FE
  const correctConditon = Joi.object({
    title: Joi.string().required().min(3).max(50).trim().strict().messages({
      // Custom Message
      // 'any.required': 'Title is required(hanzdev)'
    }),
    description: Joi.string().required().min(3).max(255).trim().strict(),
    type: Joi.string().valid(BOARD_TYPES.PUBLIC, BOARD_TYPES.PRIVATE).required()
  })

  try {
    // console.log('req.body:', req.body)

    // Set abortEarly false trường hợp nhiều lỗi validation trả về tất cả
    await correctConditon.validateAsync(req.body, { abortEarly: false })

    // Validate dữ liệu xong thì cho request sang Controller
    next()
    // res.status(StatusCodes.CREATED).json({ message: ' post: from validation API create new board' })
  } catch (error) {
    // const errorMessage = new Error(error).message
    // const customError = new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, errorMessage)
    next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, new Error(error).message))

    // res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
    //   errors: new Error(error).message
    // })
  }
}

const update = async ( req, res, next ) => {
  // Khonong dung require() tron trường hợp update
  const correctConditon = Joi.object({
    title: Joi.string().min(3).max(50).trim().strict(),
    description: Joi.string().min(3).max(255).trim().strict(),
    type: Joi.string().valid(BOARD_TYPES.PUBLIC, BOARD_TYPES.PRIVATE)
  })

  try {
    // console.log('req.body:', req.body)
    // Set abortEarly false trường hợp nhiều lỗi validation trả về tất cả
    await correctConditon.validateAsync(req.body, {
      abortEarly: false,
      allowUnknown: true
    })

    // Validate dữ liệu xong thì cho request sang Controller
    next()
    // res.status(StatusCodes.CREATED).json({ message: ' post: from validation API create new board' })
  } catch (error) {
    // const errorMessage = new Error(error).message
    // const customError = new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, errorMessage)
    next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, new Error(error).message))

    // res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
    //   errors: new Error(error).message
    // })
  }
}

export const boardValidation = {
  createNew,
  update
}