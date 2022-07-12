import { createContext } from 'react';
import styles from '../styles/styles.module.css';
import { useProduct } from '../hooks/useProduct';
import { Product, ProductContextProps, onChangeArgs, InitialValues, ProductCardHandlers } from '../interfaces/interfaces';

export interface Props {
    value?: number;
    product: Product;
    className?: string;
    style?: React.CSSProperties;
    children: (args: ProductCardHandlers) => JSX.Element;
    // children?: React.ReactElement | React.ReactElement[];
    initialValues: InitialValues; 
    onChange?: (args: onChangeArgs) => void;
}

export const ProductContext = createContext({} as ProductContextProps);
const { Provider } = ProductContext;

export const ProductCard = ({
    children,
    product,
    className,
    style,
    onChange,
    value,
    initialValues
}: Props) => {
    const { counter, increaseBy, reset, maxCount, isMaxCountReached } = useProduct({ product, onChange, value, initialValues });

    return (
        <Provider value={{ counter, increaseBy, maxCount, product }}>
            <div
                style={ style } 
                className={ `${ styles.productCard } ${ className }` }
            >
                {
                    children({
                        count: counter,
                        isMaxCountReached,
                        maxCount: initialValues?.maxCount,
                        product,
                        increaseBy,
                        reset
                    })
                }
            </div>
        </Provider>
    )
}