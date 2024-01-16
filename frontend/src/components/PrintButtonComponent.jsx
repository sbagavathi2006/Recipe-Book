import React from 'react';

export default function PrintButton({ currentRecipeId }) {
  const handlePrint = () => {

    const printWindow = window.open('', '_blank');
    const recipeToPrint = document.getElementById(currentRecipeId);

    if (printWindow && recipeToPrint) {
      const printDocument = printWindow.document;
      const contentToPrint = recipeToPrint.cloneNode(true);

      //remove checkboxes next to ingredients to add to shopping list
      const checkboxesToRemove = contentToPrint.querySelectorAll('input[type="checkbox"]');
      checkboxesToRemove.forEach((checkbox) => {
        checkbox.remove();
      });

      //remove instructions to check the box to add the ingredient to shopping list
      const shoppingListParagraph = contentToPrint.querySelector('.shoppingListP');
      if (shoppingListParagraph) {
      shoppingListParagraph.remove();
      }

      printDocument.body.appendChild(contentToPrint);
      printWindow.print();
    } else {
      console.error('Unable to print. Component or window not found.');
    }
  };

  return (
    <button class="print-button" onClick={handlePrint}>
      Print this recipe
    </button>
  );
}
