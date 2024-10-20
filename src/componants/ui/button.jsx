export const Button = ({ 
    className = '', 
    variant = 'default', 
    size = 'md',
    disabled = false,
    children, 
    ...props 
  }) => {
    const baseStyles = 'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50';
    
    const variants = {
      default: 'bg-blue-600 text-white hover:bg-blue-700',
      secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200',
      success: 'bg-green-600 text-white hover:bg-green-700',
      outline: 'border border-gray-300 bg-transparent hover:bg-gray-100',
      link: 'text-blue-600 hover:underline bg-transparent',
    };
  
    const sizes = {
      sm: 'h-8 px-3 text-sm',
      md: 'h-10 px-4',
      lg: 'h-12 px-6',
    };
  
    return (
      <button 
        className={`
          ${baseStyles}
          ${variants[variant]}
          ${sizes[size]}
          ${className}
        `}
        disabled={disabled}
        {...props}
      >
        {children}
      </button>
    );
  };