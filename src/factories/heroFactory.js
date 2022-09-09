import HeroRepository from "../repositories/heroRepository.js";
import HeroService from "../services/heroService.js";

const generateInstance = ({ filePath}) => {
    //handles the DB connections
    const heroRepository = new HeroRepository({file: filePath})
    return new HeroService({heroRepository})
}

export {generateInstance}
