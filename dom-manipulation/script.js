document.addEventListener('DOMContentLoaded', () => {
    const quotes = [{
        text: 'Just do it!', 
        category: 'Motivation' },
        {
         text: 'Life is what happens when you are busy making other plans', 
         category: 'Life'
        }, 
        {
        text: 'Live in the moment', 
        category: 'Life'
        }, 
        {
            text: 'Choose joy',
            category: 'happiness'
        }
    ] 
    const quoteDisplay = document.getElementById("quoteDisplay"); 
    const newQuoteText = document.getElementById("newQuoteText"); 
    const newQuoteCategory = document.getElementById("newQuoteCategory"); 
    const categorySelect = document.getElementById("categorySelect");  

    const updateCategories = () => {
        const uniqueCategories = [...new Set(quotes.map(quote => quote.category))] 
        categorySelect.innerHTML = "<option value = ''>All categories </option>"; 
        uniqueCategories.forEach(category => {
            const option = document.createElement('option'); 
            option.value = category; 
            option.textContent = category; 
            categorySelect.appendChild(option);
        });
    } 
    const showRandomQuote = () => { 
        const selectedCategory = categorySelect.value; 
        const filterQuotes = selectedCategory ? quotes.filter(quote => quote.category === selectedCategory) : quotes; 
        const randomQuote = filterQuotes[Math.floor(Math.random() * filterQuotes.length)]; 
        quoteDisplay.textContent = randomQuote ? randomQuote.text : 'No quotes Available';
 } 
 document.getElementById('newQuote').addEventListener('click', showRandomQuote) 

 window.createAddQuoteForm = () => {
    const newQuote = {
        text: newQuoteText.value, 
        category: newQuoteCategory.value
    }; 
    quotes.push(newQuote); 
    newQuoteText.value = ''; 
    newQuoteCategory.value = ''; 
    updateCategories(); 
    saveQuotes();
    alert('Quote added successfully');
}; 
//function to export quotes to a JSON file 
const exportQuotes = () => {
    const quotesJson = JSON.stringify(quotes); 
    const blob = new Blob([quotesJson], {type: 'application/json}'}); 
    const url = URL.createObjectURL(blob); 
    const a = document.createElement('a'); 
    a.href = url; 
    a.download =  'quotes.Json'; 
    document.body.appendChild('a'); 
    a.click(); 
    document.body.removeChild(a); 
    URL.revokeObjectURL(url);
};
//function to import quotes from JSON file 
const importFromJsonFile = (event) => { 
    const fileReader = newFileReader();  
    fileReader.onload = function(event){
        const importedQuotes = JSON.parse(event.target.result); 
        quotes.push(...importedQuotes); 
        updateCategories(); 
        saveQuotes(); 
        alert('Quotes imported syccessfully!');
    }; 
    fileReader.readAsText(event.target.files[0]);

}; 
//function to saveQuotes to local storage 
const saveQuotes = () => {
    localStorage.setItem('quotes', JSON.stringify(quotes)); 
}; 
//fucntion to load quotes from local storage 
const loadQuotes = () => {
    const storedQuotes = localStorage.getItem('quotes'); 
    if(storedQuotes){
        quotes.push(...JSON.parse(storedQuotes)); 
        updateCategories();
    };
}; 
loadQuotes(); 
updateCategories();

});
