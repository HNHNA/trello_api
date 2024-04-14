import Joi from 'joi'
import { StatusCodes } from 'http-status-codes'

const createNew = async ( req, res ) => {
  // Mặc định chúng ta không cần custom message ở BE vì để cho FE tự validate và custom message cho đẹp
  // BE chỉ cần validate đảm bảo dữ liệu chuẩn xác và trả về message mặc định từ thư viện là được
  // Quan trọng: Việc validate dữ liệu bắt buộc phải có ở phía BE vì đây là điểm cuối để lưu trữ dữ liệu vào data
  // Thông thường trong thực tế, điều tốt nhất cho hệ thống là hãy luôn validate dữ liệ cả BE và FE
  const correctConditon = Joi.object({
    title: Joi.string().required().min(3).max(50).trim().strict().messages({
      'any.required': 'Title is required(hanzdev)'
    }),
    description: Joi.string().required().min(3).max(256).trim().strict()
  })

  try {
    console.log('req.body:', req.body)

    // Set abortEarly false trường hợp nhiều lỗi validation trả về tất cả
    await correctConditon.validateAsync(req.body, { abortEarly: false })

    // next()
    res.status(StatusCodes.CREATED).json({ message: ' post: from validation API create new board' })
  } catch (error) {
    console.log(error)
    res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
      errors: new Error(error).message
    })
  }
}

export const boardValidation = {
  createNew
}