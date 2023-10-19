import { Injectable } from '@angular/core';
import { User } from '../classes/user.class';
import { LocalstorageService } from './localstorage.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private users!: User[];

  constructor(private localStorageService: LocalstorageService) {
    this.users = this.getUsers();
  }

  public getUsers(): User[] {
    const users: User[] = [];
    const userData = this.localStorageService.getAllUserData();

    if (userData) {
      userData.forEach((userItem: any) => {
        users.push(new User(userItem));
      });
    }
    return users;
  }

  public updateUser(user: User): void {
    const index = this.users.findIndex((userItem: User) => {
      return userItem.id === user.id;
    });
    if (index > -1) {
      this.users[index] = user;
      this.localStorageService.updateUserDataById(user.id!, user);
    }
  }

  public deleteUser(userId: string): void {
    this.users = this.users.filter((userItem: User) => userItem.id != userId);
    this.localStorageService.removeUserById(userId);
  }

  public addUser(user: User): void {
    this.users.push(user);
    this.localStorageService.addUser(user);
  }

  public getUserById(userId: string): User | null {
    const filtered = this.users.filter(
      (userItem: User) => userItem.id === userId
    );
    if (filtered.length > 0) {
      return filtered[0];
    }
    return null;
  }
}
