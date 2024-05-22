import { React, Component } from "react";
import Category from "../Cat/Category";
import Item from "../Item/Item";

const items = [
  {
    name: "apple",
    category: "fruit",
  },
  {
    name: "Cucumber",
    category: "vegetable",
  },
  {
    name: "Banana",
    category: "fruit",
  },
  {
    name: "Celery",
    category: "vegetable",
  },
  {
    name: "orange",
    category: "fruit",
  },
  {
    name: "sausage",
    category: "meat",
  },
  {
    name: "bacon",
    category: "meat",
  },
];

const itemXcategory = new Map();
items.forEach((item) => {
  itemXcategory.get(item.category)
    ? itemXcategory.set(item.category, [
        ...itemXcategory.get(item.category),
        item.name,
      ])
    : itemXcategory.set(item.category, [item.name]);
});

export default class Selector extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentCategory: "fruit",
      currentItem: "apple",
    };
  }

  getCategories = () => {
    return Array.from(new Set(items.map((item) => item.category)));
  };

  getItemsInCurrentCategory = () => {
    return items.filter((item) => item.category === this.state.currentCategory);
  };

  handleCategories = (e) => {
    this.setState({
      currentCategory: e.target.value,
      currentItem: itemXcategory.get(e.target.value)[0],
    });
  };

  handleItems = (e) => {
    this.setState({
      currentItem: e.target.value,
    });
  };

  render() {
    const { currentCategory, currentItem } = this.state;
    this.categories = this.getCategories();
    this.itemsData = this.getItemsInCurrentCategory();

    return (
      <div>
        <h1 className="selectedItem">{currentItem}</h1>
        <div className="container">
          <Category
            categories={this.categories}
            currentCategory={currentCategory}
            handleCategories={this.handleCategories}
          />
          <Item
            itemsData={this.itemsData}
            currentItem={currentItem}
            handleItems={this.handleItems}
          />
        </div>
      </div>
    );
  }
}
