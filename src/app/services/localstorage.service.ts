import { Injectable } from '@angular/core';
import { User } from '../classes/user.class';

@Injectable({
  providedIn: 'root',
})
export class LocalstorageService {
  private data: any[] = [];

  constructor() {
    this.data = this.getAllUserData();
  }

  public addUser(user: User): void {
    const existingData = this.getAllUserData();

    existingData.push(user);
    localStorage.setItem('UserData', JSON.stringify(existingData));
  }

  public getAllUserData(): any[] {
    const dataString = localStorage.getItem('UserData');
    return dataString ? JSON.parse(dataString) : [];
  }

  public getUserDataById(userId: any): any {
    return this.data.find((user) => user.id == userId);
  }

  public removeUserById(userId: string): void {
    this.data = this.data.filter((user) => user.id !== userId);
    localStorage.setItem('UserData', JSON.stringify(this.data));
  }

  public updateUserDataById(userId: string, updatedUserData: any): void {
    const userIndex = this.data.findIndex((user) => user.id === userId);

    if (userIndex > -1) {
      this.data[userIndex] = updatedUserData;
      localStorage.setItem('UserData', JSON.stringify(this.data));
    }
  }
}
