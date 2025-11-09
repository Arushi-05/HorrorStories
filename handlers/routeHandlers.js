import { getData } from "../utils/getdata.js";
import { sendResponse } from "../utils/sendResponse.js";
import { parseJSONBody } from "../utils/parseJSONBody.js"
import { addNewSighting } from "../utils/addNewSighting.js";
import { sanitizeInput } from "../utils/sanitizeInput.js";
import { sightingEvents } from "../events/sightingEvents.js";
import { stories } from "../data/stories.js";

export async function handleGet(res) {

    const data = await getData()
    const content = JSON.stringify(data)
    sendResponse(res, 200, content, 'application/json')
}

export async function handlePost(res, req) {
    try {
        const parsedBody = await parseJSONBody(req)
        const sanitizedBody = sanitizeInput(parsedBody)
        await addNewSighting(sanitizedBody)
        sightingEvents.emit('sighting-added', sanitizedBody)
        sendResponse(res, 201, JSON.stringify(sanitizedBody), 'application/json')

    }
    catch (err) {
        sendResponse(res, 400, JSON.stringify({ error: err }), 'application/json')
    }

}
export async function handleNews(res, req) {
    res.statusCode = 200
    res.setHeader('Content-type', 'text/event-stream')
    res.setHeader('Cache-Control', 'no-cache')
    res.setHeader('Connection', 'keep-alive')
    let initialIndex = Math.floor(Math.random() * stories.length);
    res.write(`data: ${JSON.stringify({
        event: 'news-update',
        story: stories[initialIndex]
    })}\n\n`);
    setInterval(() => {

        let randomIndex = Math.floor(Math.random() * stories.length)
        res.write(`data: ${JSON.stringify({ event: 'news-update', story: stories[randomIndex] })}\n\n`)
    }, 3000)
}

