import { useState } from "react";

export default function AddYourOwnRecipeComponent({setShowAddRecipeForm}) {

  const handleAddRecipeClick = () => {
    setShowAddRecipeForm(true);
  };

  // const handleFormSubmit = (formData) => {
  //   // Handle form submission logic (e.g., send data to the backend)
  //   <p>Form data submitted</p>
  //   setShowAddRecipeForm(false);
  // };

  return (
    <><div className="addYourOwnRecipe">
      <button onClick={() => handleAddRecipeClick()}>Add Your Own Recipe</button>
    </div>
    {/* <div>
        {showAddRecipeForm && <AddReceipeFormComponent onSubmit={handleFormSubmit} />}
      </div> */}
      </>
  );
}
