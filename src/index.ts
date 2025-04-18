
import RootEvalType from './zod_types/eval'
import type {EvalType} from "./zod_types/eval";
import * as fs from 'fs'
import * as path from 'path'

const args : string[] = process.argv;

function readJsonFile(): any {
    try{
        let filePath = args[2];
        const absolutePath = path.resolve(filePath);
        const fileContent = fs.readFileSync(absolutePath, 'utf8');
        return JSON.parse(fileContent);
    }catch(err){
        console.error(err);
        console.log("Hello user! Something went wrong! most likely you didn't put the correct path to your file you want to check \n\n The command is:\n npm run start 'path to your file' \n\n After building ofc");
        return null;
    }
}

function checkJson(json: any): EvalType | null {
    const result = RootEvalType.safeParse(json);
    if (!result.success) {
        console.error(result.error.issues);
        return null;
    }
    const typedData : EvalType = result.data;
    return typedData;
}

const inObject =  readJsonFile()
if (checkJson(inObject)) {
    console.log("file is compliant");
}