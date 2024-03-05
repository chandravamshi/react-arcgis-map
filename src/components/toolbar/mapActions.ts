

export interface ModalProps {
  isOpen: boolean;
  data: [
    {
      AUFTRAGGEBER?: string;
      AUFTRAGNEHMER?: string;
      BEMERKUNG?: string;
      NAME?: string;
    }
  ];
  closeModal: () => void;
}