

async function fetchBookData() {
  try {
      const response = await fetch('https://gutendex.com/books/');
      const data = await response.json();
      console.log(data,"datadatadata")
      return data;
  } catch (error) {
      console.error('Error fetching book data:', error);
      return null;
  }
}
function getRandomNumber() {
  return Math.floor(Math.random() * 33);
}


async function displayBookData() {
  const bookData = await fetchBookData();
  if (bookData && bookData.results) {
    const randomNumber = getRandomNumber();
      const firstBook = bookData.results[randomNumber];
      document.querySelector('h1').textContent = firstBook.title;

      const authorSection = document.querySelectorAll('section')[0];
      authorSection.innerHTML = `<h2>Author</h2><p><strong>${firstBook.authors[0].name}</strong> (${firstBook.authors[0].birth_year} - ${firstBook.authors[0].death_year})</p>`;

      const subjectsSection = document.querySelectorAll('section')[1];
      const subjectsList = subjectsSection.querySelector('ul');
      subjectsList.innerHTML = firstBook.subjects.map(subject => `<li>${subject}</li>`).join('');

      const bookshelvesSection = document.querySelectorAll('section')[2];
      const bookshelvesList = bookshelvesSection.querySelector('ul');
      bookshelvesList.innerHTML = firstBook.bookshelves.map(bookshelf => `<li>${bookshelf}</li>`).join('');

      const downloadLinksSection = document.querySelectorAll('section')[3];
      const downloadLinksList = downloadLinksSection.querySelector('ul');
      downloadLinksList.innerHTML = Object.keys(firstBook.formats).map(format => `<li>Links:<a href="${firstBook.formats[format]}">Book ${format}</a></li>`).join('');


      const bookCoverSection = document.querySelectorAll('section')[4];
      const bookCoverImg = bookCoverSection.querySelector('img');
      bookCoverImg.src = firstBook.formats['image/jpeg'];

  } else {
      console.log('No book data available.');
  }
}

// Call the displayBookData function to fetch and display book data
displayBookData();
