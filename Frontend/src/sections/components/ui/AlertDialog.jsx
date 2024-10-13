import React from 'react';

export const AlertDialog = ({ open, onOpenChange, children }) => {
  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm ${
        open ? 'block' : 'hidden'
      }`}
    >
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div>{children}</div>
        {/* <button onClick={onOpenChange} className="mt-4 px-4 py-2 bg-green-600 text-white rounded">
          Close
        </button> */}
      </div>
    </div>
  );
};

export const AlertDialogHeader = ({ children }) => <div className="text-lg font-bold">{children}</div>;
export const AlertDialogTitle = ({ children }) => <h2 className="text-xl">{children}</h2>;
export const AlertDialogDescription = ({ children }) => <p>{children}</p>;
export const AlertDialogFooter = ({ children }) => <div className="mt-4">{children}</div>;
