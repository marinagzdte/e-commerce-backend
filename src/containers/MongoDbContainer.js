import mongoose from "mongoose";
import config from '../config.js'
//import { asPOJO, renameField, removeField } from '../utils/objectUtils.js'

class MongoDbContainer {
    constructor(modelName, schema) {
        this.model = mongoose.model(modelName, schema)
    }

    async save(object) {
        try {
            await this.model.create(object);
        } catch (error) {
            throw new Error(`No se pudo guardar: ${error}`);
        }
    }

    async getById(objectId) {
        try {
            const res = await this.model.find({ _id: objectId }, { __v: 0 })
            console.log(res)
            return res
        } catch (error) {
            throw new Error(`No se pudo recuperar por id ${objectId}: ${error}`);
        }
    }

    async modifyItemById(newObject) {
        try {
            return await this.model.replaceOne({ _id: newObject._id }, newObject)
        } catch (error) {
            throw new Error(`No se pudo actualizar por id ${objectId}: ${error}`);
        }
    }

    async getAll() {
        try {
            return await this.model.find({}, { __v: 0 });
        } catch (error) {
            throw new Error(`No se pudo recuperar: ${error}`);
        }
    }

    async deleteById(objectId) {
        try {
            return await this.model.deleteOne({ _id: objectId });
        } catch (error) {
            throw new Error(`No se pudo eliminar el objeto de id ${objectId}: ${error}`);
        }
    }

    async deleteAll() {
        try {
            return await this.model.deleteMany({})
        } catch (error) {

        }
    }
}

export default MongoDbContainer;