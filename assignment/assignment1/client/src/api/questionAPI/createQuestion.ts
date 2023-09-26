import { API_URL } from "../config";

export async function createQuestion(formData: FormData, token : any) {
    const title = formData.get("title");
    const difficulty = formData.get("difficulty");
    const description = formData.get("description");
    const examples = formData.get("examples[]");
    const constraints = formData.get("constraints[]");
    const tags = formData.get("tags[]");

    const response = await fetch(`${API_URL}/questions`, {
        method: "POST",
        headers: { 
            Authorization: `Bearer ${token}`, 
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            title,
            difficulty,
            description,
            examples,
            constraints,
            tags,
        }),
    });
    return response.json();
}