import { defHttp } from '/@/utils/http/axios';

enum Api {
  software = '/software',
  softwarepage = '/software/page',
  topicPage = '/topic/page',
  topic = '/topic',
  subscriptonPage = '/topic/subscription/page',
  articlePage = '/article/page',
  article = '/article',
  cate = '/article/category',
  catePage = '/article/category/page',
  cateList = 'article/category/list',
}
// 软件管理
export const getSoftwarePage = (params: any) =>
  defHttp.post<any>({ url: Api.softwarepage, params });

export const addSoftware = (model: any) => defHttp.put({ url: Api.software, data: model });

export const updateSoftware = (model: any) => defHttp.post({ url: Api.software, data: model });

export const delSoftware = (id: any) => defHttp.delete({ url: Api.software, data: { id } });

// 专题管理
export const getTopicPage = (params: any) => defHttp.post<any>({ url: Api.topicPage, params });

export const addTopic = (model: any) => defHttp.put({ url: Api.topic, data: model });

export const updateTopic = (model: any) => defHttp.post({ url: Api.topic, data: model });

export const delTopic = (id: any) => defHttp.delete({ url: Api.topic, data: { id } });

export const getSubscriptionPage = (params: any) =>
  defHttp.post<any>({ url: Api.subscriptonPage, params });

// 文章管理
export const getAllCateList = () => defHttp.get<any>({ url: Api.cateList });

export const getArticleList = (params: any) => defHttp.post<any>({ url: Api.articlePage, params });

export const getCateList = (params?: any) => defHttp.post<any>({ url: Api.catePage, params });

export const addArticle = (model: any) => defHttp.put({ url: Api.article, data: model });

export const updateArticle = (model: any) => defHttp.post({ url: Api.article, data: model });

export const delArticle = (id: any) => defHttp.delete({ url: Api.article, data: { id } });

export const getArticle = (id: any) => defHttp.get({ url: Api.article, params: { id } });

export const addCate = (model: any) => defHttp.put({ url: Api.cate, data: model });

export const updateCate = (model: any) => defHttp.post({ url: Api.cate, data: model });

export const delCate = (id: any) => defHttp.delete({ url: Api.cate, data: { id } });
