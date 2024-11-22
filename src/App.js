import './App.css';
import 'babel-plugin-transform-react-remove-prop-types'
import PropTypes from "prop-types";
import {Provider} from "react-redux";
import SideBar from "./components/sideBar/sideBar";
function App() {
  // const store = store
  return (
    // <Provider store={store}>
      <div className="App">
        <header className="Ap-header">
        </header>
        <SideBar></SideBar>
      </div>
    // </Provider>
  );
}

export default App;
