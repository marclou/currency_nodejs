'use strict';

const axios = require('axios');

// ES6 PROMISES
const getExchangeRate = (from, to) => {
    return axios
        .get(`http://api.fixer.io/latest?base=${from}`)
        .then((res) => {
            return res.data.rates[to];
        })
        .catch((e) => console.log(e));
};

const getCountries = (currency) => {
    return axios
        .get(`https://restcountries.eu/rest/v2/currency/${currency}`)
        .then((res) => {
            return res.data.map(country => country.name);
        })
        .catch((e) => console.log(e));
};

const convertAndAnalyseCurrencyAsync = (from, to, amount) => {
    return getCountries(to)
        .then((countries) => {

            return getExchangeRate(from, to)
                .then((exchangeCurrency) => {
                    const exchangeAmount = exchangeCurrency * amount;

                    return `${amount} ${from} is worth ${exchangeAmount} ${to}. ${to} is available in ${countries.join(', ')}`;
                });
        });
};

//ES7 ASYNC AWAIT
const getExchangeRateAsync = async (from, to) => {
	try {
		const response = await axios.get(`http://api.fixer.io/latest?base=${from}`);

		return response.data.rates[to];

	} catch (error) {
		console.log(error);
	}
};

const getCountriesAsync = async (currency) => {
    try {
        const response = await axios.get(`https://restcountries.eu/rest/v2/currency/${currency}`);

        return response.data.map(country => country.name);

    } catch(error) {
        console.log(error);
    }
};

const convertAndAnalyseCurrency = async (from, to, amount) => {
    const countries = await getCountriesAsync(to);
    const exchangeCurrency = await getExchangeRateAsync(from, to);
    const exchangeAmount = exchangeCurrency * amount;

    return `${amount} ${from} is worth ${exchangeAmount} ${to}. ${to} is available in ${countries.join(', ')}`;
};


convertAndAnalyseCurrency('EUR', 'CAD', 100).then((res) => console.log(res));
convertAndAnalyseCurrencyAsync('EUR', 'CAD', 100).then((res) => console.log(res));
