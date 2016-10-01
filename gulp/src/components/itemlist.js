import React from 'react';
import Item from './item';

class ItemList extends React.Component {
  constructor() {
    super();
  }

  render() {

    return (
      <div>
        <ul>
          {
            this.props.items.map( (item) => {
              return <item item={item} key={item.id} />;
            })
          }
        </ul>
      </div>
    );

  }
}

export default ItemList;