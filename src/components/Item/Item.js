import { Component } from "react";

export default class Item extends Component {
  render() {
    const { itemsData, currentItem, handleItems } = this.props;
    return (
      <div>
        <label htmlFor="temSelect">Item</label>
        <select id="itemSelect" value={currentItem} onChange={handleItems}>
          {itemsData.map((item) => (
            <option key={item.name} value={item.name}>
              {item.name}
            </option>
          ))}
        </select>
      </div>
    );
  }
}
