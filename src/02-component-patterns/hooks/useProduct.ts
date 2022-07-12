import { useEffect, useRef, useState } from "react";
import { onChangeArgs, Product, InitialValues } from '../interfaces/interfaces';

interface useProductArgs {
    value?: number;
    product: Product;
    initialValues?: InitialValues;
    onChange?: (args: onChangeArgs) => void;
}

export const useProduct = ({ product, onChange, initialValues, value = 0 }: useProductArgs) => {
    const isMounted = useRef(false);
    const [counter, setCounter] = useState<number>(initialValues?.count || value);

    const increaseBy = (value: number) => {
        let newValue = Math.max(counter + value, 0);
        if (initialValues?.maxCount)
            newValue = Math.min(newValue, initialValues.maxCount);
        setCounter(newValue);
        onChange && onChange({ count: newValue, product });
    }

    const reset = () => {
        setCounter(initialValues?.count || value);
    }

    useEffect(() => {
        if (!isMounted.current) return;
        setCounter(value);
    }, [value]);

    useEffect(() => {
        isMounted.current = true;
    }, []);

    return {
        reset,
        counter,
        increaseBy,
        maxCount: initialValues?.maxCount,
        isMaxCountReached: !!initialValues?.count && initialValues.maxCount === counter,
    };
}