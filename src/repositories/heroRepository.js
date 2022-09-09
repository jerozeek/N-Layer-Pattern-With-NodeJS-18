import { readFile, writeFile } from 'node:fs/promises'

export default class HeroRepository {

    constructor({file}) {
        this.file = file
    }

    async #createFileContent() {
        return JSON.parse(await readFile(this.file))
    }

    find() {
        return this.#createFileContent()
    }

    async create(data) {
        const currentFile = await this.#createFileContent()
        currentFile.push(data);
        await writeFile(this.file, JSON.stringify(currentFile));
        return data.id;
    }

}