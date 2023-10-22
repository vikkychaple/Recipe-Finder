import React, { useState } from "react";
import styled from "styled-components";
import Dialog from '@mui/material/Dialog';
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from "@mui/material/DialogActions";

const RecipeContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  width: 300px;
  box-shadow: 0 3px 10px 0 #aaa;
`;
const CoverImage = styled.img`
  object-fit: cover;
  height: 200px;
`;
const RecipeName = styled.span`
  font-size: 18px;
  font-weight: 600;
  color: black;
  margin: 10px 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
const SeeMoreText = styled.span`
  color: #eb3300;
  font-size: 18px;
  text-align: center;
  border: solid 1px #eb3300;
  border-radius: 3px;
  padding: 10px 15px;
  cursor: pointer;
`;
const IngredientsText = styled(SeeMoreText)`
  color: green;
  border: solid 1px green;
  margin-bottom: 12px;
`;
const SeeNew=styled(SeeMoreText)`
color: blue;
border: solid 1px blue;
margin-bottom: 12px;

`;
const SeeNewTab = styled(SeeMoreText)`
  color: green;
  border: solid 1px green;
`;
const RecipeComponent = (props) => {
  const [show, setShow] = useState("");
  const [isFavorite, setIsFavorite] = useState(false);

  const { label, image, ingredients, url } = props.recipe;
  const handleToggleFavorite = () => {
    setIsFavorite(!isFavorite);
    const favoriteRecipe = {
      label: label,
      image: image,
      ingredients: ingredients,
      url: url,
    };
   

  
    if (!isFavorite) {
      props.setFavoriteRecipes((prevRecipes) => [...prevRecipes, favoriteRecipe]);
      props.showNotification("Added to favorites successfully"); // Show the notification

    } else {
      props.setFavoriteRecipes((prevRecipes) =>
        prevRecipes.filter((recipe) => recipe.label !== label)
      );
    }
  };
  return (
    <RecipeContainer>
      <Dialog
        onClose={() => console.log("adsadad")}
        aria-labelledby="simple-dialog-title"
        open={!!show}
      >
        <DialogTitle>Ingredients</DialogTitle>
        <DialogContent>
          <RecipeName>{label}</RecipeName>
          <table>
            <thead>
              <th>Ingredient</th>
              <th>Weight</th>
            </thead>
            <tbody>
              {ingredients.map((ingredient, index) => (
                <tr key={index} className="ingredient-list">
                  <td>{ingredient.text}</td>
                  <td>{ingredient.weight}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </DialogContent>
        <DialogActions>
          <SeeNewTab onClick={() => window.open(url)}>See More</SeeNewTab>
          <SeeMoreText onClick={() => setShow("")}>Close</SeeMoreText>
        </DialogActions>
      </Dialog>
      <CoverImage src={image} alt={label} />
      <RecipeName>{label}</RecipeName>
      <IngredientsText onClick={() => setShow(!show)}>
        Ingredients
      </IngredientsText>
      <SeeMoreText onClick={() => window.open(url)}>
        See Complete Recipe
      </SeeMoreText>
      <SeeNew onClick={handleToggleFavorite}>
        {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
      </SeeNew>
    </RecipeContainer>
  );
};
export default RecipeComponent;