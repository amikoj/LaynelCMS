
  import { defHttp } from '/@/utils/http/axios';
  
  enum Api {
    software = '/software',
    softwarepage = '/software/page'
  }
  
  export const getSoftwarePage = (params: any) =>
    defHttp.post<any>({ url: Api.softwarepage, params });

  

  export const addSoftware= (model: any) => defHttp.put({ url: Api.software, data: model });
  
  export const updateSoftware = (model: any) => defHttp.post({ url: Api.software, data: model });
  
  export const delSoftware = (id: any) => defHttp.delete({ url: Api.software, data: { id } });
