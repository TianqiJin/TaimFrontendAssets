import Reflux from 'reflux';

const NewProductActions = Reflux.createActions([
    'updateStoreProduct',
    'updateSku',
    'updateDisplayName',
    'updateTexture',
    'updateColor',
    'updateTotalNumber',
    'updateTotalVirtualNumber',
    'updateUnitPrice',
    'updateLength',
    'updateWidth',
    'updateHeight',
    'updatePiecesPerBox',
    'saveNewProduct'
]);

export default NewProductActions;