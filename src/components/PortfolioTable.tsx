import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";
import { removeAsset, updateAsset } from "../store/portfolioSlice";
import PortfolioRow from "./PortfolioRow";
import styles from "../styles/table.module.scss";

const WEBSOCKET_URL = "wss://stream.binance.com:9443/stream?streams=btcusdt@ticker";

const PortfolioTable: React.FC = () => {
    const assets = useSelector((state: RootState) => state.portfolio.assets);
    const dispatch = useDispatch();

    useEffect(() => {
        const socket = new WebSocket(WEBSOCKET_URL);
        socket.onmessage = (event) => {
            const parsedData = JSON.parse(event.data);
            const assetName = parsedData.data.s.replace("USDT", "");
            dispatch(updateAsset({
                name: assetName,
                price: parseFloat(parsedData.data.c),
                change: parseFloat(parsedData.data.P),
            }));
        };
        return () => socket.close();
    }, []);
    const totalPortfolioValue = assets.reduce((sum, asset) => sum + asset.price * asset.quantity, 0);
    return (
        <div className={styles.tableContainer}>
            <table className={styles.table}>
                <thead>
                <tr>
                    <th>Название</th>
                    <th>Количество</th>
                    <th>Цена</th>
                    <th>Общая стоимость</th>
                    <th>Изм. за 24ч</th>
                    <th>% портфеля</th>
                </tr>
                </thead>
                <tbody>
                {assets.map((asset) => (
                    <PortfolioRow
                    key={asset.id}
                    asset={asset}
                    totalPortfolioValue={totalPortfolioValue}
                    onRemove={() => dispatch(removeAsset(asset.id))}
                />
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default PortfolioTable;
