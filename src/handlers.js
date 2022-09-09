import { parse, fileURLToPath } from 'node:url'
import { join, dirname } from 'node:path'
import {
    DEFAULT_HEADER
} from "./utils/utils.js";
import {routes} from "./routes/heroRoute.js";
import { generateInstance } from './factories/heroFactory.js';

const currentDir       = dirname(fileURLToPath(import.meta.url))
const filePath          = join(currentDir, './../database', 'data.json');

const heroService   = generateInstance({filePath});
const heroRoute     = routes({
    heroService
})

const allRoutes = {
    ...heroRoute,
    default: (request, response) => {
        response.writeHead(404, DEFAULT_HEADER)
        response.write('Hello')
        response.end('404')
    }
}

function handlers(request, response)
{
    const { url, method }   = request;
    const { pathname }      = parse(url, true);
    const key               = `${pathname}:${method.toLowerCase()}`;
    const allowedRoutes     = allRoutes[key] || allRoutes.default
    return Promise.resolve(allowedRoutes(request, response)).catch(handlerError(response))
}

function handlerError(response) {
    return error => {
        console.error('An error occur ', error.stack)
        response.writeHead(500, DEFAULT_HEADER);
        response.write(JSON.stringify({
            error: 'Internal server error',
        }))

        return response.end();
    }
}

export default handlers;