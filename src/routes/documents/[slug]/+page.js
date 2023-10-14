import documents from "$lib/data/documents.json";

export const load = async({params}) => {
    let document = documents.filter(document => document.slug == params.slug);
    console.log(documents);
    console.log(document[0]);
    if(document[0])
    return {document: document[0]}
    
}