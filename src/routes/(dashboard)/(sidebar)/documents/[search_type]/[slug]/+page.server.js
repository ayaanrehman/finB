import documents from "$lib/data/documents.json";
import { getFilesFromBucket, getSignedUrl, getUser} from "$lib/database/utility.js";
import {redirect} from "@sveltejs/kit";
// import { getSignedUrl } from "../../../lib/database/utility







export const load = async({params}) => {

    let userId = await getUser();

    console.log('main user is', userId);

    let res = await getFilesFromBucket('structured', userId);
    // console.log(url);
    // let document = res.filter(document => document.name.replaceAll('_', '').replaceAll(' ', '') == params.slug.replaceAll('_', ''));
    let document = res.filter(document => document.name == params.slug);
    console.log('user id is', userId);
    console.log('doc is', document);
    if(!userId){
        throw redirect(302, '/login');
    }

    if(document.length){
    let url = await getSignedUrl('structured', document[0].fullname, userId);
  

        return {doc: document[0], url: url, structured: true};
    }

    let resTwo = await getFilesFromBucket('unstructured', userId);
    // let documentTwo = resTwo.filter(document => document.name.replaceAll('_', '').replaceAll(' ', '') == params.slug.replaceAll('_', ''));
    let documentTwo = resTwo.filter(document => document.name == params.slug);
    console.log(documentTwo);
    if(documentTwo.length){
        

    let urlTwo = await getSignedUrl('unstructured', documentTwo[0].fullname, userId);
    // console.log(urlTwo);
        return {doc: documentTwo[0], url: urlTwo, structured: false};
    }
    
    return{dodc:null, url: 'url'}
}