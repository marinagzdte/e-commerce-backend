import mongoose from "mongoose";
//import { asPOJO, renameField, removeField } from '../utils/objectUtils.js'

class MongoDbContainer {
    constructor(modelName, schema) {
        this.model = mongoose.model(modelName, schema)
    }

    async save(object) {
        try {
            const newDoc = await this.model.create(object);
            return newDoc._id;
        } catch (error) {
            throw new Error(`No se pudo guardar: ${error}`);
        }
    }

    async getById(objectId) {
        try {
            const docs = await this.model.find({ _id: objectId }, { __v: 0 })
            if (docs.length != 1 || docs[0] === null || docs[0] === undefined)
                throw new Error('404 - No se encontró el elemento buscado.');

            return docs[0];
        } catch (error) {
            throw new Error(`No se pudo recuperar por id ${objectId}: ${error}`);
        }
    }

    async modifyItemById(newObject) {
        try {
            const result = await this.model.replaceOne({ _id: newObject._id }, newObject)
            if (!result.acknowledged || result.modifiedCount != 1) {
                throw new Error('404 - No se encontró el elemento a actualizar.');
            }
        } catch (error) {
            throw new Error(`No se pudo actualizar por id ${newObject._id}: ${error}`);
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
            const result = await this.model.deleteOne({ _id: objectId });
            if (!result.acknowledged || result.deletedCount != 1) {
                throw new Error('404 - No se encontró el elemento a borrar.');
            }
        } catch (error) {
            throw new Error(`No se pudo eliminar el objeto de id ${objectId}: ${error}`);
        }
    }

    async deleteAll() {
        try {
            return await this.model.deleteMany({});
        } catch (error) {
            throw new Error(`No se pudieron eliminar todos los elementos: ${error}`);
        }
    }
}

export default MongoDbContainer;