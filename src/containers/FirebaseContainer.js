import config from '../config.js'
import admin from "firebase-admin";
import { initializeApp } from "firebase-admin/app";
import * as dotenv from 'dotenv';
dotenv.config({ path: '../.env' });

if (process.env.PERSISTENCE === 'firebase') {
    try {
        initializeApp({
            credential: admin.credential.cert(config.firebase)
        });
        console.log('conectado a la db')
    } catch (error) {
        console.log(`error al conectar con la db ${error}`)
    }
}

const db = admin.firestore();

class FirebaseContainer {
    constructor(collectionName) {
        this.collection = db.collection(collectionName);
    }

    async save(object) {
        try {
            const result = await this.collection.add(object);
            return result.id;
        } catch (error) {
            throw new Error(`No se pudo guardar: ${error}`);
        }
    }

    async getById(objectId) {
        try {
            const result = await this.collection.doc(objectId).get();
            if (!result.exists)
                throw new Error('404 - No se encontró el elemento buscado.');
            return { ...result.data(), id: objectId }
        } catch (error) {
            throw new Error(`No se pudo recuperar por id ${objectId}: ${error}`);
        }
    }

    async modifyItemById(objectId, newData) {
        try {
            await this.collection.doc(objectId).update(newData)
        } catch (error) {
            throw new Error(`No se pudo actualizar por id ${objectId}: ${error}`);
        }
    }

    async getAll() {
        try {
            const result = await this.collection.get();
            return result.docs.map(doc => { return { id: doc.id, ...doc.data() } });
        } catch (error) {
            throw new Error(`No se pudo recuperar: ${error}`);
        }
    }

    async deleteById(objectId) {
        try {
            await this.collection.doc(objectId).delete();
        } catch (error) {
            throw new Error(`No se pudo eliminar el objeto de id ${objectId}: ${error}`);
        }
    }

    async deleteAll() {
        try {
            const result = await this.collection.get();
            result.docs.forEach(doc => {
                doc.ref.delete();
            })
        } catch (error) {
            throw new Error(`No se pudieron eliminar todos los elementos: ${error}`);
        }
    }
}

export default FirebaseContainer;