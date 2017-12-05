import * as React from "react";

import { IMyFavoutiteDisplayItemProps } from "./IMyFavoutiteDisplayItemProps";
import { IMyFavoutiteDisplayItemState } from "./IMyFavoutiteDisplayItemState";
import { DefaultButton, PrimaryButton, IButtonProps } from "office-ui-fabric-react/lib/Button";
import { Link } from 'office-ui-fabric-react/lib/Link';
import { Spinner, SpinnerSize } from "office-ui-fabric-react/lib/Spinner";
import { TeachingBubble } from 'office-ui-fabric-react/lib/TeachingBubble';
import { DirectionalHint } from 'office-ui-fabric-react/lib/common/DirectionalHint';
import styles from "../MyFavourites.module.scss";

export default class MyFavoutiteDisplayItem extends React.Component<IMyFavoutiteDisplayItemProps, IMyFavoutiteDisplayItemState> {
    private _menuButtonElement: HTMLElement;
    constructor(props: IMyFavoutiteDisplayItemProps) {
        super(props);
        this.state = {
            status: <span></span>,
            disableButtons: false,
            isDeleteBubbleVisible: false
        };
    }

    public render(): React.ReactElement<IMyFavoutiteDisplayItemProps> {
        let firstLetter: string = this.props.displayItem.Title.charAt(0).toUpperCase();
        let { isDeleteBubbleVisible } = this.state;
        let deleteButtonProps: IButtonProps = {
            children: 'Yes',
            onClick: this._deleteFavourite.bind(this)
          };
          let deleteCancelButtonProps: IButtonProps = {
            children: 'No',
            onClick: this._onBubbleDismiss.bind(this)
          };
        return (
                <div className={`${styles.ccitemContent}`}>
                    <Link href={this.props.displayItem.ItemUrl} className={styles.ccRow}>
                        <div className={`ms-font-su ${styles.ccInitials}`}>
                            {firstLetter}
                        </div>
                        <div className={styles.ccitemName}>
                            <span className={`ms-font-l`}>{this.props.displayItem.Title}</span>
                        </div>
                        <div className={styles.ccitemDesc}>{this.props.displayItem.Description}</div>
                    </Link>
                    <div className={styles.ccitemDesc}>
                        <PrimaryButton
                            data-automation-id='btnEdit'
                            iconProps={{ iconName: 'Edit' }}
                            text='Edit'
                            disabled={this.state.disableButtons}
                            onClick={this._editFavourite.bind(this)}
                            className={styles.ccButton}
                        />
                        <span ref={ (menuButton) => this._menuButtonElement = menuButton! }>
                            <PrimaryButton
                                data-automation-id='btnDel'
                                iconProps={{ iconName: 'ErrorBadge' }}
                                text='Delete'
                                disabled={this.state.disableButtons}
                                onClick={this._onBubbleDismiss.bind(this)}
                                className={styles.ccButton}
                            />
                        </span>
                        { isDeleteBubbleVisible ? (
                         <div>
                            <TeachingBubble
                                targetElement={ this._menuButtonElement }
                                calloutProps={ { directionalHint: DirectionalHint.rightCenter } }
                                hasCondensedHeadline={ true }
                                primaryButtonProps={ deleteButtonProps }
                                secondaryButtonProps={ deleteCancelButtonProps }
                                onDismiss={ this._onBubbleDismiss.bind(this) }
                                hasCloseIcon={ true }
                                headline='Confirm'
                                >
                                Are you sure to delete this item?
                            </TeachingBubble>
                        </div>
                        ) : (null) }
                        <div className={styles.ccStatus}>
                            {this.state.status}
                        </div>
                    </div>
                </div>
        );
    }

    private _onBubbleDismiss(ev: any) {
        this.setState({
            isDeleteBubbleVisible: !this.state.isDeleteBubbleVisible
        });
      }

    private async _deleteFavourite(): Promise<void> {

        let status: JSX.Element = <Spinner size={SpinnerSize.small} />;
        let disableButtons: boolean = true;
        let isDeleteBubbleVisible: boolean = false;
        this.setState({ ...this.state, status, disableButtons, isDeleteBubbleVisible });
        await this.props.deleteFavourite(this.props.displayItem.Id);
        status = <span></span>;
        disableButtons = false;
        this.setState({ ...this.state, status, disableButtons });
    }

    private _editFavourite(): void {
        let status: JSX.Element = <Spinner size={SpinnerSize.small} />;
        let disableButtons: boolean = true;
        this.setState({ ...this.state, status, disableButtons });

        this.props.editFavoutite(this.props.displayItem);

        status = <span></span>;
        disableButtons = false;
        this.setState({ ...this.state, status, disableButtons });
    }
}