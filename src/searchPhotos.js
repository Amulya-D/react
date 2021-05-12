import React, { useState } from "react";
import Unsplash, { toJson } from "unsplash-js";

const unsplash = new Unsplash({
  accessKey: "kimVYymB467M3FaTfdY3OZOyfPt_h4e6Pou23hAc_mc",
});
export default function SearchPhotos() {
  const [query, setQuery] = useState("");
  const [pics, setPics] = useState([]);

  const searchPhotos = async (e) => {
    // prevents page load on each search
    e.preventDefault();

    // here we are making the search to unsplash
    unsplash.search
      // query here is what we type in the search bar | photos("dog")
      .photos(query)
      .then(toJson)
      .then((json) => {
        console.log(json);

        // we are assing response from the unsplash to setpic variable
        setPics(json.results);
      });
  };

  return (
    <>
      {/* Below on submit will trigger the search to unsplash using the querry. */}
      <form className="form" onSubmit={searchPhotos}>
        {" "}
        <label className="label" htmlFor="query"></label>
        <input
          type="text"
          name="query"
          className="input"
          placeholder={`Try "dog" or "cats"`}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit" className="button">
          Search
        </button>
      </form>
      <div className="card-list">
        {pics.map((pic) => (
          <div className="card" key={pic.id}>
            <img
              className="card--image"
              alt={pic.alt_description}
              src={pic.urls.full}
              width="50%"
              height="50%"
            ></img>
          </div>
        ))}{" "}
      </div>
    </>
  );
}
