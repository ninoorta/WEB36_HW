let books = [
    {
        author: 'Bill Gates',
        title: 'The Road Ahead'
    },
    {
        author: 'Steve Jobs',
        title: 'Walter Isaacson'
    },
    {
        author: 'Suzanne Collins',
        title: 'Mockingjay: The Final Book of The Hunger Games'
    }
]


// Nhập tên sách hoặc tên tác giả vào ô input và thực hiện tìm kiếm khi click vào button search.

let buttonSearch = document.getElementById('btnSearch');
buttonSearch.onclick = search;

function search() {
    console.log('deleted')
    document.getElementById('result').innerText = '';
    let html = ``;
    let result = [];
    if (inputValue.trim() === null || inputValue.trim() === "") {
        alert('Enter what you want to search.')
    } else {

        for (const book of books) {
            if ((book.author.toLowerCase().indexOf(inputValue.toLowerCase()) !== -1)
                || (book.author.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1)) {
                // return document.getElementById('result').innerText = book.author;
                result.push(book.author)
            }
            else if ((book.title.toLowerCase().indexOf(inputValue.toLowerCase()) !== -1)
                || (book.title.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1)) {
                // return document.getElementById('result').innerText = book.title;
                result.push(book.title)
            }
        }
        for (const element of result) {
            html += element + "\n";
        }

        document.getElementById('result').innerText = html;

    }
}