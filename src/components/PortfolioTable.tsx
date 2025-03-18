import React, {useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";
import {removeAsset, updateAsset} from "../store/portfolioSlice";
import PortfolioRow from "./PortfolioRow";
import styles from "../styles/table.module.scss";
import useWebSocket from "../services/useWebSocket";

const WEBSOCKET_URL = "wss://stream.binance.com:9443/stream?streams=btcusdt@ticker/ethusdt@ticker/bnbusdt@ticker/neousdt@ticker/ltcusdt@ticker/adausdt@ticker/xrpusdt@ticker/eosusdt@ticker/usdcusdt@ticker/linkusdt@ticker/atomusdt@ticker/algousdt@ticker"; // Укажи свои активы


const PortfolioTable: React.FC = () => {
    const assets = useSelector((state: RootState) => state.portfolio.assets);
    const dispatch = useDispatch();
    useWebSocket("wss://stream.binance.com:9443/stream?streams=btcusdt@ticker/ethusdt@ticker/bnbusdt@ticker/neousdt@ticker/ltcusdt@ticker/adausdt@ticker/xrpusdt@ticker/eosusdt@ticker/usdcusdt@ticker/linkusdt@ticker/atomusdt@ticker/algousdt@ticker");
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
    );
};

export default PortfolioTable;
