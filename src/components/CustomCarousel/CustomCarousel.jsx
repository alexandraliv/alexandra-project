import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Photo1 from "../../assets/Photo1.jpg";
import Photo2 from "../../assets/Photo2.jpg";
import Photo3 from "../../assets/Photo3.jpg";
import Photo4 from "../../assets/Photo4.jpg";
import Photo5 from "../../assets/Photo5.jpg";
import Photo6 from "../../assets/Photo6.jpg";
import Photo7 from "../../assets/Photo7.jpg";
import Photo8 from "../../assets/Photo8.jpg";
import Photo9 from "../../assets/Photo9.jpg";
import Photo10 from "../../assets/Photo10.jpg";
import Photo11 from "../../assets/Photo11.jpg";

function Product({ product }) {}
function CustomCarousel() {
  return (
    <Carousel
      showThumbs={false}
      className="carousel"
      infiniteLoop
      autoPlay
      interval={2000}
    >
      {itemData.map((item) => {
        return (
          <div key={item.img}>
            <img src={item.img} />
          </div>
        );
      })}
    </Carousel>
  );
}

const itemData = [
  {
    img: Photo1,
    title: "1",
    featured: true,
  },
  {
    img: Photo2,
    title: "2",
  },
  {
    img: Photo3,
    title: "3",
  },
  {
    img: Photo4,
    title: "4",
  },
  {
    img: Photo5,
    title: "4",
  },
  {
    img: Photo6,
    title: "4",
  },
  {
    img: Photo7,
    title: "4",
  },
  {
    img: Photo8,
    title: "4",
  },
  {
    img: Photo9,
    title: "4",
  },
  {
    img: Photo10,
    title: "4",
  },
  {
    img: Photo11,
    title: "4",
  },
];
export default CustomCarousel;
