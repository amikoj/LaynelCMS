import type { App } from 'vue';
import { Button } from './Button';
import {
  // Need
  Button as AntButton,
  Input,
  Layout,
  Form,
  Row,
  Col,
  Select,
  TreeSelect,
  Divider,
} from 'ant-design-vue';

const compList = [AntButton.Group];

export function registerGlobComp(app: App) {
  compList.forEach((comp) => {
    app.component(comp.name || comp.displayName, comp);
  });

  app
    .use(Input)
    .use(Button)
    .use(Layout)
    .use(Form)
    .use(Row)
    .use(Col)
    .use(Select)
    .use(TreeSelect)
    .use(Divider);
}
