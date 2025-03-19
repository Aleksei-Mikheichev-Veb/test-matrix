import React, { useState } from "react";
import styles from "../styles/assetInput.module.scss";
import {useDispatch} from "react-redux";
import {addAsset, closeModal} from "../store/portfolioSlice";
import {Asset} from "../types/asset";
import { v4 as uuidv4 } from 'uuid';
import classNames from "classnames";

interface Props {
    asset: Asset| undefined;
}

const AssetInput: React.FC<Props> = ({ asset }) => {
    const [quantity, setQuantity] = useState('null');
    const dispatch = useDispatch()
    const handleSelect = () => {
        if(asset){
            const newAsset = {...asset, quantity:+quantity, id: uuidv4() }
            dispatch(addAsset(newAsset));
        }
        dispatch(closeModal())
    };

    return (
        <div className={styles.container}>
            <label className={styles.label}>Количество:
                <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    className={styles.input}
                />
            </label>

            <div className={styles.buttonGroup}>
                <button onClick={handleSelect} className={classNames(styles.addButton, styles.button)}>Добавить</button>
                <button onClick={() => dispatch(closeModal())} className={classNames(styles.cancelButton, styles.button)}>Сбросить</button>
            </div>
        </div>
    );
};

export default AssetInput;
