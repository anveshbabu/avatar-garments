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
        exact: true,
        childrens: [
          {
            component: "Dashboard",
            path: "/",
            auth: false,
            exact: true
          }
        ]
      },
]
