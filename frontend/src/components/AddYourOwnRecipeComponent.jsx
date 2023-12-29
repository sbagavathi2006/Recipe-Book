import { useState } from "react";

export default function AddYourOwnRecipeComponent({setShowAddRecipeForm}) {




  return (
    <><div className="addYourOwnRecipe">
      <button onClick={() => setShowAddRecipeForm(true)}>Add Your Own Recipe</button>
    </div>

      </>
  );
}
