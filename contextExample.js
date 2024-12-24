import React, { createContext, useContext, useState } from 'react';

// Create a Context
const MyContext = createContext();

// Create a Provider component
const MyProvider = ({ children }) => {
  const [value, setValue] = useState('Hello, World!');
  
  return (
    <MyContext.Provider value={{ value, setValue }}>
      {children}
    </MyContext.Provider>
  );
};

// Create a component that consumes the context
const MyComponent = () => {
  const { value, setValue } = useContext(MyContext);
  
  return (
    <div>
      <p>{value}</p>
      <button onClick={() => setValue('Hello, React Context!')}>Change Value</button>
    </div>
  );
};

// Use the Provider to wrap the part of your app where you want the context to be available
const App = () => (
  <MyProvider>
    <MyComponent />
  </MyProvider>
);

export default App;
