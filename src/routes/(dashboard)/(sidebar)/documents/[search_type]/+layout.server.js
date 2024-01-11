export const load = async({params}) => {
    // console.log('params search type is', params.search_type);
    return {
        searchType: params.search_type
    }
}