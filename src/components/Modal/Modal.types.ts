import {UserProps} from '../../services/APIService.types';

export type ModalProps = {
  user?: UserProps;
  setUserData: React.Dispatch<React.SetStateAction<UserProps | undefined>>;
};
