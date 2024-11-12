import { Link } from "react-router-dom"
import { useState } from "react";
import { useSwipeable } from "react-swipeable";
interface ImageSlideProp {
    images: string[]
}
export default function ImageSlide ({images}:ImageSlideProp) {
    const [currentIndex, setCurrentIndex] = useState(0);

    // Function to navigate to the next image
    const nextImage = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    // Function to navigate to the previous image
    const prevImage = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? images.length - 1 : prevIndex - 1
        );
    };

    const handlers = useSwipeable({
        onSwipedLeft: nextImage,
        onSwipedRight: prevImage,
        onSwiping: (eventData) => {
            eventData.event.preventDefault(); // Prevents default touch behavior on swipe
        },
        trackMouse: true // optional, allows swipe with mouse as well
    });
    return (
        <div {...handlers} className="relative w-full aspect-square overflow-hidden bg-gray-200" >
            <div className="flex transition-transform duration-300 ease-in-out"
            style={{
                transform: `translateX(-${currentIndex * 100}%)`,
                width: `${images.length * 100}%`, // Adjusts the width of the flex container
            }}>
                {
                    images.map((imageURL) => {
                        console.log(imageURL)
                        return (
                            <Link className="flex-shrink-0 w-full h-full" rel="noopener noreferrer" key={imageURL} target="_blank" to={`http://localhost:3001/${imageURL}`}>
                                <img className="object-cover" src={`http://localhost:3001/${imageURL}`}></img>
                            </Link>
                        )
                    })
                }
            </div>
            <button
                className="absolute left-2 top-1/2 transform -translate-y-1/2 text-white"
                onClick={prevImage}
            >
                <i className="fa-solid fa-chevron-left text-3xl"></i>
            </button>
            <button
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white text-lg"
                onClick={nextImage}
            >
                <i className="fa-solid fa-chevron-right text-3xl"></i>
            </button>
        </div>
    )
}