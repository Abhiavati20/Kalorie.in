import React from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
const ProductSlider = ({show}) => {
    const responsive = {
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 2,
            slidesToSlide: 2 // optional, default to 1.
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2,
            slidesToSlide: 3 // optional, default to 1.
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1,
            slidesToSlide: 1 // optional, default to 1.
        }
      };
    return (
        <div >
            {/* <ItemsCarousel
                requestToChangeActive={setActiveItemIndex}
                activeItemIndex={activeItemIndex}
                numberOfCards={show ? 1 : 2}
                gutter={20}
                infiniteLoop={true}
                leftChevron={<button style={{outline:"none",background:"#F5CB05",border:"none",color:"white",fontWeight:"500",borderRadius:"5px"}}>{'<'}</button>}
                rightChevron={<button style={{outline:"none",background:"#F5CB05",border:"none",color:"white",fontWeight:"500",borderRadius:"5px"}}>{'>'}</button>}
                outsideChevron
                chevronWidth={chevronWidth}
            >
                <div style={{ height: `${show?"200px":"295px"}`, background: '#EEE' }}>
                    <img src='/images/rolls.jpeg' width="100%" height={show?"200px":"295px"}pxalt="image" />
                </div>
                <div style={{ height: `${show?"200px":"295px"}`, background: '#EEE' }}>
                    <img src='/images/logo.png' width="100%" height={show?"200px":"295px"} alt="image" />
                </div>
                <div style={{ height: `${show?"200px":"295px"}`, background: '#EEE' }}>
                    <img src='/images/sample.jpeg' width="100%" height={show?"200px":"295px"} alt="image" />
                </div>
                
            </ItemsCarousel> */}
            <Carousel
                swipeable={true}
                draggable={true}
                arrows={false}
                showDots={true}
                responsive={responsive}
                ssr={true} // means to render carousel on server-side.
                infinite={true}
                autoPlay={true}
                autoPlaySpeed={3000}
                keyBoardControl={true}
                customTransition="all 1s"
                transitionDuration={3000}
                containerClass="carousel-container"
                dotListClass='react-multi-carousel-dot'
                itemClass="carousel-item-padding-40-px"
            >
                <div style={{ background: '#EEE' }}>
                    <img src='/images/Website1.png' width="100%" height={show?"200px":"450px"}px alt="hello" />
                </div>
                <div style={{  background: '#EEE' }}>
                    <img src='/images/Website3.png' width="100%" height={show?"200px":"450px"} alt="hello" />
                </div>
                <div style={{  background: '#EEE' }}>
                    <img src='/images/Website2.png' width="100%" height={show?"200px":"450px"} alt="hello" />
                </div>
                
            </Carousel>
        </div>
    )
}

export default ProductSlider
