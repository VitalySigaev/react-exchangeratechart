import axios from "axios";
import { ExchangeRate } from "../components/ExchangeRateChart/ExchangeRateChartTypes";

export const fetchData = async () => {
    try {
        const response = await axios.get<ExchangeRate[]>(
            'https://64f05e768a8b66ecf77988dd.mockapi.io/api/gallery/exchangeRate'
        );
        return response;

    } catch (error) {
        console.error(error);
    }
};
