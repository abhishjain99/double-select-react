import { Component } from "react";

export default class Category extends Component {
  render() {
    const { categories, currentCategory, handleCategories } = this.props;
    return (
      <div>
        <label htmlFor="categorySelect">Category</label>
        <select
          id="categorySelect"
          value={currentCategory}
          onChange={handleCategories}
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
    );
  }
}
