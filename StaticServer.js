import StaticServer from "react-native-static-server";

let server = new StaticServer(8080);

// Start the server
server.start().then(url => {
  console.log("Serving at URL", url);
});
