import { useState } from 'react';

export default function AddYourOwnRecipeComponent({
  setShowAddRecipeForm,
  setUpdateStatus,
}) {
  return (
    <>
      <div className="addYourOwnRecipe">
        <p>Want to add your own recipe?</p>
        <button
          onClick={() => {
            setShowAddRecipeForm(true);
            setUpdateStatus(false);
          }}
        >
          Click here
        </button>
      </div>
    </>
  );
}
