import React from "react";
import styles from "../styles/modal.module.scss";
import { openModal} from "../store/portfolioSlice";
import {useDispatch} from "react-redux";


const AddAssetButton = () => {
    const dispatch = useDispatch();
    return (
        <div>
            <button className={styles.addButton} onClick={() => dispatch(openModal())}>
                Добавить
            </button>
        </div>
    );
};

export default AddAssetButton;
