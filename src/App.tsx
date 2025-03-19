import React from "react";
import { useSelector} from "react-redux";
import AddAssetButton from "./components/AddAssetButton";
import PortfolioTable from "./components/PortfolioTable";
import AssetModal from "./components/AssetModal";
import {RootState} from "./store/store";
import styles from './styles/main.module.scss'


const App = () => {
    const modalIsOpen = useSelector((state: RootState) => state.portfolio.modalIsOpen);
    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1>Мой Портфель</h1>
                <AddAssetButton />
            </header>
            {modalIsOpen && <AssetModal/>}
            <PortfolioTable />
        </div>
    );
};

export default App;
