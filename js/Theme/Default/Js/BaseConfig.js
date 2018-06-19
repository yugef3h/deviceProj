require.config({
  paths: {
    "jquery": "/Theme/Default/js/jquery.min",
    "bootstrap": "/Theme/Plugins/enonadmin/assets/js/bootstrap.min",
    "jbox": "/Theme/Plugins/jbox-v2.3/jBox/jquery.jBox.src",
    "mmGrid": "/Theme/Plugins/mmGrid/src/mmGrid",
    "moment": "/Theme/Default/js/moment",
    "wysihtml5": "/Theme/Plugins/enonadmin/assets/js/wysihtml5/lib/js/wysihtml5-0.3.0.min",
    "btwysihtml5": "/Theme/Plugins/enonadmin/assets/js/wysihtml5/src/bootstrap-wysihtml5",
    "PerfectScrollbar": "/Theme/Plugins/perfect-scrollbar/dist/perfect-scrollbar",

    "WdatePicker": "/Theme/Plugins/My97DatePicker/WdatePicker",
    "md5": "/Theme/Default/js/md5.min",

    "fancybox": "/Theme/Plugins/fancybox/source/jquery.fancybox",
    "jUploader": "/Theme/Plugins/jquery.jUploader-1.01.min",

    "SeatManager": "/Theme/Default/js/Seat/SeatManager",
    "SeatManagerServer": "/Theme/Default/js/Seat/SeatManagerServer",

    "StatisManager": "/Theme/Default/js/Statis/StatisManager",
    "StatisManagerServer": "/Theme/Default/js/Statis/StatisManagerServer",
    "SaleBuffet": "/Theme/Default/js/Statis/SaleBuffet",
    "SaleBuffetStatistic": "/Theme/Default/js/Statis/SaleBuffetStatistic",
    "UserStatistic": "/Theme/Default/js/Statis/UserStatistic",
    "SaleBuffetServer": "/Theme/Default/js/Statis/SaleBuffetServer",

    "MallCommon": "/Theme/Default/js/MallCommon",
    "CommonUI": "/Theme/Default/js/CommonUI",
    "UploadDialog": "/Theme/Default/js/UploadDialog",
    "Region": "/Theme/Default/js/Region",

    "UserServer": "/Theme/Default/js/User/UserServer",
    "RegionServer": "/Theme/Default/js/User/RegionServer",
    "ProductServer": "/Theme/Default/js/Product/ProductServer",
    "BrandServer": "/Theme/Default/js/Product/BrandServer",
    "CategoryServer": "/Theme/Default/js/Product/CategoryServer",
    "DicServer": "/Theme/Default/js/Sale/DicServer",
    "UnitServer": "/Theme/Default/js/Product/UnitServer",
    "NoticeServer": "/Theme/Default/js/Sys/NoticeServer",
    "SinceAddressServer": "/Theme/Default/js/User/SinceAddressServer",
    "DeliverServer": "/Theme/Default/js/Sale/DeliverServer",
    "OrderServer": "/Theme/Default/js/Sale/OrderServer",
    "DisServer": "/Theme/Default/js/Sale/DisServer",

    "ZKConnectionManager": "/Theme/Default/js/ZKConnection/ZKConnectionManager",
    "ZKConnectionServer": "/Theme/Default/js/ZKConnection/ZKConnectionServer",
    "ZkController": "/Theme/Default/js/ZKConnection/ZkController",
    "ZkControllerServer": "/Theme/Default/js/ZKConnection/ZkControllerServer",
    "ZkDoor": "/Theme/Default/js/ZKConnection/ZkDoor",
    "ZkCashTable": "/Theme/Default/js/ZKConnection/ZkCashTable",

    "ChefAndWaiter": "/Theme/Default/js/User/ChefAndWaiter",
    "ChefAndWaiterServer": "/Theme/Default/js/User/ChefAndWaiterServer",
    "UserManagerServer": "/Theme/Default/js/User/UserManagerServer",
    "UserManager": "/Theme/Default/js/User/UserManager",
    "EmployeeServer": "/Theme/Default/js/User/EmployeeServer",
    "Employee": "/Theme/Default/js/User/Employee",
    "AccountServer": "/Theme/Default/js/User/AccountServer",
    "Account": "/Theme/Default/js/User/Account",
    "Login": "/Theme/Default/js/User/Login",


    "SinceAddress": "/Theme/Default/js/User/SinceAddress",
    "Brand": "/Theme/Default/js/Product/Brand",
    "Unit": "/Theme/Default/js/Product/Unit",
    "DailyMenuTimeEdit": "/Theme/Default/js/Product/DailyMenuTimeEdit",
    "DailyMenuTimeServer": "/Theme/Default/js/Product/DailyMenuTimeServer",
    "Category": "/Theme/Default/js/Product/Category",
    "Property": "/Theme/Default/js/Product/Property",
    "PropertyServer": "/Theme/Default/js/Product/PropertyServer",
    "Product": "/Theme/Default/js/Product/Product",
    "ProductEdit": "/Theme/Default/js/Product/ProductEdit",
    "Notice": "/Theme/Default/js/Sys/Notice",
    "NoticeEdit": "/Theme/Default/js/Sys/NoticeEdit",
    "ProductDialog": "/Theme/Default/js/Product/ProductDialog",
    "SkuDialog": "/Theme/Default/js/Product/SkuDialog",
    "ChefDisManager": "/Theme/Default/js/Product/ChefDisManager",
    "ChefDisServer": "/Theme/Default/js/Product/ChefDisServer",
    "ChefDisFoodManager": "/Theme/Default/js/Product/ChefDisFoodManager",
    "ChefDisAddFood": "/Theme/Default/js/Product/ChefDisAddFood",

    "Order": "/Theme/Default/js/Sale/Order",
    "OrderEdit": "/Theme/Default/js/Sale/OrderEdit",
    "OrderDetail": "/Theme/Default/js/Sale/OrderDetail",
    "Deliver": "/Theme/Default/js/Sale/Deliver",
    "Dis": "/Theme/Default/js/Sale/Dis",
    "TakeOrder": "/Theme/Default/js/Sale/TakeOrder",


    "TakeTime": "/Theme/Default/js/Sys/TakeTime",
    "TakeTimeServer": "/Theme/Default/js/Sys/TakeTimeServer",
    "WhiteList": "/Theme/Default/js/Sys/WhiteList",
    "WhiteListServer": "/Theme/Default/js/Sys/WhiteListServer",
    "Role": "/Theme/Default/js/Sys/Role",
    "RoleEdit": "/Theme/Default/js/Sys/RoleEdit",
    "RoleServer": "/Theme/Default/js/Sys/RoleServer",

    "SysUser": "/Theme/Default/js/Sys/SysUser",
    "SysUserServer": "/Theme/Default/js/Sys/SysUserServer",

    "Finance": "/Theme/Default/js/Sys/Finance",
    "FinanceServer": "/Theme/Default/js/Sys/FinanceServer",

    "Dic": "/Theme/Default/js/Sale/Dic",
    "DicServer": "/Theme/Default/js/Sale/DicServer",

    "PlateCate": "/Theme/Default/js/Plate/PlateCate",
    "PlateCateServer": "/Theme/Default/js/Plate/PlateCateServer",

    "DailyMenuServer": "/Theme/Default/js/Menu/DailyMenuServer",
    "DailyMenu": "/Theme/Default/js/Menu/DailyMenu",
    "Breakfast": "/Theme/Default/js/Menu/Breakfast",
    "Lunch": "/Theme/Default/js/Menu/Lunch",
    "Dinner": "/Theme/Default/js/Menu/Dinner",
    "Supper": "/Theme/Default/js/Menu/Supper",

  },
  shim:{
    "jbox":{
      deps:["jquery"],
    },
    "mmGrid":{
      deps:["jquery"],
    },
    "bootstrap":{
      deps:["jquery"],
    },
    "wysihtml5":{
      deps:["jquery"],
    },
    "btwysihtml5":{
      deps:["jquery","bootstrap","wysihtml5"],
    },
    "fancybox":{
      deps:["jquery"],
    },
    "UploadDialog":{
      deps:["jquery"],
    },
    "datepicker": {
      deps: ["jquery", "bootstrap", "btwysihtml5"],
    },
    "datetimepicker": {
      deps: ["jquery", "bootstrap", "btwysihtml5"],
    },

  }
});