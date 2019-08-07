export default function() {
  return [
    {
      title: "Dashboard",
      to: "/dashboard",
      htmlBefore: '<i class="mdi mdi-view-dashboard"></i>',
      htmlAfter: "",
    },
    {
      title: "POS",
      to: "/pos",
      htmlBefore: '<i class="mdi mdi-desktop-mac"></i>'
    },
    {
      title: "Product",
      htmlBefore: '<i class="mdi mdi-inbox"></i>',
      children: [
        {
          title: "Product",
          to: "/product"
        },
        // {
        //   title: "Service",
        //   to: "/service"
        // },
        {
          title: "Category",
          to: "/category"
        },
        // {
        //   title: "Product Packet",
        //   to: "/product-packet"
        // },
        // {
        //   title: "Shipping Fee",
        //   to: "/shipping-fee"
        // },
      ]
    },
    {
      title: "Stores",
      to: "/stores",
      htmlBefore: '<i class="mdi mdi-domain"></i>'
    },
    // {
    //   title: "Giftcard",
    //   to: "/giftcard",
    //   htmlBefore: '<i class="mdi mdi-credit-card"></i>'
    // },
    {
      title: "Sales",
      to: "/sales",
      htmlBefore: '<i class="mdi mdi-inbox-arrow-up"></i>'
    },
    {
      title: "Purchase",
      htmlBefore: '<i class="mdi mdi-inbox-arrow-down"></i>',
      children: [
        {
          title: "Purchase",
          to: "/purchase",
        },
        {
          title: "Expense",
          to: "/expense",
        },
      ]
    },
    {
      title: "Stock",
      htmlBefore: '<i class="mdi mdi-animation"></i>',
      to: "/stock-opname"
      // children: [
      //   // {
      //   //   title: "Stock Card",
      //   //   to: "/stock-card",
      //   // },
      //   // {
      //   //   title: "Stock Opname",
      //   //   to: "/stock-opname",
      //   // },
      //   // {
      //   //   title: "Return",
      //   //   to: "/return",
      //   // },
      //   // {
      //   //   title: "Broken Goods",
      //   //   to: "/broken-goods",
      //   // },
      // ]
    },
    {
      title: "Users",
      htmlBefore: '<i class="mdi mdi-account"></i>',
      children: [
        {
          title: "Employee",
          to: "/employee",
        },
        {
          title: "Customer",
          to: "/customer",
        },
        {
          title: "Supplier",
          to: "/supplier",
        },
      ]
    },
    {
      title: "Report",
      htmlBefore: '<i class="mdi mdi-content-paste"></i>',
      children: [
        {
          title: "Sales Report",
          to: "/report-sales",
        },
        {
          title: "Purchase Report",
          to: "/report-purchase",
        },
        {
          title: "Expense Report",
          to: "/report-expense",
        },
        {
          title: "Stock Report",
          to: "/report-stock",
        },
      ]
    },
    {
      title: "Settings",
      htmlBefore: '<i class="mdi mdi-settings"></i>',
      children: [
        {
          title: "Settings",
          to: "/settings",
        },
        // {
        //   title: "Discount",
        //   to: "/discount",
        // },
        // {
        //   title: "Menu",
        //   to: "/menu",
        // },
        {
          title: "Role",
          to: "/role",
        },
        {
          title: "Permission",
          to: "/permission",
        },
      ]
    }
  ];
}
