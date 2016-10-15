import { Injectable } from '@angular/core';
import { Mold } from '../components/mold/mold'
import { MOLDS } from './test-data/mock-mold';

@Injectable()
export class MoldService {
  getMolds(): Promise<Mold[]> {
    return Promise.resolve(MOLDS);
  }
}
