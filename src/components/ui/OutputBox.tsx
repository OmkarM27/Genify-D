import React from 'react';

const OutputBox = () => {
  return (
    <div className="bg-white/5 p-6 rounded-xl h-full">
      <h2 className="text-xl font-semibold mb-2">Generated Output</h2>
      <p className="text-gray-400">Your AI content will appear here after generation.</p>
    </div>
  );
};

export default OutputBox;
