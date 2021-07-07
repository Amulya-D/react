import "../styles/globals.css";
import SearchPhotos from "./_searchPhotos";
import { Flex, Spacer, Heading, VStack, extendTheme } from "@chakra-ui/react";

function MyApp({ Component, pageProps }) {
  return (
    <VStack p={4}>
      <Heading size="lg" fontSize="50px">
        Snapshot Clone
      </Heading>
      <SearchPhotos />
    </VStack>
  );
}
const config = {
  initialColorMode: "light",
  useSystemColorMode: false,
};
const theme = extendTheme({ config });

export default MyApp;
