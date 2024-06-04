import { getAllAccountList } from '/@/api/demo/system';
import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import dayjs from 'dayjs';

export const columns: BasicColumn[] = [
  {
    title: '文章名',
    dataIndex: 'title',
    width: 120,
  },
  {
    title: '作者',
    dataIndex: 'author',
    width: 120,
  },
  {
    title: '文章分类',
    dataIndex: 'categories',
    width: 140,
  },
  {
    title: '标签',
    dataIndex: 'tags',
    width: 80,
  },
  {
    title: '最后更新时间',
    dataIndex: 'createdAt',
    width: 180,
    format(text) {
      return dayjs(text).format('YYYY-MM-DD HH:mm');
    },
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'title',
    label: '文件名',
    component: 'Input',
    colProps: { span: 8 },
  },
];

export const formSchema: FormSchema[] = [
  {
    field: 'title',
    label: '',
    component: 'Input',
    required: true,
    colProps: { lg: 16, md: 16 },
    componentProps: {
      placeholder: '填写标题',
    },
    labelWidth: '30px',
  },
  {
    field: 'user',
    label: ' ',
    component: 'ApiSelect',
    required: true,
    colProps: { lg: 8, md: 8 },
    componentProps: {
      placeholder: '请选择作者',
      api: getAllAccountList,
      labelField: 'nick',
      valueField: 'id',
      labelInValue: true,
    },
  },
  {
    field: 'content',
    label: ' ',
    slot: 'content ',
    required: true,
    colProps: { lg: 16, md: 16 },
    component: 'Input',
  },
];
