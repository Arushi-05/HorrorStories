import http from "node:http";
import path from 'node:path';
import fs from 'node:fs/promises';
import { handleNews, handlePost, handleGet } from "./handlers/routeHandlers.js";
import { getData } from './utils/getdata.js'
import { serveStatic } from './utils/serveStatic.js'
const PORT = 8000;

const __dirname = import.meta.dirname

const server = http.createServer(async (req, res) => {
    if (req.url === '/api') {
        if (req.method === 'GET') {
            return await handleGet(res)

        }
        else if (req.method === 'POST') {
            await handlePost(res, req)

        }

    }
    else if (req.url === '/api/news') {
        return await handleNews(res, req)
    }
    else if (!req.url.startsWith('/api')) {
        await serveStatic(res, req, __dirname)

    }
})

server.listen(PORT, () => console.log(`Love you ${PORT}.`))