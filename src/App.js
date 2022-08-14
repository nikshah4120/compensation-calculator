import './App.css';
import CompensationForm from './components/CompensationForm';

import { Client as Styletron } from 'styletron-engine-atomic';
import { Provider as StyletronProvider } from 'styletron-react';
import { LightTheme, BaseProvider, styled } from 'baseui';

const engine = new Styletron();


function App() {
  return (
    <StyletronProvider value={engine}>
    <BaseProvider theme={LightTheme}>
    <div className="App">
     <CompensationForm/>
    </div>
    </BaseProvider>
    </StyletronProvider>
  );
}

export default App;
