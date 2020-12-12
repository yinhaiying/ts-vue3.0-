export interface ColumnProps {
  id: number;
  title: string;
  avatar?: string;
  description: string;
}
export interface PostProps {
  id: number;
  title: string;
  content: string;
  image?: string;
  createdAt: string;
  columnId: number;
}
export const testData: ColumnProps[] = [
  {
    id: 1,
    avatar: "https://pic4.zhimg.com/v2-675b5f63b8fda663cc12cc95aec4f5b6_xs.jpg",
    title: "海鹰的专栏",
    description: "这是海鹰的专栏，主要是一些前端相关的工作",
  },
  {
    id: 2,
    avatar: "https://pic1.zhimg.com/v2-a8faa37c113eff2c80e01c91dff5890b_xs.jpg",
    title: "海鹰的专栏",
    description: "这是海鹰的专栏，主要是一些前端相关的工作",
  },
  {
    id: 3,
    avatar: "https://pic1.zhimg.com/v2-a8faa37c113eff2c80e01c91dff5890b_xs.jpg",
    title: "海鹰的专栏",
    description: "这是海鹰的专栏，主要是一些前端相关的工作",
  },
  {
    id: 4,
    avatar: "https://pic1.zhimg.com/v2-a8faa37c113eff2c80e01c91dff5890b_xs.jpg",
    title: "海鹰的专栏",
    description: "这是海鹰的专栏，主要是一些前端相关的工作",
  },
];

export const testPosts: PostProps[] = [
  {
    id: 1,
    title: '谁来为用工荒负责',
    content: '"虽然时间已来到8月份，但在主流中文搜索引擎输入“用工荒”这三个字之后，隔着屏幕，还是能从搜索结果当中，窥见整个2020年制造业之艰难。且不说2月-4月疫情发生后不久，媒体上出现的诸如《直击深圳复工：制造业遭遇用工荒，有企业近两亿订单停摆》、《疫情下的佛山用工市场：“用工难”总体缓解，仍有6万人缺口》、《用工荒变无工可务！前四月广东纸业损失约150亿，停机成唯一出路》的报道"',
    image: 'https://pic1.zhimg.com/v2-6444c2b42160c51da6d8cd657d3ed322_xs.jpg',
    createdAt: '2020-06-11 10:34:22',
    columnId: 1
  },
  {
    id: 2,
    title: '这是我的第二篇文章',
    content: '虽然时间已来到8月份，但在主流中文搜索引擎输入“用工荒”这三个字之后，隔着屏幕，还是能从搜索结果当中，窥见整个2020年制造业之艰难。且不说2月-4月疫情发生后不久，媒体上出现的诸如《直击深圳复工：制造业遭遇用工荒，有企业近两亿订单停摆》、《疫情下的佛山用工市场：“用工难”总体缓解，仍有6万人缺口》、《用工荒变无工可务！前四月广东纸业损失约150亿，停机成唯一出路》的报道',
    createdAt: '2020-06-11 10:34:22',
    columnId: 1
  },
  {
    id: 3,
    title: '这是我的第三篇文章',
    content: '虽然时间已来到8月份，但在主流中文搜索引擎输入“用工荒”这三个字之后，隔着屏幕，还是能从搜索结果当中，窥见整个2020年制造业之艰难。且不说2月-4月疫情发生后不久，媒体上出现的诸如《直击深圳复工：制造业遭遇用工荒，有企业近两亿订单停摆》、《疫情下的佛山用工市场：“用工难”总体缓解，仍有6万人缺口》、《用工荒变无工可务！前四月广东纸业损失约150亿，停机成唯一出路》的报道。',
    image: 'https://pic1.zhimg.com/v2-6444c2b42160c51da6d8cd657d3ed322_xs.jpg',
    createdAt: '2020-06-11 10:34:22',
    columnId: 1
  }
]
