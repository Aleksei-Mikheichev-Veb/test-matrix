import {AssetPortfolio} from "./assetPortfolio";

export type Asset = Omit<AssetPortfolio, ('quantity' | 'id')>