import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Product from './Product';

class Main extends Component {

    constructor(){
      super();

      this.state = {
        products: [],
        currentProduct: null
      }
    }

    componentDidMount() {
      /* fetch API in action */
        fetch('/api/products')
          .then(response => {
            return response.json();
          })
          .then(products => {
            this.setState({ products });
          });
    }

    renderProducts() {
      return this.state.products.map(product => {
        return (
          <li onClick={
                () =>this.handleClick(product)} key={product.id} >
                { product.title }
          </li>
        );
      })
    }

    handleClick(product) {
      this.setState({currentProduct:product});
    }

    render() {
        return (
          <div>
           <div>
            <h3> All products </h3>
             <ul>
               { this.renderProducts() }
             </ul>
           </div>

           <Product product={this.state.currentProduct} />
           </div>
        );
    }
}

export default Main;

/* The if statement is required so as to Render the component on pages that have a div with an ID of "root";
*/

if (document.getElementById('root')) {
    ReactDOM.render(<Main />, document.getElementById('root'));
}
