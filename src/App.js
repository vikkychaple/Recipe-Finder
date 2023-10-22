import React, { useState } from "react";
import Axios from "axios";
import styled from "styled-components";

import FavoriteRecipes from "./components/FavoriteRecipes"; 
import RecipeComponent from "./components/RecipeComponent";
import ErrorComponent from "./components/ErrorComponent";
import Header from "./components/Header";
import Footer from "./components/Footer";

const APP_ID = "3699c3f9";
const APP_KEY = "25d1e7001e7ebb3ef003632d3e6e1549	";


const Container = styled.div`
  display: flex;
  flex-direction: column;
`;


const RecipeListContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 30px;
  gap: 20px;
  justify-content: space-evenly;
`;

const Placeholder = styled.img`
  width: 120px;
  height: 120px;
  margin: 200px;
  opacity: 50%;
`;


const AppComponent = () => {
  const [searchQuery, updateSearchQuery] = useState("");
  const [recipeList, updateRecipeList] = useState([]);
  const [timeoutId, updateTimeoutId] = useState();
  const [favoriteRecipes, setFavoriteRecipes] = useState([]); 
  const [error, setError] = useState(null);
 
  const fetchData = async (searchString) => {
    try{
    const response = await Axios.get(
      `https://api.edamam.com/search?q=${searchString}&app_id=${APP_ID}&app_key=${APP_KEY}`,
    );
    if (response.data.hits.length > 0) {
      updateRecipeList(response.data.hits);
      setError(null);
    } else {
      setError("No results found.");
    }
  
  }catch (error) {
    setError("An error occurred. Please try again later.");
  }
    //updateRecipeList(response.data.hits);
  };
  const [notification, setNotification] = useState(null);
  // Function to show the notification message
  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => {
      setNotification(null); // Clear the notification after a few seconds
    }, 3000); // Adjust the time as needed
  };

const Notification = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: #4caf50;
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
`;
  const onTextChange = (e) => {
    clearTimeout(timeoutId);
    updateSearchQuery(e.target.value);
    const timeout = setTimeout(() => fetchData(e.target.value), 500);
    updateTimeoutId(timeout);
  };
 
  return (
    <Container>
            <Header onTextChange={onTextChange} searchQuery={searchQuery}  />

      
            <RecipeListContainer>
        {recipeList?.length ? (
          recipeList.map((recipe, index) => (
            <RecipeComponent key={index} recipe={recipe.recipe} setFavoriteRecipes={setFavoriteRecipes}
            showNotification={showNotification}/>
          ))
        ) : (
          <Placeholder src="/hamburger.svg" />
        )}
      </RecipeListContainer>
      <FavoriteRecipes favoriteRecipes={favoriteRecipes} setFavoriteRecipes={setFavoriteRecipes} />
      {notification && (
          <Notification>{notification}</Notification>
        )}

      <Footer/>
    </Container>
  );
};

export default AppComponent;