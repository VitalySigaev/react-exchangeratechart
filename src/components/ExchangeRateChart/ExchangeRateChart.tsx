import { useEffect, useState, FC } from 'react';
import { ReactECharts } from '../Echarts/ReactECharts';
import { Button } from '@consta/uikit/Button';
import classes from './ExchangeRateChart.module.css'
import { ExchangeRate } from './ExchangeRateChartTypes';
import { fetchData } from '../../data/fetchData';
import AverageValue from '../AverageValue/AverageValue';
import { Text } from '@consta/uikit/Text';
import { Theme, presetGpnDefault } from '@consta/uikit/Theme';
import { useCurrencyIcon } from '../../hooks/useCurrencyIcon';
import { Grid, GridItem } from '@consta/uikit/Grid';
import { useRussianMonth } from '../../hooks/useRussianMonth';
import { getEchartsOptions } from '../Echarts/EchartsOptions';




const ExchangeRateChart: FC = () => {
    const [exchangeRate, setExchangeRate] = useState<ExchangeRate[]>([]);
    const [selectedCurrency, setSelectedCurrency] = useState<string>('Курс доллара');
    const currencyIcon = useCurrencyIcon(selectedCurrency);
    const getRussianMonth = useRussianMonth();

    useEffect(() => {
        const fetchExchangeRates = async () => {
            try {
                const response = await fetchData();
                setExchangeRate(response.data);

            } catch (error) {
                console.error('Error', error);
            }
        };

        fetchExchangeRates();
    }, []);

    const filterDataByCurrency = (currency: string) => {
        return exchangeRate
            .filter(item => item.indicator === currency)
            .map(item => item.value);
    };
    
    const xAxisData = exchangeRate
        .filter(item => item.indicator === selectedCurrency)
        .map(item => getRussianMonth(item.date));

    const option = getEchartsOptions(filterDataByCurrency, selectedCurrency, classes, xAxisData)

    const averageValue = filterDataByCurrency(selectedCurrency).reduce((sum, value) => sum + value, 0) / filterDataByCurrency(selectedCurrency).length;

    return (
        <Theme className={classes.container} preset={presetGpnDefault}>
            <Grid rowGap="xl" yAlign="bottom">
                <GridItem rowStart={1} >
                    <Text className={classes.text} weight="black" size="2xl" >
                        {selectedCurrency}, {currencyIcon}/₽
                    </Text>
                </GridItem>
                <GridItem className={classes.buttonsContainer} rowStart={1} >
                    <Button
                        label="$"
                        onClick={() => setSelectedCurrency('Курс доллара')}
                        view={selectedCurrency === 'Курс доллара' ? 'primary' : 'clear'}
                    />
                    <Button
                        label="€"
                        onClick={() => setSelectedCurrency('Курс евро')}
                        view={selectedCurrency === 'Курс евро' ? 'primary' : 'clear'}
                        className={classes.button}
                    />
                    <Button
                        label="¥"
                        onClick={() => setSelectedCurrency('Курс юаня')}
                        view={selectedCurrency === 'Курс юаня' ? 'primary' : 'clear'}
                    />
                </GridItem>
            </Grid>

            <Grid colGap='xs' cols={6} yAlign="center" rowGap='l' >
                <GridItem colStart={1} col={5}>
                    <ReactECharts
                        option={option}
                        style={{ height: '400px', maxWidth: '1200px' }}
                    />
                </GridItem>
                <GridItem colStart="6">
                    <AverageValue averageValue={averageValue} />
                </GridItem>
            </Grid>
        </Theme>
    );
};

export default ExchangeRateChart;

