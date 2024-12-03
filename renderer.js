const API_KEY = ""; // add Open Exchange Rates API key
const BASE_URL = "https://openexchangerates.org/api/latest.json";

const convertButton = document.getElementById("convert");
const resultDiv = document.getElementById("result");

convertButton.addEventListener("click", async () => {
    const fromCurrency = document.getElementById("fromCurrency").value;
    const toCurrency = document.getElementById("toCurrency").value;
    const amount = parseFloat(document.getElementById("amount").value);

    if (!amount || amount <= 0) {
        resultDiv.textContent = "Please enter a valid amount.";
        return;
    }

    try {
        const response = await fetch(`${BASE_URL}?app_id=${API_KEY}`);
        const data = await response.json();

        if (!data.rates[fromCurrency] || !data.rates[toCurrency]) {
            resultDiv.textContent = "Currency not supported.";
            return;
        }

        const fromRate = data.rates[fromCurrency];
        const toRate = data.rates[toCurrency];
        const convertedAmount = (amount / fromRate) * toRate;

        resultDiv.textContent = `${amount} ${fromCurrency} = ${convertedAmount.toFixed(2)} ${toCurrency}`;
    } catch (error) {
        resultDiv.textContent = "Error fetching data. Please try again.";
        console.error(error);
    }
});
