import './App.css';
// import 'babel-plugin-transform-react-remove-prop-types'
// import PropTypes from "prop-types";
//@ts-ignore
import FullPage from "./components/fullPage.tsx";
//@ts-ignore
import store from "./store/index.ts";
// @ts-ignore
import ErrorBoundary from "./components/errorBoundary.tsx";

function App() {

    const saveState = (state) => {
        try {
            const serializedState = JSON.stringify(state);
            localStorage.setItem('state', serializedState);
        } catch (err) {

        }
    }
    window.onbeforeunload = (e) => {
        const state = store.getState();
        saveState(state);
    };


    // const store = store
    return (
        <>

            <div className="App" style={{fontFamily: "汇文明朝体"}}>
                {/*<header className="Ap-header">*/}
                {/*</header>*/}
                {/*// @ts-ignore*/}
                <ErrorBoundary>
                <FullPage></FullPage>
                </ErrorBoundary>
            </div>
        </>

    );
}

export default App;
