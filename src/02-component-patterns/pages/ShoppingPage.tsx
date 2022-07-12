import { products } from '../data/products';
import { ProductCard, ProductImage, ProductTitle, ProductButtons } from "../components";

import '../styles/custom-styles.css';

const product  = products[0];

export const ShoppingPage = () => {
  return (
    <div>
        <h1>Shopping Store</h1>
        <hr />
        <ProductCard
          product={product}
          className='bg-dark text-white'                
          initialValues={{
            count: 4,
            maxCount: 10
          }}
        >
          {
            ({ increaseBy, count, reset, maxCount, isMaxCountReached }) => (
              <>
                <ProductImage className='custom-image' />
                <ProductTitle className='text-bold' />
                <ProductButtons className='custom-buttons' />

                <button onClick={reset}>Reset</button>
                <button onClick={() => increaseBy(-2)}> -2 </button>
                { !isMaxCountReached && <button onClick={() => increaseBy(2)}> +2 </button> }
                <span>{ count } - { maxCount }</span>
              </>
            )
          }
        </ProductCard>
    </div>
  )
}
