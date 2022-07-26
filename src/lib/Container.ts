import fs from 'fs';

class Container {
    route: string;

    constructor(route: string) {
        this.route = route;
    }

    async save(object: any) {
        try {
            const allObjects = await this.getAll();
            const currentLength = allObjects.length;
            object.id = currentLength === 0 ? 1 : allObjects[currentLength - 1].id + 1;
            allObjects.push(object);

            await fs.promises.writeFile(this.route, JSON.stringify(allObjects, null, 2));
            return object.id;
        } catch (error) {
            throw new Error(`No se pudo guardar el objeto: ${error}`);
        }
    }

    async getById(objectId: number) {
        try {
            const allObjects = await this.getAll();

            const object = allObjects.find(obj => obj.id === objectId);
            if (object === undefined)
                throw new Error(`No se encontró el objeto.`);

            return object;
        } catch (error) {
            throw new Error(`No se pudo recuperar el objeto de id ${objectId}: ${error}`);
        }
    }

    async modifyItemById(objectId, newData) {
        const allObjects = await this.getAll();
        const index = allObjects.findIndex(item => item.id === objectId)
        if (index === -1)
            return null

        const object = allObjects[index];
        for (const prop in newData) {
            object[prop] = newData[prop];
        }
        allObjects[index] = object;

        await fs.promises.writeFile(this.route, JSON.stringify(allObjects, null, 2));
        return object;
    }


    async getAll() {
        try {
            const content = await fs.promises.readFile(this.route, 'utf-8');
            const allObjects = JSON.parse(content);

            return allObjects
        } catch (error) {
            throw new Error(`No se pudieron recuperar los objetos del contenedor: ${error}`);
        }
    }

    async deleteById(objectId: number) {
        try {
            const allObjects = await this.getAll();

            const index = allObjects.findIndex(obj => obj.id === objectId);
            if (index === -1)
                throw new Error(`No se encontró el objeto.`);

            const object = allObjects.splice(index, 1)[0];
            await fs.promises.writeFile(this.route, JSON.stringify(allObjects, null, 2));

            return object;
        } catch (error) {
            throw new Error(`No se pudo eliminar el objeto de id ${objectId}: ${error}`);
        }
    }

    async deleteAll() {
        try {
            await fs.promises.writeFile(this.route, "[]");
        } catch (error) {
            throw new Error(`No se pudo vaciar el contenedor. ${error}`);
        }
    }
}

export default Container