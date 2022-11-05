import App_bar from './components/App_bar'
import Side_bar from './components/Side_bar'
import Main_container from './components/Main_container'


function App(){
    return(
        <div>
            <App_bar/>
            <div id="main_window">
                <Side_bar/>
                <Main_container/>
            </div>
        </div>
    );
}







export default App;
