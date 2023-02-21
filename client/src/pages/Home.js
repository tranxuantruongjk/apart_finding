import React from "react";
import PostsList from "../components/postsList/PostsList";
import SearchBar from "../components/searchBar/SearchBar";
import FormExample from "../components/example/FormExample";

const Home = () => {
  return (
    <div className="container">
      <SearchBar />
      {/* <FormExample /> */}
      <PostsList />
    </div>
  );
};

export default Home;
