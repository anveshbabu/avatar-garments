const routers = [
  {
    path: '/',
    auth: false,
    exact: true,
    redirect: '/auth',
  },
  {
    component: 'AuthLayout',
    path: '/auth',
    redirect: "/auth/login/",
    auth: false,
    exact: false,
    childrens: [
      {
        component: "Login",
        path: "/login/",
        auth: false,
        exact: true,
      },

    ]
  },


  {
    component: "MainLayout",
    path: "/dashboard",
    redirect: "/dashboard/",
    auth: false,
    exact: false,
    childrens: [
      {
        component: "Dashboard",
        path: "/",
        auth: false,
        exact: true
      },
      
    ]
  },

  {
    component: "MainLayout",
    path: "/supplier",
    redirect: "/supplier/",
    auth: false,
    exact: false,
    childrens: [
      {
        component: "Supplier",
        path: "/",
        auth: false,
        exact: true
      },
      {
        component: "Product",
        path: "/product/:supplierId",
        auth: false,
        exact: true
      }
    ]
  },

  {
    component: "MainLayout",
    path: "/allProduct",
    redirect: "/allProduct/",
    auth: false,
    exact: false,
    childrens: [
      
      {
        component: "Product",
        path: "/",
        auth: false,
        exact: true
      }
    ]
  },

  {
    component: "MainLayout",
    path: "/users",
    redirect: "/users/",
    auth: false,
    exact: false,
    childrens: [
      {
        component: "Users",
        path: "/",
        auth: false,
        exact: true
      },
      // {
      //   component: "Product",
      //   path: "/product",
      //   auth: false,
      //   exact: true
      // }
    ]
  },

  // {
  //   component: "MainLayout",
  //   path: "/product",
  //   redirect: "/product/",
  //   auth: false,
  //   exact: true,
  //   childrens: [
  //     {
  //       component: "Product",
  //       path: "/",
  //       auth: false,
  //       exact: true
  //     }
  //   ]
  // },




  
  {
    component: "MainLayout",
    path: "/devLayout",
    redirect: "/devLayout/components/",
    auth: false,
    exact: false,
    childrens: [
      {
        component: "Components",
        path: "/components",
        auth: false,
        exact: true,
      },
    ],
  },
];

export default routers