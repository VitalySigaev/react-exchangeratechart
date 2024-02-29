import { FC } from 'react';
import { Text } from '@consta/uikit/Text';
import classes from './AverageValue.module.css'
import { Theme, presetGpnDefault } from '@consta/uikit/Theme';


interface AverageValueChartProps {
    averageValue: number;
}

const AverageValue: FC<AverageValueChartProps> = ({ averageValue }) => {

    return (
        <Theme preset={presetGpnDefault} className={classes.container}>
            <div>
                <h3 className={classes.heading}>  Среднее за период</h3>
                <div className={classes.textContainer}>
                    <Text className={classes.text}>{averageValue.toFixed(1)}</Text>
                    <span>₽</span>
                </div>
            </div>
        </Theme>
    );
};

export default AverageValue;
