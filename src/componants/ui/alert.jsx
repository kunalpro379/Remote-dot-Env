export const Alert = ({ 
    className = '', 
    variant = 'default',
    children, 
    ...props 
  }) => {
    const variants = {
      default: 'bg-blue-50 text-blue-900 border-blue-200',
      destructive: 'bg-red-50 text-red-900 border-red-200',
      warning: 'bg-yellow-50 text-yellow-900 border-yellow-200',
      success: 'bg-green-50 text-green-900 border-green-200',
    };
  
    return (
      <div 
        role="alert"
        className={`
          rounded-lg border p-4
          ${variants[variant]}
          ${className}
        `}
        {...props}
      >
        {children}
      </div>
    );
  };
  
  export const AlertDescription = ({ className = '', children, ...props }) => (
    <div 
      className={`text-sm ${className}`} 
      {...props}
    >
      {children}
    </div>
  );