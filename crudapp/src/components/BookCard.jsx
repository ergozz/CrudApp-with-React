import { useState } from "react"
import { DELETE_TYPE, EDIT_TYPE, READ_TYPE } from "./buttonTypes"
import CustomButton from "./CustomButton"


const BookCard = ({ bookInfo, deleteClick, readUpdateClick, handleEdit }) => {
    const [editMode, setEditMode] = useState(false);

    return (
        <div className="d-flex justify-content-between align-items-center border p-3 shadow book-card">
            <div>
                {editMode ? 
                    <form className="d-flex gap-2"
                        onSubmit={(e) => {
                            e.preventDefault();
                            handleEdit(bookInfo, e.target[0].value)
                            setEditMode(false);
                        }}>
                        <input className="form-control shadow" defaultValue={bookInfo.bookTitle} />
                        <button className="btn btn-success shadow">Save</button>
                    </form>
                 : 
                    <h5
                        style={{
                            textDecoration: bookInfo.isRead ? 'line-through' : 'none', }}
                        >
                            {bookInfo.bookTitle}
                    </h5>

                }

                <p>{bookInfo.date}</p>
            </div>

            <div className="btn-group gap-2 text-white">
                <CustomButton title={'Delete'} type={DELETE_TYPE} onClick={deleteClick} />

                <CustomButton title={editMode ? 'Cancel' : 'Edit'} type={EDIT_TYPE} onClick={() => setEditMode(!editMode)} />

                <CustomButton title={bookInfo.isRead === false ? 'Not Read' : 'Read'} type={READ_TYPE} onClick={readUpdateClick} />
            </div>
        </div>
    )
}

export default BookCard