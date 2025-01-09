const amountInput = document.getElementById('amount');
const fromCurrency= document.getElementById('from');
const toCurrency= document.getElementById('to');
const convertbtn = document.getElementById('convert-btn');
const result = document.getElementById('result');
const baseCurrency = document.getElementById('base-currency');
const exchangebtn = document.getElementById('exchange-btn');
const exchangeRates = document.getElementById('exchange-rates');
const convertMode = document.getElementById('convert-mode');
const exchangeMode = document.getElementById('exchange-mode');
const togglebtn = document.querySelectorAll('.toggle-btn');

const apiKey = "d2ff3ba6427eab658afb13fd";

togglebtn.forEach((btn)=>{
    btn. addEventListener('click',()=>{
        togglebtn.forEach((btn)=>{
            btn.classList.remove('active');
        });
        btn.classList.add('active');
        const mode = btn.getAttribute('data-mode');
        if(mode === 'convert'){
            convertMode.style.display = 'flex';
            exchangeMode.style.display = 'none';
        }
        else{
            convertMode.style.display = 'none';
            exchangeMode.style.display = 'flex';
        }
    });
});

convertbtn.addEventListener('click',()=>{
    const amount = amountInput.value;
    const from = fromCurrency.value;
    const to = toCurrency.value;

    fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/pair/${from}/${to}/${amount}`)
    .then((response)=>response.json())
    .then((data)=>{
        const rate = data.conversion_rate;
        const convertedAmount = (rate * amount).toFixed(2);
        result.innerHTML = `<span class="currency-icon"></span>${convertedAmount} ${to}`;
    })
    .catch((error)=>{
        console.log(error);
    });
});


exchangebtn.addEventListener('click',()=>{
    const base = baseCurrency.value;
    fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/latest/${base}`)
    .then((response)=>response.json())
    .then((data)=>{
        let rateshtml = "<h3>Exchange Rates</h3>";
        for(const [currency,rate] of Object.entries(data.conversion_rates)){
            if (currency!==base)
                rateshtml += `<li><span class="currency-icon">${currency}: ${rate.toFixed(4)}</li>`;
        }
        rateshtml+="</ul>";
        exchangeRates.innerHTML = rateshtml;

    })
    .catch((error)=>{
        exchangeRates.textContent = "An error occurred. Please try again.";
    });
});