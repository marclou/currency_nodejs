'use strict';

//http://api.fixer.io/latest?base=USD
//https://restcountries.eu/rest/v2/currency/currencyCode

const axios = require('axios');

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

const convertAndAnalyseCurrency = (from, to, amount) => {
    return getCountries(to)
        .then((countries) => {

            return getExchangeRate(from, to)
                .then((exchangeCurrency) => {
                    const exchangeAmount = exchangeCurrency * amount;

                    return `${amount} ${from} is worth ${exchangeAmount} ${to}. ${to} is available in ${countries.join(', ')}`;
                });
        });
};

convertAndAnalyseCurrency('EUR', 'CAD', 100).then((res) => console.log(res));
