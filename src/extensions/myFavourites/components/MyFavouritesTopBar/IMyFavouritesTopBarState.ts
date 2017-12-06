import { IMyFavouriteItem } from "../../../interfaces/IMyFavouriteItem";

export interface IMyFavouritesTopBarState {
    loading: boolean;
    showPanel: boolean;
    showDialog: boolean;
    dialogTitle: string;
    myFavouriteItems: IMyFavouriteItem[];
    itemInContext: IMyFavouriteItem;
    isEdit: boolean;
    status: JSX.Element;
    disableSave: boolean;
    disableCancel: boolean;
}