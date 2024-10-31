import { useEffect, useState } from "react";
import Header from "../../layouts/Header";

export default function Index() {
  const [quote, setQuote] = useState("");
  const [image, setImage] = useState("");

  useEffect(() => {
    fetch("https://api.quotable.io/random")
      .then((response) => response.json())
      .then((data) => setQuote(data.content));
    fetch("https://picsum.photos/200/300").then((response) => setImage(response.url));
  }, []);
  return (
    <>
      <Header />
      <section>
        <h1>Manager</h1>
        <div>
          <img src={image} alt="random ảnh" />
          <blockquote>{quote}</blockquote>
        </div>
      </section>
    </>
  );
}
