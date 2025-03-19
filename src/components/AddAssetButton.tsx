import React from "react";
import styles from "../styles/assetInput.module.scss";
import { openModal} from "../store/portfolioSlice";
import {useDispatch} from "react-redux";
import classNames from 'classnames';

const AddAssetButton = () => {
    const dispatch = useDispatch();
    return (
        <>
            <button className={classNames(styles.addButton, styles.button)} onClick={() => dispatch(openModal())}>
                Добавить
            </button>
        </>
    );
};

export default AddAssetButton;
