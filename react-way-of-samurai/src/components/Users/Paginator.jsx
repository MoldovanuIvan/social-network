import React, {useState} from "react"
import s from "./Paginator.module.css"
import styles from "./users.module.css";

let Paginator = ({totalUsersCount, pageSize, changePageThunkCreator, currentPage, portionSize = 10}) => {

    let pagesCount = Math.ceil(totalUsersCount / pageSize)

    let pages = []

    for (let i = 1; i < pagesCount; i++) {
        pages.push(i);
    }

    let [portionNumber, setPortionNumber] = useState(1)

    let portionCount = Math.ceil(pagesCount / portionSize)

    let leftPageOfPortion = (portionNumber - 1) * portionSize + 1
    let rightPageOfPortion = portionSize * portionNumber

    return <div>
        <button disabled={portionNumber !== 1} onClick={setPortionNumber(portionNumber - 1)}>Prev</button>
        {pages.filter(p => {
            return p >= leftPageOfPortion && p <= rightPageOfPortion
        }).map(p => {
            return <span onClick={() => {
                changePageThunkCreator(p, pageSize)
            }} className={currentPage === p ? styles.selectedPage : ''}>{p}</span>
        })}
        <button disabled={portionNumber !== portionCount} onClick={setPortionNumber(portionNumber + 1)}>Next</button>
    </div>
}

export default Paginator;