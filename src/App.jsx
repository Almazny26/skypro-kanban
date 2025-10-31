import "./App.css";
import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import PopExit from "./components/PopExit/PopExit";
import PopNewCard from "./components/PopNewCard/PopNewCard";
import PopBrowse from "./components/PopBrowse/PopBrowse";

function App() {
  return (
    <div className="wrapper">
      {/* pop-up start*/}
      <PopExit />
      <PopNewCard />
      <PopBrowse />
      {/** попап пользователя теперь управляется через Header */}
      {/* pop-up end*/}

      <Header />
      <Main />
    </div>
  );
}

export default App;
