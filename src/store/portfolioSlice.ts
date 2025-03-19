import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {AssetPortfolio} from "../types/assetPortfolio";
import {Asset} from "../types/asset";


interface PortfolioState {
    assets: AssetPortfolio[];
    modalIsOpen: Boolean;
}


const loadAssetsFromLocalStorage = (): AssetPortfolio[] => {
    try {
        const savedAssets = localStorage.getItem("portfolio_assets");
        return savedAssets ? JSON.parse(savedAssets) : [];
    } catch (error) {
        console.error("Ошибка загрузки из localStorage:", error);
        return [];
    }
};

const initialState: PortfolioState = {
    assets: loadAssetsFromLocalStorage(),
    modalIsOpen: false
};

const portfolioSlice = createSlice({
    name: "portfolio",
    initialState,
    reducers: {
        addAsset: (state, action: PayloadAction<AssetPortfolio>) => {
            const existing = state.assets.find((a) => a.name === action.payload.name);
            if (!existing) {
                state.assets.push(action.payload);
                localStorage.setItem("portfolio_assets", JSON.stringify(state.assets));
            }
        },
        updateAsset: (state, action: PayloadAction<Asset>) => {
            const asset = state.assets.find((a) => a.name === action.payload.name);
            if (asset) {
                asset.price = action.payload.price;
                asset.change = action.payload.change;
                localStorage.setItem("portfolio_assets", JSON.stringify(state.assets));
            }
        },
        removeAsset: (state, action: PayloadAction<string>) => {
            state.assets = state.assets.filter((asset) => asset.id !== action.payload);
            localStorage.setItem("portfolio_assets", JSON.stringify(state.assets));
        },
        openModal: (state) => {
            state.modalIsOpen = state.modalIsOpen = true;
        },
        closeModal: (state) => {
            state.modalIsOpen = state.modalIsOpen = false;
        }
    }
});

export const { addAsset, updateAsset, removeAsset, openModal, closeModal } = portfolioSlice.actions;
export default portfolioSlice.reducer;
