export const getEchartsOptions = (filterDataByCurrency, selectedCurrency, classes, xAxisData) => {
    return {
        grid: {
            right: 34,
        },
        xAxis: {
            data: xAxisData,
            boundaryGap: false,
            axisLabel: {
                fontFamily: 'Open Sans',
                fontSize: 14,
                fontWeight: 400,
                lineHeight: 15,
                color: 'rgba(0, 32, 51, 0.6)',
                padding: [10, 0, 0],
            },
            axisLine: {
                show: false,
            },
            axisTick: {
                show: false,
            },
        },
        yAxis: {
            min: Math.min(...filterDataByCurrency(selectedCurrency)),
            max: Math.max(...filterDataByCurrency(selectedCurrency)),
            axisLabel: {
                fontFamily: 'Inter',
                fontSize: 14,
                fontWeight: 400,
                lineHeight: 15,
                color: '#667985',
                padding: [0, 5, 0],
            },
            splitLine: {
                lineStyle: {
                    color: 'rgba(0, 65, 102, 0.2)',
                    type: 'dashed',
                },
            },
        },
        tooltip: {
            trigger: 'axis',
            formatter: (params) => {
                const data = params[0];
                const date = data.name;
                const currencyValue = filterDataByCurrency(selectedCurrency)[params[0].dataIndex];
                const currencyLabel = selectedCurrency;
                return `
              <div class=${classes.tooltipContainer}>
                  <h3 class=${classes.tooltipDate}>${date} год</h3>
                  <div class=${classes.tooltipText}>
                   <div class=${classes.tooltipName}>${currencyLabel}:
                    <div class=${classes.tooltipValue}>${currencyValue}₽</div>
                    </div>
                  </div>
              </div>
            `;
            },

        }, series: [
            {
                name: selectedCurrency,
                type: 'line',
                data: filterDataByCurrency(selectedCurrency),
                lineStyle: {
                    color: 'rgba(243, 139, 0, 1)',
                    width: 2,
                },
                symbol: 'none',
            },
        ],
    }
};