import { ToastContainer } from "react-toastify";
import BundlrContextProvider from "../context/bundlrContext";
import "../styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import { ApolloProvider } from "@apollo/client";
import client from "../client";

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <ApolloProvider client={client}>
        <BundlrContextProvider>
          <Component {...pageProps} />
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
          />
        </BundlrContextProvider>
      </ApolloProvider>
    </div>
  );
}

export default MyApp;
