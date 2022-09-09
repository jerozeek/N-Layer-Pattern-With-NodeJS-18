import test from 'node:test';
import assert from "node:assert";
import { routes } from '../../../src/routes/heroRoute.js';
import {DEFAULT_HEADER} from "../../../src/utils/utils.js";
const callTracker = new assert.CallTracker();

process.on('exit', () => callTracker.verify())


test('hero routes endpoint test suite', async (t) => {

    await t.todo('it should call /heroes:get route', async (t) => {

        const databaseMock = [{"id":"510c1327-b064-4231-a1cb-78bfeffd337e","name":"Batman","age":50,"power":"rich"}];

        const heroServiceStub = {
            find: async () => databaseMock
        }

        const endpoints = routes({
            heroService:heroServiceStub
        })

        const endpoint = "/heroes:get";
        const request = {};
        const response = {
            write: callTracker.calls(item => {
                const expected = JSON.stringify({
                    results: databaseMock
                })

                assert.strictEqual(item, expected, 'write should be called with the correct payload');
            }),
            end : callTracker.calls(item => {
                assert.strictEqual(item, undefined, 'And should be called without params')
            })
        }
        const route = endpoints[endpoint];
        await route(request, response)
    })
    await t.todo('it should call /heroes:post route', async (t) => {

    })
})

