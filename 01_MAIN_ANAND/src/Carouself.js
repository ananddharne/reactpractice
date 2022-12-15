import { useState, useEffect } from "react";

const Carouself = ({ images }) => {
  const [currentImage, setImage] = useState(0)

  useEffect(() => {
    // image length doesnt exceed the length
    const next = (currentImage + 1) % images.length;
    const id = setTimeout(() => setImage(next), 1000);
    return () => clearTimeout(id);
  }, [currentImage, images]);

  return (
    <div className="carousel">
        <img src={images[currentImage] || 'http://pets-images.dev-apis.com/pets/none.jpg'} alt="animal" />
      
      {
        images.length ? 
        <div className="carousel-smaller">
          {
            images.map((photo, index) => (
              // eslint-disable-next-line
              <img
                key={photo}
                src={photo}
                className={index === currentImage ? "active" : ""}
                alt="animal thumbnail"
                onClick={() => setImage(index)}
                data-index={index}
              />
            ))
          }
        </div>
        :
        <p> sdd</p>
      }
    </div>
  )
}

export default Carouself
