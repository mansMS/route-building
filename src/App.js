import React from 'react';
import arrayMove from 'array-move';
import {SortableContainer, SortableElement} from 'react-sortable-hoc';
import './App.css';

class InputField extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};

    // this.handleEnter = this.handleEnter.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({[name]: value});
  }

  render() {
    return (
      <input className="address-input" type="text" name="address-input" placeholder="Новая точка маршрута" autoFocus={true}
        onKeyDown={this.props.handleEnter} onChange={this.handleChange}></input>
    )
  }
}

const AddressElement = SortableElement((props) => 
  <li className="address-item">
    <div className="address" >{props.value}</div>
    <button className="remove-address"></button>
  </li>
);

const AddressList = SortableContainer((props) => {
  return (
    <ul className="address-list">
      {props.addresses.map((value, index) => (
        <AddressElement key={`addr-${index}`} index={index} value={value} />
      ))}
    </ul>
  );
});

// class SortableComponent extends React.Component {
//   render() {
//     return <SortableList items={this.props.routes} onSortEnd={this.props.onSortEnd} />;
//   }
// }

// function SortableComponent(props) {
//   return (
//     <SortableList items={props.routes} onSortEnd={props.onSortEnd} />
//   );
// }

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      addresses: ['Ул. Комсомольская, д. 1, кв. 20', 
                  'Ул. Павелецкая, д. 35, кв. 12',
                  'Улица 4',
                  'Улица 5',
                  'Улица 6',
                  'Улица 7',
                  'Улица 8',
                  'Ул. Колхозная, д. 21, кв. 56']
    };
    this.onSortEnd = this.onSortEnd.bind(this);
    this.handleEnter = this.handleEnter.bind(this);
  }

  onSortEnd ({oldIndex, newIndex}) {
    this.setState(({addresses}) => ({
      addresses: arrayMove(addresses, oldIndex, newIndex),
    }));
    // console.log(this.state.addresses);
  };

  handleEnter(e) {
    if (e.key === 'Enter') {
      const addresses = this.state.addresses;
      this.setState({ 
        addresses: addresses.concat(e.target.value)
      });
      e.target.value = '';
      
      console.log(this.state);
    }
  }

  render() {
    return (
      <main>
        <div className="address-column">
          <InputField handleEnter={this.handleEnter}/>
          <AddressList addresses={this.state.addresses} onSortEnd={this.onSortEnd}/>
        </div>
        <div className="map-column">
          
        </div>
      </main>
    );
  }
}

export default App;