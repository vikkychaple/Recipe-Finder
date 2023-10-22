import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const RecipeContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  width: 300px;
  box-shadow: 0 3px 10px 0 #aaa;
`;

const RecipeImage = styled.img`
  object-fit: cover;
  height: 200px;
`;

const FavoriteRecipesPage = ({ favoriteRecipes }) => {
  return (
    <Container>
      <h1>Favorite Recipes</h1>
      <div>
        {favoriteRecipes.map((recipe, index) => (
          <RecipeContainer key={index}>
            <RecipeImage src={recipe.image} alt={recipe.label} />
            <h3>{recipe.label}</h3>
            <h4>Ingredients:</h4>
            <ul>
              {recipe.ingredients.map((ingredient, i) => (
                <li key={i}>{ingredient.text}</li>
              ))}
            </ul>
            <a href={recipe.url} target="_blank" rel="noopener noreferrer">
              See Complete Recipe
            </a>
          </RecipeContainer>
        ))}
      </div>
    </Container>
  );
};

export default FavoriteRecipesPage;
