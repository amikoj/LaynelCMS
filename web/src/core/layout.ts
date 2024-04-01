import { LayoutTypes } from "../enums/layout";
import { Page } from "./base";

/**
 * 根布局
 */
export abstract class BaseLayout extends Page {
  layoutType: LayoutTypes;

  constructor() {
    super();
    this.layoutType = LayoutTypes.Vertical;
  }
}
