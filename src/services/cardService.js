/* eslint-disable quotes */
import { cardModel } from "~/models/cardModel"
import { columnModel } from "~/models/columnModel"

const createNew = async( reqBody ) => {
  try {
    // Xử lí logic dữ liệu
    const newCard = {
      ...reqBody
    }
    // Gọi tới tấng model để xử lý lưu ghi newCard vào Database
    const createdCard = await cardModel.createNew(newCard)
    // Lấy bản ghi card sau khi gọi ( tùy mục đích)
    const getNewCard = await cardModel.findOneById(createdCard.insertedId)

    // ....
    if (getNewCard) {
      // Cập nhật mảng cardOrderIds trong collection columns
      await columnModel.pushCardOrderIds(getNewCard)
    }

    // Trả kết quả về, trong service phải luôn có return
    return getNewCard
  } catch (error) { throw error }
}

export const cardService = {
  createNew
}