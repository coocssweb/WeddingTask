import { Injectable } from '@angular/core';
import { Photo } from '../components/photos/photo'
import { PHOTOS } from './test-data/mock-photo';

@Injectable()
export class PhotoService {
  getPhotos(): Promise<Photo[]> {
    return Promise.resolve(PHOTOS);
  }
}
