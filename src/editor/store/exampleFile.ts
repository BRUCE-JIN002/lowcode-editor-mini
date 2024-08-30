export const example = [
  {
    id: 1,
    name: "Page",
    props: {},
    desc: "页面",
    children: [
      {
        id: 1725004592790,
        name: "Container",
        desc: "容器",
        props: {},
        parentId: 1,
        children: [
          {
            id: 1725004625257,
            name: "Container",
            desc: "容器",
            props: {},
            parentId: 1725004592790,
            children: [
              {
                id: 1725004655089,
                name: "Button",
                desc: "按钮",
                props: {
                  type: "primary",
                  text: "新建",
                  onClick: {
                    actions: [
                      {
                        type: "componentMethod",
                        config: {
                          componentId: 1725004973698,
                          method: "open"
                        }
                      }
                    ]
                  }
                },
                parentId: 1725004625257
              },
              {
                id: 1725004681632,
                name: "Button",
                desc: "按钮",
                props: {
                  type: "default",
                  text: "编辑",
                  onClick: {
                    actions: [
                      {
                        type: "showMessage",
                        config: {
                          type: "success",
                          text: "😂😂😂"
                        }
                      }
                    ]
                  }
                },
                parentId: 1725004625257
              }
            ],
            styles: {
              display: "flex",
              gap: "12px"
            }
          }
        ],
        styles: {
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "8px"
        }
      },
      {
        id: 1725004973698,
        name: "Modal",
        desc: "弹窗",
        props: {
          title: "弹窗"
        },
        parentId: 1,
        children: [
          {
            id: 1725005186603,
            name: "Table",
            desc: "表格",
            props: {
              url: "http://localhost:3000/data"
            },
            parentId: 1725004973698,
            children: [
              {
                id: 1725005195505,
                name: "TableColumn",
                desc: "表格列",
                props: {
                  dataIndex: "name",
                  title: "姓名"
                },
                parentId: 1725005186603
              },
              {
                id: 1725005197860,
                name: "TableColumn",
                desc: "表格列",
                props: {
                  dataIndex: "sex",
                  title: "性别",
                  type: "text"
                },
                parentId: 1725005186603
              },
              {
                id: 1725005199531,
                name: "TableColumn",
                desc: "表格列",
                props: {
                  dataIndex: "birthday",
                  title: "生日",
                  type: "date"
                },
                parentId: 1725005186603
              },
              {
                id: 1725005202762,
                name: "TableColumn",
                desc: "表格列",
                props: {
                  dataIndex: "career",
                  title: "职业",
                  type: "text"
                },
                parentId: 1725005186603
              }
            ]
          }
        ]
      },
      {
        id: 1724419650021,
        name: "Table",
        desc: "表格",
        props: {
          url: "http://localhost:3000/table",
          bordered: false
        },
        parentId: 1,
        children: [
          {
            id: 1724419651637,
            name: "TableColumn",
            desc: "表格列",
            props: {
              dataIndex: "area",
              title: "地区"
            },
            parentId: 1724419650021
          },
          {
            id: 1724419652633,
            name: "TableColumn",
            desc: "表格列",
            props: {
              dataIndex: "industry",
              title: "产业"
            },
            parentId: 1724419650021
          },
          {
            id: 1724419653830,
            name: "TableColumn",
            desc: "表格列",
            props: {
              dataIndex: "company",
              title: "公司"
            },
            parentId: 1724419650021
          },
          {
            id: 1724437886538,
            name: "TableColumn",
            desc: "表格列",
            props: {
              dataIndex: "salary",
              title: "薪资"
            },
            parentId: 1724419650021
          },
          {
            id: 1724510700147,
            name: "TableColumn",
            desc: "表格列",
            props: {
              dataIndex: "date",
              title: "日期",
              type: "text"
            },
            parentId: 1724419650021
          }
        ],
        styles: {}
      }
    ]
  }
];
