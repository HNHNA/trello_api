/* eslint-disable quotes */
/* eslint-disable no-useless-catch */
import { slugify } from "~/utils/formatters"
import { boardModel } from "~/models/boardModel"
import { findOneById } from "~/models/boardModel"
import ApiError from "~/utils/ApiErrors"
import { StatusCodes } from "http-status-codes"
import { cloneDeep } from "lodash"

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

const getDetails = async( boardId ) => {
  try {
    // console.log('boardId:', boardId)

    const board = await boardModel.getDetails(boardId)
    if ( !board ) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'Board not found')
    }

    // Deep Clone taoj ra một cái mới để xứ lý, không ảnh hưởng tới board ban đầu, tùy mục đích về sau mà có clone deep hay không
    const resBoard = cloneDeep(board)
    // console.log('resBoard', resBoard)

    // Đưa card về đúng column của nó
    resBoard.columns.forEach(column => {
      // dùng equals này bởi vì ta hiểu ObjectId trong mongodb có support method equals
      column.cards = resBoard.cards.filter(card => card.columnId.equals(column._id))
      // covert ObjectId về string bằng hàm toString của Javasvcript
      // column.cards = resBoard.cards.filter(card => card.columnId.toString() === column._id.toString())
    })

    // Xóa mảng Card khỏi board ban đầu
    delete resBoard.cards

    return resBoard
  } catch (error) { throw error }
}

const update = async( boardId, reqBody ) => {
  try {
    const updateData = {
      ...reqBody,
      updateAt: Date.now()
    }
    const updatedBoard = await boardModel.update(boardId, updateData)
    return updatedBoard
  } catch (error) { throw error }
}


export const boardService = {
  createNew,
  getDetails,
  update
}