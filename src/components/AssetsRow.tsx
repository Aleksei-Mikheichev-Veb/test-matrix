import styles from "../styles/table.module.scss";
import {Asset} from "../types/asset";

interface AssetRowProps {
    asset: Asset;
    onSelect: (name: string) => void;
}

const AssetRow: React.FC<AssetRowProps> = ({ asset, onSelect }) => {
    return (
        <div className={styles.row} onClick={() => onSelect(asset.name)}>
            <span>{asset.name}</span>
            <span>{asset.price.toFixed(2)}</span>
            <span>{asset.change.toFixed(2)}%</span>
        </div>
    );
};

export default AssetRow;
