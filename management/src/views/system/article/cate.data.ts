import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import dayjs from 'dayjs';

export const columns: BasicColumn[] = [
  {
    title: '分类名',
    dataIndex: 'name',
    width: 120,
  },
  {
    title: '父级分类',
    dataIndex: 'pid',
    width: 120,
    format(text, row) {
      if (!text) return '无';
      else return row?.parent?.name;
    },
  },
  {
    title: '描述',
    dataIndex: 'desc',
    width: 140,
  },
  {
    title: '最后更新',
    dataIndex: 'createdAt',
    width: 180,
    format(text) {
      return dayjs(text).format('YYYY-MM-DD HH:mm');
    },
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    label: '分类名',
    field: 'name',
    component: 'Input',
    colProps: { span: 8 },
  },
];

export const accountFormSchema: FormSchema[] = [
  {
    field: 'name',
    label: '分类名',
    component: 'Input',
    required: true,
  },
  {
    label: '父类',
    field: 'pid',
    component: 'TreeSelect',
    componentProps: {
      replaceFields: {
        title: 'name',
        key: 'id',
        value: 'id',
      },
      getPopupContainer: () => document.body,
    },
    required: false,
  },
  {
    field: 'desc',
    label: '描述',
    component: 'InputTextArea',
  },
];
