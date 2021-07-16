import React, {useState} from "react";
import styles from "./users.module.css";
import image from "../../images/avatar.jpg";
import {NavLink} from "react-router-dom";
import Paginator from "./Paginator";


const Users = (props) => {

    let portionSize = 1000;

    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);

    let pages = [];

    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }

    let portionCount = Math.ceil(pagesCount / portionSize)
    let [portionNumber, setPortionNumber] = useState(1)
    let leftPageOfPortion = (portionNumber - 1) * portionSize + 1
    let rightPageOfPortion = portionSize * portionNumber

    return <div>
        <div>

            <button disabled={portionNumber == 1} onClick={()=>setPortionNumber(portionNumber - 1)}>Prev</button>

            {pages.filter(p => {
                return p >= leftPageOfPortion && p <= rightPageOfPortion
            }).map(p => {
                return <span onClick={() => {
                    props.changePageThunkCreator(p, props.pageSize)
                }} className={props.currentPage === p ? styles.selectedPage : ''}>{p}</span>
            })}

                <button disabled={portionNumber == portionCount}
                        onClick={()=>setPortionNumber(portionNumber + 1)}>Next</button>

        </div>
        {
            props.users.map(u => <div className={styles.wrapper} key={u.id}>
                <div className={styles.photoWrapper}>
                    <div>
                        <NavLink to={"/profile/" + u.id}>
                            <img src={u.photos.small != null ? u.photos.small : image} className={styles.userPhoto}/>
                        </NavLink>
                    </div>
                    <div>
                        {u.followed
                            ? <button disabled={props.followingInProgress.some(id => id === u.id)} onClick={() => {

                                props.followUserThunkCreator(u.id)

                            }}>Unfollow</button>
                            : <button disabled={props.followingInProgress.some(id => id === u.id)} onClick={() => {

                                props.unfollowUserThunkCreator(u.id)

                            }}>Follow</button>}

                    </div>
                </div>
                <div>
                    <div>
                        <div>{u.name}</div>
                        <div>{u.status}</div>
                    </div>
                    <div>
                        <div>{"u.location.country"}</div>
                        <div>{"u.location.city"}</div>
                    </div>
                </div>
            </div>)
        }
    </div>
}

export default Users