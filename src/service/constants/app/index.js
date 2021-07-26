/**
*
* Disclaimer: Source code mentioned below is(are) Intellectual Property of
* Crayon Data Holdings Limited (including its subsidiaries and affiliates).
* Crayon Data Holdings Limited reserves right to own and control it the way
* it may deem fit. You must refrain from use, access, read, modify, add or
* delete, sell or use in any other package or programme pertaining to such
* source code without explicit prior written approval of
* Crayon Data Holding Limited. Breach of the same shall attract penalty as
* applicable.
*
*/
export const LOGIN_TYPE ={
    ADMIN:'admin'
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



