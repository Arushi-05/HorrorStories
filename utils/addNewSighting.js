import { getData } from "./getdata.js";
import fs from 'node:fs/promises'
import path from "node:path";
export async function addNewSighting(newSighting) {
 try{
    const prevData = await getData();
    prevData.push(newSighting)
    const pathJSON= path.join('data', 'data.json')
    await fs.writeFile(pathJSON,JSON.stringify(prevData,null, 2),'utf8')
 }
 catch(err){
    throw new Error(err)
 }

}