import { useContext } from 'react';
import { RootStoreModel } from '../stores';
import { StoreContext } from '../contexts/storeContext';

const useStores = (): RootStoreModel => useContext(StoreContext);

export default useStores;
