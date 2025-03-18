import React from "react";
import styles from "../styles/modal.module.scss";
import AssetTable from "./AssetTable";
import {useDispatch} from "react-redux";
import {closeModal} from "../store/portfolioSlice";

interface AssetsModalProps {

}

const AssetModal: React.FC<AssetsModalProps> = () => {
    const dispatch = useDispatch()
    return (
        <div className={styles.overlay} onClick={() => dispatch(closeModal())}>
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                <AssetTable/>
            </div>
        </div>
    );
};

export default AssetModal;
