// data load
const dataLoad = async () => {
    const searchInput = document.getElementById("search-input")
    const searchText = searchInput.value;
    searchInput.value = '';
    toggleSpinner("block")
    if (searchText === "") {
        searchNotFount("none")
        document.getElementById("error").style.display = "block"
        toggleSpinner("none")

    } else {
        document.getElementById("error").style.display = "none"
        const url = `HTTPS://openlibrary.org/search.json?q=${searchText}`;
        const res = await fetch(url);
        const data = await res.json();
        // console.log(data)
        displayResult(data)
    }



}

// Loading spinner
const toggleSpinner = (spinning) => {
    document.getElementById("spinner").style.display = `${spinning}`
}

// Result not found
const searchNotFount = (display) => {
    document.getElementById("search-founded").style.display = `${display}`

}

// total result count
const resultCount=(display)=>{
    document.getElementById("result-count").style.display=`${display}`
}

// display result
const displayResult = (data) => {
    const books = data.docs
    const searchResult = document.getElementById("search-result");
    searchResult.textContent = '';
    searchNotFount("none")
 
    if (data.numFound === 0) {
        resultCount( "none");
        searchNotFount("block")
    } else {

        searchNotFount("none")
        resultCount( "block");
        document.getElementById("result-count").innerText = `Your search result is: ${data.numFound}`
        books.forEach(book => {

            const div = document.createElement("div");
            div.classList.add("col");
            div.innerHTML = `
             <div class="card align-items-center">
                <img src="HTTPS://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="card-img-top w-50 py-3" alt="Image not found">
                <h6 class="card-title text-bold"><strong>Book Name:</strong> ${book.title ? book.title : ''}</h6>
                <p class="mb-0"><strong>Author Name:</strong> ${book.author_name ? book.author_name :''}</p>
                <small>First publish: ${book.first_publish_year ? book.first_publish_year :'' } </small>
                <small>Publisher: ${book.publisher ? book.publisher :'' }</small>
             </div>
             `
            searchResult.appendChild(div)

        })
    }

    toggleSpinner("none")


}