import React, { useState } from "react";
import BookCard from "./components/BookCard";
import { ADD_TYPE } from "./components/buttonTypes";
import CustomButton from "./components/CustomButton";
import { Toast, toast } from "react-toastify";

const App = () => {
  const [bookName, setBookName] = useState("");
  // console.log(inputText)
  const [bookList, setBookList] = useState([]);
  const addBook = (e) => {
    e.preventDefault();
    // console.log("fonsiyon calisti");
    const newBook = {
      id: new Date().getTime(),
      bookTitle: bookName,
      date: new Date().toLocaleString(),
      isRead: false,
    };
    setBookList([...bookList, newBook]);

    setBookName("");

  toast.success("Book Successfully Added");
    };

 const handleDelete = (deleteId) => {
  const filteredList = bookList.filter((book) => book.id !== deleteId);
  setBookList(filteredList);

  toast.error('Book deleted');

    };
//   console.log(bookList);

const handleReadChange = (book) => {
  const updatedBook = { ...book, isRead: !book.isRead }
  const cloneBookList = [...bookList]
  const bookIndex = cloneBookList.findIndex((item) => item.id === book.id)
  cloneBookList.splice(bookIndex, 1, updatedBook);
  setBookList(cloneBookList);

};

const handleEdit = (book, newTitle) => {
  const updated = { ...book, bookTitle: newTitle };
  // console.log(bookl);
  const newList = bookList.map((book) =>
      book.id !== updated.id ? book : updated
    );
  setBookList(newList);
 toast.info('Book title edited')
  };



return (
  <div>
   <header className="text-light py-2 text-center fs-5 border" style={{  textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>
  Book Addict
</header>


    <div className="container border pb-5">
      <form className="d-flex gap-3 mt-4" onSubmit={addBook}>
        <input
          value={bookName}
          onChange={(e) => setBookName(e.target.value)}
          placeholder="Enter Book Name"
          className="form-control shadow"
        />
        <CustomButton type={ADD_TYPE} title={"Add"} />
      </form>
      <div className="d-flex flex-column gap-5 mt-3">
        {bookList.length === 0 ? (
          <p className="text-white">No Book Added Yet</p>
        ) : (
          bookList.map((book) => {
           
            return (
              <BookCard
                  readUpdateClick={() => handleReadChange(book)}
                  deleteClick={() => handleDelete(book.id)}
                  handleEdit={handleEdit}
                  bookInfo={book}
              />
            );
          })
        )}
      
      </div>
    </div>
  </div>
);
};
export default App;
