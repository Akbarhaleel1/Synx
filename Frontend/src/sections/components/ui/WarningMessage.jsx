import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const WarningMessage = () => {
  return (
    <div className="max-w-md mx-auto mt-8">
      <Alert variant="warning" className="bg-amber-50 border-amber-300">
        <AlertTriangle className="h-5 w-5 text-amber-500" />
        <AlertTitle className="text-amber-800 font-semibold mb-2">
          Review Link Required
        </AlertTitle>
        <AlertDescription className="text-amber-700">
          Please add a review link to proceed. This step is necessary to ensure proper feedback collection.
        </AlertDescription>
        <div className="mt-4 flex justify-end space-x-3">
          <button className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors">
            Cancel
          </button>
          <button className="px-4 py-2 bg-amber-500 text-white rounded-md hover:bg-amber-600 transition-colors">
            Add Review Link
          </button>
        </div>
      </Alert>
    </div>
  );
};

export default WarningMessage;