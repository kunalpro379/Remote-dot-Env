const Card = ({ children, className = '' }) => (
    <div className={`bg-white rounded-lg shadow-lg ${className}`}>
      {children}
    </div>
  );
  
  const Button = ({ 
    children, 
    onClick, 
    variant = 'primary',
    className = '' 
  }) => {
    const baseStyle = "px-4 py-2 rounded-md font-medium transition-colors";
    const variants = {
      primary: "bg-blue-500 hover:bg-blue-600 text-white",
      destructive: "bg-red-500 hover:bg-red-600 text-white",
    };
    
    return (
      <button 
        onClick={onClick}
        className={`${baseStyle} ${variants[variant]} ${className}`}
      >
        {children}
      </button>
    );
  };
  
  const Input = ({ 
    type = "text",
    placeholder,
    value,
    onChange,
    className = ''
  }) => (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${className}`}
    />
  );
  
  const Alert = ({ children, variant = 'error', className = '' }) => {
    const variants = {
      error: 'bg-red-50 border-red-200 text-red-700',
      success: 'bg-green-50 border-green-200 text-green-700',
      warning: 'bg-yellow-50 border-yellow-200 text-yellow-700',
    };
  
    return (
      <div className={`p-4 rounded-md border ${variants[variant]} ${className}`}>
        <div className="flex items-center gap-2">
          {variant === 'error' && (
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12" y2="16" />
            </svg>
          )}
          {children}
        </div>
      </div>
    );
  };
  
  export { Card, Button, Input, Alert };