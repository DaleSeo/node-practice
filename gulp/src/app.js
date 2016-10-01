import React from 'react';
import ReactDOM from 'react-dom';
import ItemList from './components/itemlist';

let items = [
  {
    id: 0,
    name: 'Apple',
    price: 100
  },
  {
    id: 1,
    name: 'Orange',
    price: 150
  },
  {
    id: 2,
    name: 'Grapes',
    price: 200
  }
];

class App extends React.Component {
  render() {
    return (
      <div>
        <h1>List of items</h1>
        <ItemList items={this.props.items} />
      </div>
    );
  }
}

ReactDOM.render(<App items={items} />, document.getElementById('app'));