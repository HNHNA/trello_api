/* eslint-disable quotes */
/* eslint-disable no-useless-catch */
import { slugify } from "~/utils/formatters"
import { boardModel } from "~/models/boardModel"
import { findOneById } from "~/models/boardModel"

const createNew = async( reqBody ) => {
  try {
    // Xử lí logic dữ liệu
    const newBoard = {
      ...reqBody,
      slug: slugify(reqBody.title)
    }

    // Gọi tới tấng model để xử lý lưu ghi newBoarđ vào Database
    const createdBoard = await boardModel.createNew(newBoard)

    // Lấy bản ghi board sau khi gọi ( tùy mục đích)
    const getNewBoard = await boardModel.findOneById(createdBoard.insertedId)
    // console.log('getNewBoard:', getNewBoard)

    //Làm thêm các xử lý logic khác với các Collection khác tùy đặc thù dự án
    //Bắn Email, notification về cho admin khi có 1 board mới được tạo

    // Trả kết quả về, trong service phải luôn có return
    return getNewBoard
  } catch (error) { throw error }
}


export const boardService = {
  createNew
}