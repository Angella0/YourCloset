export const imageItem = (itm) =>{
    return 'http://127.0.0.1:1337' + itm?.attributes?.image?.data?.attributes?.formats?.medium?.url;
}