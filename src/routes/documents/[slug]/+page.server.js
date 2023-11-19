import documents from "$lib/data/documents.json";
import { getFilesFromBucket, getSignedUrl } from "$lib/database/utility.js";
// import { getSignedUrl } from "../../../lib/database/utility.js";

export const load = async({params}) => {

    let res = await getFilesFromBucket('structured');
    // console.log(url);
    // let document = res.filter(document => document.name.replaceAll('_', '').replaceAll(' ', '') == params.slug.replaceAll('_', ''));
    let document = res.filter(document => document.name == params.slug);

    if(document.length){
    let url = await getSignedUrl('structured', document[0].fullname);
  

        return {document: document[0], url: url, structured: true};
    }

    let resTwo = await getFilesFromBucket('unstructured');
    // let documentTwo = resTwo.filter(document => document.name.replaceAll('_', '').replaceAll(' ', '') == params.slug.replaceAll('_', ''));
    let documentTwo = resTwo.filter(document => document.name == params.slug);
    console.log(documentTwo);
    if(documentTwo.length){
        

    let urlTwo = await getSignedUrl('unstructured', documentTwo[0].fullname);
    // console.log(urlTwo);
        return {document: documentTwo[0], url: urlTwo, structured: false};
    }
    
    return{document:null, url: 'url'}
}