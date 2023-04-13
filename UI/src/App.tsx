import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
// Import the necessary CSS and component files
import "./App.css";
import Center from "./Center";
import Header from "./Header";
import Left from "./Left";
import Right from "./Right";

// Load FontAwesome icons
library.add(fas);

function App() {
  // Define the props for the Header component
  const mode = "exploration"; // Replace with your actual mode data
  const searchResults: never[] = []; // Replace with your actual search results data
  const customFeatures = ""; // Replace with your actual custom features data

  return (
    // Main container for the app
    <div className="App">
      <div className="Column">
        {/* Header component for the first column indicates Exploration or Encounter */}
        <Header column="column1" mode={mode}></Header>
        {/* Content component for the first column holds planner 
            which then tells the header what mode we are in. */}
        <Left></Left>
      </div>
      <div className="Column">
        {/* Header component for the second column is always search*/}
        <Header column="column2" searchResults={searchResults}></Header>
        {/* Content component for the second column will change if 
            header search component is used to show results*/}
        <Center></Center>
      </div>
      <div className="Column">
        {/* Header component for the third column holds modular features customized by GM*/}
        <Header column="column3" customFeatures={customFeatures}></Header>
        {/* Content component for the third column will change based on header values*/}
        <Right></Right>
      </div>
    </div>
  );
}

export default App;
