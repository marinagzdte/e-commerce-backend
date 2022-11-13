import mongoose from "mongoose";

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

            return docs[0].lean();
        } catch (error) {
            throw new Error(`No se pudo recuperar por id ${objectId}: ${error}`);
        }
    }

    async getByCondition(condition) {
        try {
            return await this.model.findOne(condition, { __v: 0 }).lean();
        } catch (error) {
            const err = new Error(`No se pudo recuperar por condicion ${condition}: ${error}`)
            logger.logError(err);
            throw err;
        }
    }

    async modifyItemById(objectId, newObject) {
        try {
            const result = await this.model.replaceOne({ _id: objectId }, newObject)
            if (!result.acknowledged || result.modifiedCount != 1) {
                throw new Error('404 - No se encontró el elemento a actualizar.');
            }
        } catch (error) {
            throw new Error(`No se pudo actualizar por id ${objectId}: ${error}`);
        }
    }

    async getAll() {
        try {
            return await this.model.find({}, { __v: 0 }).lean();
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
            await this.model.deleteMany({});
        } catch (error) {
            throw new Error(`No se pudieron eliminar todos los elementos: ${error}`);
        }
    }
}

export default MongoDbContainer;