import { useState } from 'react';

export default function AddYourOwnRecipeComponent({ setShowAddRecipeForm }) {
  return (
    <>
      <div className="addYourOwnRecipe">
        <p>Want to add your own recipe?</p>
        <button onClick={() => setShowAddRecipeForm(true)}>Click here</button>
      </div>
    </>
  );
}
