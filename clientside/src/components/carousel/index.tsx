import {component$} from "@builder.io/qwik";

export default component$(() => {


    return(
        <div className="carousel w-full">
            <div id="slide1" className="carousel-item relative w-full">
                <img src="../../public/assests/brooke-cagle-aVT8VkmzML4-unsplash.jpeg" className="w-full h-[500px] object-cover" width="1200px" height="500px"/>
                <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                    <a href="#slide4" className="btn btn-circle">❮</a>
                    <a href="#slide2" className="btn btn-circle">❯</a>
                </div>
            </div>
            <div id="slide2" className="carousel-item relative w-full">
                <img src="../../public/assests/toa-heftiba-dti56waifB4-unsplash.jpeg" className="w-full h-[500px] object-cover" width="1200px" height="500px" />
                <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                    <a href="#slide1" className="btn btn-circle">❮</a>
                    <a href="#slide3" className="btn btn-circle">❯</a>
                </div>
            </div>
            <div id="slide3" className="carousel-item relative w-full">
                <img src="../../public/assests/chris-ghinda-wK2ESlRRZQ8-unsplash.jpeg" className="w-full h-[500px] object-cover" width="1200px" height="500px" />
                <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                    <a href="#slide2" className="btn btn-circle">❮</a>
                    <a href="#slide4" className="btn btn-circle">❯</a>
                </div>
            </div>
            <div id="slide4" className="carousel-item relative w-full">
                <img src="../../public/assests/jc-gellidon-JM8TkWJ9UIY-unsplash.jpeg" className="w-full h-[500px] object-cover" width="1200px" height="500px" />
                <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                    <a href="#slide3" className="btn btn-circle">❮</a>
                    <a href="#slide1" className="btn btn-circle">❯</a>
                </div>
            </div>
        </div>
    )
})