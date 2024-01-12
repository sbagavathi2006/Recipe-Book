import React from 'react';

export default function PrintButton({ currentRecipeId }) {
  const handlePrint = () => {

    const printWindow = window.open('', '_blank');
    const recipeToPrint = document.getElementById(currentRecipeId);

    if (printWindow && recipeToPrint) {
      const printDocument = printWindow.document;
      const contentToPrint = recipeToPrint.cloneNode(true);

      const checkboxesToRemove = contentToPrint.querySelectorAll('input[type="checkbox"]');
      checkboxesToRemove.forEach((checkbox) => {
        checkbox.remove();
      });

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
