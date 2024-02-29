import { useState, useEffect } from 'react';

export const useCurrencyIcon = (currencyLabel:string) => {
    const [currencyIcon, setCurrencyIcon] = useState<string>('');
    useEffect(() => {
        switch (currencyLabel) {
            case 'Курс доллара':
                setCurrencyIcon('$');
                break;
            case 'Курс евро':
                setCurrencyIcon('€');
                break;
            case 'Курс юаня':
                setCurrencyIcon('¥');
                break;
            default:
                setCurrencyIcon('');
                break;
        }
    }, [currencyLabel]);

    return currencyIcon;
};


