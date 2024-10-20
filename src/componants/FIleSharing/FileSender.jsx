import React from 'react';
import { Share2 } from 'lucide-react';

const FileSender = ({ generatedCode, setGeneratedCode, isCopied, setIsCopied }) => {
  const generateCode = () => {
    try {
      const code = Array.from(crypto.getRandomValues(new Uint8Array(10)))
        .map((b) => b.toString(36))
        .join('')
        .slice(0, 15);
      setGeneratedCode(code);
      setIsCopied(false);
    } catch {
      console.error('Failed to generate code');
    }
  };

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(generatedCode);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch {
      console.error('Failed to copy to clipboard');
    }
  };

  return (
    <div className="mb-4">
      <button 
        onClick={generateCode} 
        className="bg-blue-600 text-white py-2 px-4 rounded w-full hover:bg-blue-700 mb-2"
      >
        Generate Code
      </button>
      
      {generatedCode && (
        <div>
          <span className="font-medium">Your Code:</span>
          <span className="ml-2">{generatedCode}</span>
          <button onClick={handleShare} className="ml-2">
            <Share2 className="h-5 w-5 text-blue-500" />
          </button>
          {isCopied && <span className="text-green-500 ml-2">Copied!</span>}
        </div>
      )}
    </div>
  );
};

export default FileSender;
