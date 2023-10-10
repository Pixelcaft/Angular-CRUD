import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {
data: any[] = [];

  constructor() {}

  generatieUniqueNumber() {
    const tellerValue = localStorage.getItem("teller");
    let teller = tellerValue ? parseInt(tellerValue, 10) : 0;
    teller++;
    localStorage.setItem("teller", teller.toString());
    return teller;
  }
  
  addFormData(UserData: any) {
    const existingData = this.getAllUserData();

    const uniqueId = this.generatieUniqueNumber();
    UserData.id = uniqueId;

    existingData.push(UserData);
    localStorage.setItem('UserData', JSON.stringify(existingData));
  }

  getAllUserData(): any[] {
    const dataString = localStorage.getItem('UserData');
    return dataString ? JSON.parse(dataString) : [];
  } 

  getUserDataById(userId: number): any {
    const userData = this.getAllUserData();
    return userData.find(user => user.id === userId);
  }

  removeUserById(userId: number) {
    const userData = this.getAllUserData();
    const updateData = userData.filter(user => user.id !== userId);
    localStorage.setItem('UserData', JSON.stringify(updateData));
  }

  updateUserDataById(userId: number, updatedUserData: any) {
    const userData = this.getAllUserData();
    const userIndex = userData.findIndex(user => user.id === userId);
  
    if (userIndex !== -1) {
      userData[userIndex] = { ...userData[userIndex], ...updatedUserData };
      localStorage.setItem('UserData', JSON.stringify(userData));
    }
  }
}
