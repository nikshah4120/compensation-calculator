import './App.css';
import CompensationForm from './components/CompensationForm';

import { ChakraProvider } from '@chakra-ui/react'

function App() {
  return (
    <ChakraProvider>
      <div className="App">
        <CompensationForm />
      </div>
    </ChakraProvider>
  );
}

export default App;
