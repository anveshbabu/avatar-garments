export const LOGIN_TYPE ={
    ADMIN:'admin'
}
export const USER_TYPE ={
    ADMIN:'Admin',
    USER:'User'
}

export const EXIST_LOCAL_STORAGE ={
    AUTHTOKEN:'AuthToken',
    USER_ID:'userId',
    IS_KEEP_ME:'isKeepMe',
    KEEP_ME_OBJ:'keepMeObj',
    META_BRANCH:'metaBranch',
    CURRENT_USER:'currentUserObj'
}

export const STATUS={
    ACTIVE: 'active',
    IN_ACTIVE: 'inactive',
    DELETED: 'deleted'
}
export const METER={
    SMALL: 2,
    MEDIUM: 4,
    LARGE: 6
}

export const PRODUCT_STATUS ={
    IN_PROGRESS:'In Progress',
    COMPLETED:'Completed'
}

export const CONFIG ={
    API_URL: process.env.NODE_ENV === 'development' ?process.env.REACT_APP_DEV_URL:process.env.REACT_APP_PROD_URL,
    GRAPHQL_URL:process.env.REACT_APP_GRAPHQL_URL,
};

export const CURRENT_USER='currentUserObj';

export const SUPPLIER_ROUT_NAME='supplierRoutName'




