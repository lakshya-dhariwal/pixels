//Your API key: 563492ad6f91700001000001b207522eca4648bcb2bb8186df408743
const auth = "563492ad6f91700001000001b207522eca4648bcb2bb8186df408743";
const gallery = document.querySelector('.gallery');
const searchInput = document.querySelector('.searchInput');
const form = document.querySelector('.searchForm');
const moreBtn = document.querySelector('#more');
let searchValue ; 
let page = 1;
let fetchUrl ;
let currentSearch ;

moreBtn.addEventListener('click', loadMore );
searchInput.addEventListener('input',updateInput);
form.addEventListener('submit',(e)=>{
    searchPhotos(searchValue);
    e.preventDefault();
    currentSearch = searchValue;
})
function updateInput(e){
    searchValue = e.target.value;
}


async function fetchApi(url){
    const dataFetch = await fetch(url,{
        method: 'GET' ,
        headers:{
            Accept : "application/json",
            Authorization: auth
        }
    });
    const data = await dataFetch.json();
    return data;
}
function generatePhotos(data){
    data.photos.forEach(photo =>{
        const galleryImg = document.createElement('div');
        galleryImg.classList.add('galleryImg');
        galleryImg.innerHTML = `
        <div class="galleryInfo">
        <p>${photo.photographer}.</p>
        <a href=${photo.src.original}>Download.<a></div>
        <img src=${photo.src.large} target="_blank"></img>`;
        gallery.appendChild(galleryImg);

    });
}
async function curatedPhotos(){
    fetchUrl = "https://api.pexels.com/v1/curated?per_page=15&page=1";
    const data = await fetchApi(fetchUrl);
    generatePhotos(data);
}
async function searchPhotos(query){
    clear();
    fetchUrl = `https://api.pexels.com/v1/search?query=${searchValue}&per_page=15&page=1`;
    const data = await fetchApi(fetchUrl); 
    generatePhotos(data);
}
async function loadMore(){
    page++ ;
    if(currentSearch){
        fetchUrl=`https://api.pexels.com/v1/search?query=${currentSearch}&per_page=15&page=${page}`
    }else{
        fetchUrl=`https://api.pexels.com/v1/curated?per_page=15&page=${page}`;
    }
    const data = await fetchApi(fetchUrl);
    generatePhotos(data);
}
function clear(){
    gallery.innerHTML = "";
    searchInput.value= '';
}

curatedPhotos();
