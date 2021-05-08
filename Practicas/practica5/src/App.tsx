import React from 'react';
import logo from './logo.svg';
import {ApolloClient, ApolloProvider, InMemoryCache} from "@apollo/client";
import SearchFrame from "./components/searchFrame/searchFrame"
import './App.css';

const client = new ApolloClient({
  uri: process.env.REACT_APP_API_URL,
  cache: new InMemoryCache(),
})

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <SearchFrame/>
      </div>
    </ApolloProvider>
  );
}

export default App;
