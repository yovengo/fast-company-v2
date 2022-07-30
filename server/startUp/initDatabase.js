// 1. У любого пользователья будет минимум в БД qualities & professions
// 2. Они равны mock данным

const Profession = require('../models/Profesion')
const Quality = require('../models/Quality')
const professionMock = require('../mock/professions.json')
const qualitiesMock = require('../mock/qualities.json')



module.exports = async () => {
  const professions = await Profession.find()
    if (professions.length !== professionMock.lenght) {
       await createInitialEntity(Profession, professionMock)
    }
}

module.exports = async () => {
    const qualities = await Quality.find()
    if (qualities.length !== qualitiesMock.lenght) {
        await createInitialEntity(Quality, qualitiesMock) 
    }
}

async function createInitialEntity(Model, data) {
    await Model.collection.drop()
    return Promise.all(
        data.map(async item => {
            try {
                delete item._id
                const newItem = new Model(item)
                await newItem.save()
                return newItem
            }catch (error) {
                return error
            }
        })
    )
}