
import RootEvalType from './zod_types/eval'
import * as fs from 'fs'
import * as path from 'path'

const args : string[] = process.argv;

function readJsonFile(filePath: string): any {
    try{
        const absolutePath = path.resolve(filePath);
        const fileContent = fs.readFileSync(absolutePath, 'utf8');
        return JSON.parse(fileContent);
    }catch(err){
        console.error(err);
        return null;
    }
}

function checkJson(json: any): boolean {
    const result = RootEvalType.safeParse(json);
    if (!result.success) {
        console.error(result.error.issues);
    }
    return result.success;
}

const inObject =  readJsonFile(args[2])
if (checkJson(inObject)) {
    console.log("file is compliant")
}