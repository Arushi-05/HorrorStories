export function sendResponse(res, statusCode, payload, contentType){
    res.statusCode=statusCode
    res.setHeader('Content-type', contentType)
    res.end(payload);

}