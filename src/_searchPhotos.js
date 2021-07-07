import React, { useState } from "react";
import Unsplash, { toJson } from "unsplash-js";
import {
  Flex,
  Spacer,
  Button,
  ButtonGroup,
  HStack,
  Input,
  FormControl,
  Grid,
  VStack,
  Box,
  SimpleGrid,
  Image,
  extendTheme,
  Header,
} from "@chakra-ui/react";

const unsplash = new Unsplash({
  accessKey: "kimVYymB467M3FaTfdY3OZOyfPt_h4e6Pou23hAc_mc",
});

export default function SearchPhotos() {
  const [query, setQuery] = useState("");
  const [pics, setPics] = useState([]);

  // create a variable to dynamically constuct and assing the lucky URL
  // const [luckyURL, setLuckyURL] = useState("https://bing.com");
  const tag_click = async (e) => {
    console.log(e.target.getAttribute("id"));
    // prevents page load on each search

    e.preventDefault();

    // here we are making the search to unsplash
    unsplash.search
      // query here is what we type in the search bar | photos("dog")
      .photos(e.target.getAttribute("id"))
      .then(toJson)
      .then((json) => {
        console.log(json);
        setPics([]);
        // we are assing response from the unsplash to setpic variable
        setPics(json.results);

        //lets get first element in json.results
        // console.log(json.results[1].urls.full);

        // this line sets the LuckyURL use the reach method which gets assigned to lucky URL whcih is in the hfref with in the </a>
        //setLuckyURL(json.results[1].urls.full);
      });
  };
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
        setPics([]);
        // we are assing response from the unsplash to setpic variable
        setPics(json.results);

        //lets get first element in json.results
        // console.log(json.results[1].urls.full);

        // this line sets the LuckyURL use the reach method which gets assigned to lucky URL whcih is in the hfref with in the </a>
        //setLuckyURL(json.results[1].urls.full);
      });
  };
  const luckySearch = async (e) => {
    // prevents page load on each search
    console.log("lucky search");
    e.preventDefault();
    setPics([]);
    // here we are making the search to unsplash
    unsplash.search
      // query here is what we type in the search bar | photos("dog")
      .photos(query)
      .then(toJson)
      .then((json) => {
        console.log(json.results[1]);

        // we are assing response from the unsplash to setpic variable
        setPics([json.results[1]]);
      });
  };

  return (
    <VStack p={5}>
      {/* Below on submit will trigger the search to unsplash using the querry. */}

      <form className="form" onSubmit={searchPhotos}>
        <FormControl isRequired>
          <Input
            type="text"
            name="query"
            className="input"
            placeholder={`Try "dog" or "cats"`}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          ></Input>
          <ButtonGroup>
            <Button colorScheme="blue" type="submit">
              Search
            </Button>
            <Button colorScheme="blue" onClick={luckySearch}>
              I'm Feeling Lucky
            </Button>
          </ButtonGroup>
        </FormControl>
      </form>
      <form className="form" onSubmit={searchPhotos}>
        <FormControl isRequired>
          <ButtonGroup>
            <Button colorScheme="blue" id="Beach" onClick={tag_click}>
              Beach
            </Button>
            <Button colorScheme="blue" id="Mountains" onClick={tag_click}>
              Mountains
            </Button>
            <Button colorScheme="blue" id="Birds" onClick={tag_click}>
              Birds
            </Button>
          </ButtonGroup>
        </FormControl>
      </form>
      <SimpleGrid columns={[2, null, 3]} spacingX="40px" spacingY="20px">
        {pics.map((pic) => (
          <Image
            className="card--image"
            alt={pic.alt_description}
            src={pic.urls.full}
            boxSize="100px"
          ></Image>
        ))}{" "}
      </SimpleGrid>
    </VStack>
  );
}
