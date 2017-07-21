import { ImageService } from "app/image.service";

export const imgPerPage = 1;
export class MockImageService extends ImageService {
  public id = 0;
  protected async search(text, per_page, page) {
    const imgs = [];
    for (let i = 0; i < imgPerPage; i++)
      imgs.push({
        title: `${++this.id}`,
        url: `http://${this.id}`
      });

    return imgs;
  }
}