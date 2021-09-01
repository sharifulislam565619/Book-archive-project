// data load
const dataLoad = async () => {
    const searchInput = document.getElementById("search-input")
    const searchText = searchInput.value;
    searchInput.value = '';
    toggleSpinner("block")
    if (searchText === "") {
        document.getElementById("error").style.display = "block"
        toggleSpinner("none")

    } else {
        document.getElementById("error").style.display = "none"
        const url = `http://openlibrary.org/search.json?q=${searchText}`;
        const res = await fetch(url);
        const data = await res.json();
        displayResult(data.docs)
    }



}

// spinner
const toggleSpinner = (spinning) => {
    document.getElementById("spinner").style.display = `${spinning}`
}

// display result
const displayResult = (books) => {

    if (books.length < 1) {
        document.getElementById("search-founded").style.display = "block"
    } else {

        const searchResult = document.getElementById("search-result");
        searchResult.textContent = '';
        document.getElementById("search-founded").style.display = "block"
        document.getElementById("result-count").innerText = `Your search result is ${books.length}`
        books.forEach(book => {

            const div = document.createElement("div");
            div.classList.add("col");
            div.innerHTML = `
             <div class="card">
             <h5 class="card-title">Book Name: ${book.text[1] ? book.text[1] : ''}</h5>
             <h6>Author Name: ${book.author_name ? book.author_name :''}</h6>
             <p>First publish: ${book.first_publish_year ? book.first_publish_year :'' } </p>
             </div>
             `
            searchResult.appendChild(div)


            // console.log(book)
        })
    }

    toggleSpinner("none")
}