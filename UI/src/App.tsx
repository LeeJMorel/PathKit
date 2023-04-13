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

//this is a placeholder until the store is set up
export interface ObjectProps {
  title: string;
  description: string;
  name: string;
  data: {
    field1: string;
    field2: string;
    field3: string;
  };
}

function App() {
  // Define the props for the Header component
  const mode = "exploration"; // Replace with your actual mode data
  const searchResults =
    // Placeholder entity info data
    {
      title: "Search Sheet",
      description: "This is a placeholder search sheet",
      name: "Search Name",
      data: {
        field1: "Value 1",
        field2: "Value 2",
        field3: "Value 3",
      },
    };
  // Replace with your actual search results data

  const customFeatures = "DCModule,DiceModule"; // Replace with your actual custom features data

  const entityInfo =
    // Placeholder entity info data
    {
      title: "Entity Sheet",
      description: "This is a placeholder entity sheet",
      name: "Entity Name",
      data: {
        field1: "Value 1",
        field2: "Value 2",
        field3: "Value 3",
      },
    };

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
        <Center
          selectedHeaderItem=""
          searchInfo={searchResults} // Pass search results as searchInfo
          entityInfo={entityInfo}
        ></Center>
      </div>
      <div className="Column">
        {/* Header component for the third column holds modular features customized by GM*/}
        <Header column="column3" customFeatures={customFeatures}></Header>
        {/* Content component for the third column will change based on header values*/}
        <Right visibleModules={customFeatures}></Right>
      </div>
    </div>
  );
}

export default App;
