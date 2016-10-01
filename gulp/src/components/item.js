import React from 'react';

class Item extends React.Component {
  render() {
    return (
      <li>
        {this.props.item.name} {this.props.item.phone}
      </li>
    );
  }
}

export default Item;