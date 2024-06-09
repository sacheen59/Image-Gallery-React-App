import { useState, useEffect } from "react";
import ImageCard from "./components/ImageCard";
import ImageSearch from "./components/ImageSearch";

function App() {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [term, setTerm] = useState("");

  useEffect(() => {
    fetch(
      `https://pixabay.com/api/?key=44292704-fc232947e756e5a7b1907db82&q=${term}+flowers&image_type=photo&pretty=true`
    )
      .then((res) => res.json())
      .then((data) => {
        setImages(data.hits);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  }, [term]);
  return (
    <div className="container mx-auto mt-10">
      <ImageSearch searchText={(text) => setTerm(text)} />

      {!isLoading && images.length === 0 && (
        <h1 className="text-5xl font-bold text-center mx-auto mt-32">
          No Images Found
        </h1>
      )}

      {isLoading ? (
        <h1 className="text-6xl font-bold text-center mx-auto mt-32">
          Loading...
        </h1>
      ) : (
        <div className="grid px-10 xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 md:px-0 lg:grid-cols-4 gap-4">
          {images.map((img) => {
            return <ImageCard key={img.id} image={img} />;
          })}
        </div>
      )}
    </div>
  );
}

export default App;
