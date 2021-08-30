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
    META_BRANCH:'metaBranch'
}

export const STATUS={
    ACTIVE: 'active',
    IN_ACTIVE: 'inactive',
    DELETED: 'deleted'
}

export const CONFIG ={
    API_URL: process.env.NODE_ENV === 'development' ?process.env.REACT_APP_DEV_URL:process.env.REACT_APP_PROD_URL,
    GRAPHQL_URL:process.env.REACT_APP_GRAPHQL_URL,
}



