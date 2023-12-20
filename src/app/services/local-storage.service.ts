import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor() { }

  setItem(key: string, value: any) {
    window.localStorage.setItem(key, JSON.stringify(value));
  }

  getItem(key: string) {
    const value = window.localStorage.getItem(key);
    if (value && typeof value !== 'string') {
      return JSON.parse(value);
    } else if (value) {
      return value;
    }
    return null;
  }

}
