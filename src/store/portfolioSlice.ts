import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {AssetPortfolio} from "../types/assetPortfolio";


interface PortfolioState {
    assets: AssetPortfolio[];
    modalIsOpen: Boolean;
}

const initialState: PortfolioState = {
    assets: [],
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
            }
        },
        updateAsset: (state, action: PayloadAction<{ name: string; price: number; change: number }>) => {
            const asset = state.assets.find((a) => a.name === action.payload.name);
            if (asset) {
                asset.price = action.payload.price;
                asset.change = action.payload.change;
            }
        },
        removeAsset: (state, action: PayloadAction<string>) => {
            state.assets = state.assets.filter((asset) => asset.id !== action.payload);
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
