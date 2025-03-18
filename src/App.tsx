import React from "react";
import { useSelector} from "react-redux";
import AddAssetButton from "./components/AddAssetButton";
import PortfolioTable from "./components/PortfolioTable";
import AssetModal from "./components/AssetModal";
import {RootState} from "./store/store";


const App: React.FC = () => {
    const modalIsOpen = useSelector((state: RootState) => state.portfolio.modalIsOpen);

    console.log(modalIsOpen)
    return (
        <>
            <h1>Мой Портфель</h1>
            <AddAssetButton />
            {modalIsOpen && <AssetModal/>}
            <PortfolioTable />
        </>
    );
};

export default App;
