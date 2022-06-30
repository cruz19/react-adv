import { useEffect, useRef, useState } from "react";
import { onChangeArgs, Product } from '../interfaces/interfaces';

interface useProductArgs {
    value?: number;
    product: Product;
    onChange?: (args: onChangeArgs) => void;
}

export const useProduct = ({ product, onChange, value = 0 }: useProductArgs) => {
    const [counter, setCounter] = useState(value);
    const isControlled = useRef(!!onChange);

    const increaseBy = (value: number) => {
        if (isControlled.current){
            return onChange!({ count: value, product }); // -> ! le indica a typescript que confie en que el onChange siempre va a tener valor allí
        }
        const newValue = Math.max(counter + value, 0);
        setCounter(newValue);
        onChange && onChange({ count: newValue, product });
    }

    useEffect(() => {
        setCounter(value);
    }, [value]);

    return {
        counter,
        increaseBy
    };
}