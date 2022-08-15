 const imageContainer = document.getElementById('image-container');
 const loader= document.getElementById('loader');

 let ready = false;
 let imagesloaded = 0;
 let totalImages = 0;

 

 function setAttributes (element,attributes){
    for (const Key in attributes){
        element.setAttribute(Key,attributes[Key]);
    }
 }
 //check if all images are loaded
 function imageLoaded(){
    imagesloaded++;
    console.log(imagesloaded);
    if(imagesloaded === totalImages){
        ready = true;
        loader.hidden = true;   
        console.log( 'ready', ready);
    }
        
    }

 

 let PhotosArray = [];

 //create elements for the links, photos, add to DOM

function displayphotos(){
    imagesloaded = 0;
    totalImages = PhotosArray.length;
    console.log('total images', totalImages);


    //Run Function for Each object in PhotosArray
    PhotosArray.forEach((photo)=>{
        //Create <a> to link to Unslplash
        const item = document.createElement('a');
        //item.setAttribute('href', photo.links.html);
        //item.setAttribute('target', '_blank');
        setAttributes(item,{
            href: photo.links.html,
            target: '_blank'
        });
        //create <img> for photo
        const img = document.createElement('img');
        // img.setAttribute('src', photo.urls.regular);
        // img.setAttribute('alt', photo.alt_description);
        // img.setAttribute('title', photo.alt_description);
        setAttributes(img,{
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
        });
        // Event Listener, check when each image is finsihed loading
        img.addEventListener('load', imageLoaded);
        //put img inside a, then put both inside image-container element
        item.appendChild(img);
        imageContainer.appendChild(item);
    });


    
}
//Unsplash API
const count = 30;
const apiKey = 'BQAfAjSjK41kaNU2nqaqc_-pJUmY3dc8aTZQuEIobOI';

const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

//Get Photos from Unsplash API
async function getPhotos(){
    try{
        const response = await fetch(apiUrl);
        PhotosArray = await response.json();
        displayphotos();


    }catch (error){
   //Catch error here
    }
     
}

// check to see if scrolling near bottom of page, load more photos
 window.addEventListener( 'scroll',() => {
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight-1000 && ready){
        ready = false;
        getPhotos();
        

    }
 })



 //On load
 getPhotos();