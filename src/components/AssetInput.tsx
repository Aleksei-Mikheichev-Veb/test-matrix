import React, { useState } from "react";
import styles from "../styles/modal.module.scss";
import {useDispatch} from "react-redux";
import {addAsset, closeModal} from "../store/portfolioSlice";
import {Asset} from "../types/asset";
import { v4 as uuidv4 } from 'uuid';

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
        <div>
            <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className={styles.input}
            />
            <button onClick={() => handleSelect()}>Добавить актив</button>
            <button onClick={() => closeModal()}>Сбросить</button>
        </div>
    );
};

export default AssetInput;
