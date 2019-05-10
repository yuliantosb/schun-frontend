export default function() {
  return [
    {
      title: "Dashboard",
      to: "/blog-overview",
      htmlBefore: '<i class="mdi mdi-view-dashboard"></i>',
      htmlAfter: ""
    },
    {
      title: "Resume Material",
      to: "/resume-material",
      htmlBefore: '<i class="mdi mdi-square-edit-outline"></i>'
    },
    {
      title: "Delivery",
      to: "/delivery",
      htmlBefore: '<i class="mdi mdi-truck-delivery"></i>'
    },
    {
      title: "Stock In",
      to: "/stockin",
      htmlBefore: '<i class="mdi mdi-inbox-arrow-down"></i>'
    },
    {
      title: "Stock Out",
      to: "/stockout",
      htmlBefore: '<i class="mdi mdi-inbox-arrow-up"></i>'
    },
    {
      title: "User",
      to: "/user",
      htmlBefore: '<i class="mdi mdi-account"></i>'
    }
  ];
}
