import React, { useState } from "react";
import Unsplash, { toJson } from "unsplash-js";
import Button from "@material-ui/core/Button";

const unsplash = new Unsplash({
  accessKey: "kimVYymB467M3FaTfdY3OZOyfPt_h4e6Pou23hAc_mc",
});
export default function SearchPhotos() {
  const [query, setQuery] = useState("");
  const [pics, setPics] = useState([]);

  // create a variable to dynamically constuct and assing the lucky URL
  const [luckyURL, setLuckyURL] = useState("https://bing.com");

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

        //lets get first element in json.results
        console.log(json.results[1].urls.full);

        // this line sets the LuckyURL use the reach method which gets assigned to lucky URL whcih is in the hfref with in the </a>
        setLuckyURL(json.results[1].urls.full);
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
        <label className="label" htmlFor="query"></label>
        <label className="label" htmlFor="query"></label>
        <button type="submit" className="button">
          Search
        </button>
        <label className="label" htmlFor="query"></label>
        <label className="label" htmlFor="query"></label>
        <a type="submit" className="button lucky" href={luckyURL}>
          I'm Feeling Lucky
        </a>
        <label className="label" htmlFor="query"></label>
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
