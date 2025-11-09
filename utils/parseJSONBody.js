export async function parseJSONBody(req) {

    for await (const chunk of req) {
        let body = ""
        body += chunk
        try {
            const parsedBody = JSON.parse(body)
            return parsedBody
        }
        catch (err) {
            console.log(`Invalid JSON format:" ${err}`)

        }
    }
}