import React from "react";
import "./App.css";

const data = new Array(100000).fill(0).map((_, i) => ({
  id: i + 1,
  name: `Item ${i + 1}`,
  color: i % 2 == 0 ? "whitesmoke" : "lightblue",
}));

function switchItemColor(itemList) {
  const newItemList = [];
  for (let i = 0; i < itemList.length; i++) {
    if (itemList[i].color === "whitesmoke") {
      newItemList.push({ ...itemList[i], color: "lightblue" });
    } else {
      newItemList.push({ ...itemList[i], color: "whitesmoke" });
    }
  }
  return newItemList;
}

function measureInteraction() {
  // performance.now() returns the number of ms
  // elapsed since the page was opened
  const startTimestamp = performance.now();

  return {
    end() {
      const endTimestamp = performance.now();
      console.log("The interaction took", endTimestamp - startTimestamp, "ms");
    },
  };
}

function App() {
  const [itemList, setNewItemList] = React.useState(data);
  const interaction = measureInteraction();
  afterFrame(() => {
    interaction.end();
  });

  return (
    <>
      <button onClick={() => setNewItemList(switchItemColor(itemList))}>
        Switch item colors
      </button>
      <div>
        {itemList.map((item) => (
          <div key={item.id} style={{ backgroundColor: item.color }}>
            {item.name}
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
