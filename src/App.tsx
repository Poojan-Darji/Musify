import Display from "./components/Display";
import Player from "./components/Player";
import SIdebar from "./components/SIdebar";

const App = () => {
    return (
        <div className="h-screen bg-black">
            <div className="h-[90%] flex">
                <SIdebar />
                <Display />
            </div>
            <Player />
        </div>
    );
};

export default App;
