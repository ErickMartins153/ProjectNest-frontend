
interface Page {
  size: number,
  number: number,
  totalElements: number,
  totalPages: number
}


export default class PagedModel<T> {

  content: T[];
  page: Page;

  constructor(content: T[], page: Page) {
    this.content = content;
    this.page = page;
  }

  static fromJson<T>(json: {content: T[], page: Page}): PagedModel<T> {
    return new PagedModel<T>(json.content, json.page);
  }

  static emptyPage<T>() {
    return PagedModel.fromJson<T>({
      content: [],
      page: {
        size: 0,
        number: 0,
        totalPages: 0,
        totalElements: 0
      }
    });
  }

  isLast(): boolean {
    return this.page.number === this.page.totalPages-1;
  }

  isFirst(): boolean {
    return this.page.number === 0;
  }

}
