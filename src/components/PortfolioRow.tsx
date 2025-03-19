import React from "react";
import styles from "../styles/table.module.scss";
import {AssetPortfolio} from "../types/assetPortfolio";

interface Props {
    asset: AssetPortfolio;
    totalPortfolioValue: number;
    onRemove: () => void;
}

const PortfolioRow: React.FC<Props> = ({ asset, totalPortfolioValue, onRemove }) => {
    const assetValue = asset.price * asset.quantity;
    const portfolioPercent = totalPortfolioValue ? (assetValue / totalPortfolioValue) * 100 : 0;

    return (
        <tr onClick={onRemove} className={styles.row}>
            <td>{asset.name}</td>
            <td>{asset.quantity}</td>
            <td>${asset.price.toFixed(2)}</td>
            <td>${assetValue.toFixed(2)}</td>
            <td className={asset.change >= 0 ? styles.positive : styles.negative}>
                {asset.change.toFixed(2)}%
            </td>
            <td>{portfolioPercent.toFixed(2)}%</td>
        </tr>
    );
};

export default PortfolioRow;
