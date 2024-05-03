export interface ModalData {
  title: string;
  description: string;
  txtBtnAccept: string;
  txtBtnCancel?: string;
  showBtnCancel?: boolean;
  onAccept: () => void;
  onCancel?: () => void;
}
