import { createContext } from 'react';
import styles from '../styles/styles.module.css';
import { useProduct } from '../hooks/useProduct';
import { Product, ProductContextProps, onChangeArgs } from '../interfaces/interfaces';

export interface Props {
    value?: number;
    product: Product;
    className?: string;
    style?: React.CSSProperties;
    onChange?: (args: onChangeArgs) => void;
    children?: React.ReactElement | React.ReactElement[];
}

export const ProductContext = createContext({} as ProductContextProps);
const { Provider } = ProductContext;

export const ProductCard = ({ children, product, className, style, onChange, value }: Props) => {
    const { counter, increaseBy } = useProduct({ product, onChange, value });

    return (
        <Provider value={{ counter, increaseBy, product }}>
            <div
                style={ style } 
                className={ `${ styles.productCard } ${ className }` }
            >
                { children }
            </div>
        </Provider>
    )
}