import React from 'react';

export default function PrintButton ({currentRecipeId}) {
    const handlePrint = () => {
        // window.print();
        const printWindow = window.open('','_blank');
        const recipeToPrint = document.getElementById(currentRecipeId);

        if (printWindow && recipeToPrint) {
            const printDocument = printWindow.document;
            const contentToPrint = recipeToPrint.cloneNode(true);

            printDocument.body.appendChild(contentToPrint);
            printWindow.print();
        } else {
            console.error('Unable to print. Component or window not found.')
        }
    };

    return (
        <button onClick = {handlePrint}>
            Print
        </button>
    );
};