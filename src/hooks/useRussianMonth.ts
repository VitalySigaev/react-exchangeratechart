
import { useMemo } from 'react';

export const useRussianMonth = () => {
    const getRussianMonth = (dateString: string) => {
        const months = {
            '01': 'янв',
            '02': 'фев',
            '03': 'мар',
            '04': 'апр',
            '05': 'май',
            '06': 'июн',
            '07': 'июл',
            '08': 'авг',
            '09': 'сен',
            '10': 'окт',
            '11': 'ноя',
            '12': 'дек',
        };

        const [year, month] = dateString.split('-');
        return `${months[month]} ${year}`;
    };

    return useMemo(() => getRussianMonth, []); 
};

