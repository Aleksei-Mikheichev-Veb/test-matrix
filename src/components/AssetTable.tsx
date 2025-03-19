import React, { useEffect, useState } from "react";
import styles from "../styles/table.module.scss";
import useWebSocket from "../services/useWebSocket";
import AssetInput from "./AssetInput";
import {Asset} from "./../types/asset";

type AssetTableProps = {

}
const AssetTable: React.FC<AssetTableProps> = () => {
    const { data } = useWebSocket("wss://stream.binance.com:9443/stream?streams=btcusdt@ticker/ethusdt@ticker/bnbusdt@ticker/neousdt@ticker/ltcusdt@ticker/adausdt@ticker/xrpusdt@ticker/eosusdt@ticker/usdcusdt@ticker/linkusdt@ticker/atomusdt@ticker/algousdt@ticker");
    const [assets, setAssets] = useState<Asset[]>([]);
    const [ currentAsset, setCurrentAsset] = useState<Asset>()
    useEffect(() => {
        if (data) {
            const assetName = data.s.replace("USDT", "");
            const updatedAsset = {
                name: assetName,
                price: parseFloat(data.c),
                change: parseFloat(data.P),
            };

            setAssets((prevAssets) => {
                const index = prevAssets.findIndex((asset) => asset.name === assetName);
                if (index !== -1) {
                    prevAssets[index] = updatedAsset;
                    return [...prevAssets];
                } else {
                    return [...prevAssets, updatedAsset];
                }
            });
        }
    }, [data]);

    return (
        <>
            <div className={styles.box_table}>
                <table className={styles.table}>
                    <thead>
                    <tr>
                        <th>Название</th>
                        <th>Цена</th>
                        <th>Изм. за 24ч</th>
                    </tr>
                    </thead>
                    <tbody>
                    {assets.map((asset) => (
                        <tr key={asset.name} onClick={() => setCurrentAsset(asset)} className={styles.row}>
                            <td>{asset.name}</td>
                            <td>${asset.price.toFixed(2)}</td>
                            <td className={asset.change >= 0 ? styles.positive : styles.negative}>
                                {asset.change.toFixed(2)}%
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            {currentAsset && <AssetInput asset={currentAsset}/>}
        </>

    );
};

export default AssetTable;
