let id;
async function searchMovies(){
    try{
        const query= document.getElementById('query').value;
        
    let res= await fetch(`https://www.omdbapi.com/?apikey=6a41ddca&s=${query}`)


    let data = await res.json();
    let movies = data.Search;
    console.log('data:', data)
    return movies;

    }
    catch(err){
        console.log('err:', err)
    }
}

function append(data){
     // #optimzation 2
    document.getElementById('movies').innerHTML=null;
   
    data.forEach(function(el,index){

        let poster = document.createElement('img');
        poster.src=el.Poster;

        let imgDiv = document.createElement('div')
        imgDiv.setAttribute('class','imgDiv');
        imgDiv.append(poster)

        let p = document.createElement('p')
        p.innerText = el.Title;

        let titleDiv = document.createElement('div')
        titleDiv.setAttribute('class','titleDiv')
        titleDiv.append(p)

        let mainDiv = document.createElement('div')
        mainDiv.addEventListener('click',function(){
                showMovieDetails(el,index)
        })
        mainDiv.setAttribute('id','mainDiv')
        mainDiv.append(imgDiv,titleDiv)

        document.getElementById('movies').append(mainDiv)

    })
}

async function main(){
    const query= document.getElementById('query').value;
    // console.log( typeof query)
    if(query.length>2)
    {
        document.getElementById('movies').style.zIndex= 1
    }

    let data = await searchMovies();

// #optimzation 1
    if(data === undefined){
        return false;
    }

    append(data)
}


// Debouncing

function debounce(func,delay){
    if(id){
        clearTimeout(id);
    }
   id=setTimeout(function(){
        func();
    },delay);
}


// ======================================================================================//
                // SlideShow  Movies 
//=======================================================================================//

var moviesArray=["https://www.meinstyn.com/wp-content/uploads/2020/04/Tanhaji-Movie-HD-Poster-Ajay-Devgan-Saif-Ali-Khan-810x1080.jpg",
"https://resize.indiatvnews.com/en/resize/newbucket/715_-/2021/12/spiderman-1639554053.jpg",
"https://www.bollywoodhungama.com/wp-content/uploads/2017/04/Baahubali-2-The-Conclusion-6.jpg",
"https://deadline.com/wp-content/uploads/2021/08/hanuman-1.jpeg",
"https://img1.hotstarext.com/image/upload/f_auto,t_hcdl/sources/r1/cms/prod/1950/281950-h",
"https://i.ytimg.com/vi/Cn-o7RzUPpU/maxresdefault.jpg",
"https://images.hindustantimes.com/img/2022/03/14/550x309/image-via-twitter-71_1647239680230_1647270755766.jpg","https://wallpapercave.com/wp/wp10795334.jpg",
"https://assets.thehansindia.com/h-upload/2021/01/09/1023834-kgf-2.webp"]


var img= document.getElementById('slideshow');
var index=0;

setInterval(function slide(){
    img.setAttribute('src',moviesArray[index]);
    index++;
    if(index>=moviesArray.length)
    {
        index=0;
    }
},2000);


function showMovieDetails(el,index){
        // console.log(el,index)
        localStorage.removeItem('clickedMovie')
        localStorage.setItem('clickedMovie',JSON.stringify(el));

        let a= document.getElementById('Popularmovies');
        a.innerHTML=null;
        a.style.zIndex= 1;

        // ==========================================================================//
        // ==========================================================================//
        let img = document.createElement('img')
        img.src= el.Poster;
        console.log('img:', img.src)

        let posterdiv = document.createElement('div')
        posterdiv.setAttribute('class','posterDiv')
        posterdiv.append(img);

        // ==========================================================================//
        // ==========================================================================//

        let title = document.createElement('p')
        title.setAttribute('class','clickedTitle')
        title.innerText='Title : '+el.Title;

        let release = document.createElement('p')
        release.setAttribute('class','clickedRelease')
        release.innerText= 'Released : '+el.Year;

        let random= (Math.random()*10).toFixed(1);
        console.log('random:', random)

        let rating = document.createElement('p');
        rating.setAttribute('class','clickedRating')
        rating.innerText = 'IMDb Rating : ' +random;

        let btn = document.createElement('button')
        btn.innerText = 'Watch Now'
        let play = document.createElement('img')
        play.src='https://cdn-icons-png.flaticon.com/512/27/27223.png'
        btn.append(play)


        let titleBox = document.createElement('div')
        titleBox.setAttribute('class','titleBox')

        titleBox.append(title,release,rating,btn)

        // ==========================================================================//
        // ==========================================================================//

        let holder=document.createElement('div');
        holder.setAttribute('id','holder')
        holder.append(posterdiv,titleBox)

        a.append(holder)
}

