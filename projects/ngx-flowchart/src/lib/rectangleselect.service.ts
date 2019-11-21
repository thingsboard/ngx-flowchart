import { FcModelService } from './model.service';
import { FcRectBox } from './ngx-flowchart.models';
import scrollparent from './scrollparent';

interface Rectangle {
  x1: number;
  x2: number;
  y1: number;
  y2: number;
}

export class FcRectangleSelectService {

  private readonly selectRect: Rectangle = {
    x1: 0,
    x2: 0,
    y1: 0,
    y2: 0
  };

  private readonly modelService: FcModelService;
  private readonly selectElement: HTMLElement;
  private readonly $canvasElement: JQuery<HTMLElement>;
  private readonly $scrollParent: JQuery<HTMLElement>;
  private readonly applyFunction: <T>(fn: (...args: any[]) => T) => T;

  constructor(modelService: FcModelService,
              selectElement: HTMLElement,
              applyFunction: <T>(fn: (...args: any[]) => T) => T) {
    this.modelService = modelService;
    this.selectElement = selectElement;
    this.$canvasElement = $(this.modelService.canvasHtmlElement);
    this.$scrollParent = $(scrollparent(this.modelService.canvasHtmlElement));
    this.applyFunction = applyFunction;
  }

  public mousedown(e: MouseEvent) {
    if (this.modelService.isEditable() && !e.ctrlKey && !e.metaKey && e.button === 0
      && this.selectElement.hidden) {
      this.selectElement.hidden = false;
      const offset = this.$canvasElement.offset();
      this.selectRect.x1 = Math.round(e.pageX - offset.left);
      this.selectRect.y1 = Math.round(e.pageY - offset.top);
      this.selectRect.x2 = this.selectRect.x1;
      this.selectRect.y2 = this.selectRect.y1;
      this.updateSelectRect();
    }
  }

  public mousemove(e: MouseEvent) {
    if (this.modelService.isEditable() && !e.ctrlKey && !e.metaKey && e.button === 0
      && !this.selectElement.hidden) {
      const offset = this.$canvasElement.offset();
      this.selectRect.x2 = Math.round(e.pageX - offset.left);
      this.selectRect.y2 = Math.round(e.pageY - offset.top);
      this.updateScroll(offset);
      this.updateSelectRect();
    }
  }

  private updateScroll(offset: JQuery.Coordinates) {
    const rect = this.$scrollParent[0].getBoundingClientRect();
    const bottom = rect.bottom - offset.top;
    const right = rect.right - offset.left;
    const top = rect.top - offset.top;
    const left = rect.left - offset.left;
    if (this.selectRect.y2 - top < 25) {
      const topScroll = 25 - (this.selectRect.y2 - top);
      const scroll = this.$scrollParent.scrollTop();
      this.$scrollParent.scrollTop(scroll - topScroll);
    } else if (bottom - this.selectRect.y2 < 40) {
      const bottomScroll = 40 - (bottom - this.selectRect.y2);
      const scroll = this.$scrollParent.scrollTop();
      this.$scrollParent.scrollTop(scroll + bottomScroll);
    }
    if (this.selectRect.x2 - left < 25) {
      const leftScroll = 25 - (this.selectRect.x2 - left);
      const scroll = this.$scrollParent.scrollLeft();
      this.$scrollParent.scrollLeft(scroll - leftScroll);
    } else if (right - this.selectRect.x2 < 40) {
      const rightScroll = 40 - (right - this.selectRect.x2);
      const scroll = this.$scrollParent.scrollLeft();
      this.$scrollParent.scrollLeft(scroll + rightScroll);
    }
  }

  public mouseup(e: MouseEvent) {
    if (this.modelService.isEditable() && !e.ctrlKey && !e.metaKey && e.button === 0
      && !this.selectElement.hidden) {
      const rectBox = this.selectElement.getBoundingClientRect() as FcRectBox;
      this.selectElement.hidden = true;
      this.selectObjects(rectBox);
    }
  }

  private updateSelectRect() {
    const x3 = Math.min(this.selectRect.x1, this.selectRect.x2);
    const x4 = Math.max(this.selectRect.x1, this.selectRect.x2);
    const y3 = Math.min(this.selectRect.y1, this.selectRect.y2);
    const y4 = Math.max(this.selectRect.y1, this.selectRect.y2);
    this.selectElement.style.left = x3 + 'px';
    this.selectElement.style.top = y3 + 'px';
    this.selectElement.style.width = x4 - x3 + 'px';
    this.selectElement.style.height = y4 - y3 + 'px';
  }

  private selectObjects(rectBox: FcRectBox) {
    this.applyFunction(() => {
      this.modelService.selectAllInRect(rectBox);
    });
  }

}

