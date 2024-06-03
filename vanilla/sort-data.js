const root = document.getElementById("root");
const moveLastToFrontButton = document.createElement("button");
moveLastToFrontButton.textContent = "Switch item colors";
root.appendChild(moveLastToFrontButton);

moveLastToFrontButton.onclick = function () {
  const newList = switchItemColor(data);
  render(newList);
};

let data = new Array(100000).fill(0).map((_, i) => ({
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

function render(itemList) {
  const interaction = measureInteraction();
  afterFrame(() => {
    interaction.end();
  });
  const itemListWrapper =
    root.childNodes.length > 1 ? root.childNodes[1] : null;
  if (itemListWrapper) {
    // remove all children of itemListWrapper
    while (itemListWrapper.firstChild) {
      itemListWrapper.removeChild(itemListWrapper.firstChild);
    }
    root.removeChild(itemListWrapper);
  }
  const newItemListWrapper = document.createElement("div");
  newItemListWrapper.id = "item-list-wrapper";
  itemList.forEach((item) => {
    const element = document.createElement("div");
    element.style.backgroundColor = item.color;
    element.textContent = item.name;
    newItemListWrapper.appendChild(element);
  });
  root.appendChild(newItemListWrapper);
  data = itemList;
}

render(data);
