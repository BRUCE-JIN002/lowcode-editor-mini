const MockMainTableUrl = "http://localhost:3000/table";
const MockModalTableUrl = "http://localhost:3000/data";

const mianTableData = [
  {
    id: 1,
    area: "北京",
    industry: "互联网",
    company: "字节跳动",
    salary: "10000",
    date: "2021-01-01"
  },
  {
    id: 2,
    area: "上海",
    industry: "金融",
    company: "蚂蚁金服",
    salary: "20000",
    date: "2021-02-01"
  },
  {
    id: 3,
    area: "深圳",
    industry: "教育",
    company: "新东方",
    salary: "15000",
    date: "2021-03-01"
  },
  {
    id: 4,
    area: "广州",
    industry: "医疗",
    company: "腾讯",
    salary: "18000",
    date: "2021-04-01"
  },
  {
    id: 5,
    area: "杭州",
    industry: "电商",
    company: "阿里巴巴",
    salary: "12000",
    date: "2021-05-01"
  }
];

const modalTableData = [
  {
    id: 1,
    name: "小明",
    sex: "男",
    birthday: "1997-07-07",
    career: "程序员"
  },
  {
    id: 2,
    name: "东东",
    sex: "男",
    birthday: "1996-06-06",
    career: "老师"
  },
  {
    id: 3,
    name: "小红",
    sex: "女",
    birthday: "1998-08-08",
    career: "律师"
  }
];

export const mockMap: Record<string, any[]> = {
  [MockMainTableUrl]: mianTableData,
  [MockModalTableUrl]: modalTableData
};
