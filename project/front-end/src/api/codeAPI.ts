import { EXEC_CODE_URL } from "../config";

export async function codeExec(language: string, code: string, token : any) {
    const response = await fetch(`${EXEC_CODE_URL}`, {
        method: "POST",
        headers: { 
            Authorization: `Bearer ${token}`, 
            "Content-Type": "application/json"
        },
        body: JSON.stringify({language: language, code: code}),
    });
    return response;
}
