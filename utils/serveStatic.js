import path from 'node:path';
import {getContentType} from './getContentType.js'
import fs from 'node:fs/promises';
import { sendResponse } from './sendResponse.js'

export async function serveStatic(res, req,baseDir){
    const publicDir=path.join(baseDir, 'public')
    const filePath = path.join(publicDir, req.url ==='/'? 'index.html': req.url)
    const ext =path.extname(filePath)
    const contentType=getContentType(ext)
    try {
        const content= await fs.readFile(filePath)
        sendResponse(res, 200, content, contentType)

    }
    catch(err){
        console.log(err)
        if (err.code === 'ENOENT'){
            const content= await fs.readFile(path.join(publicDir, '404.html'))
            sendResponse(res, 404, content, 'text/html')
        }
        else{
            
            sendResponse(res , 500,  `<html><h1>Server error:${err.code}</h1></html>`,'text/html')
        

        }
    }
}