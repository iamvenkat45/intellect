import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private dbPath = '/users';
  private usersList: any = [];
  usersRef: AngularFireList<any>;
  users: Observable<any[]>;
  constructor(private readonly db: AngularFireDatabase) {
    this.usersRef = db.list(this.dbPath);
    this.users = this.usersRef.snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    );
    this.users.subscribe((data) => {
      for (const key in data[0]) {
        if (typeof data[0][key] === 'object') {
          this.usersList.push(data[0][key]);
        }
      }
    });
  }
  getAll(): AngularFireList<any> {
    return this.usersRef;
  }
  add(user: any): any {
    return this.usersRef.set(`/sheets/${this.usersList.length}`, user);
  }
  update(key: string, value: any): Promise<void> {
    return this.usersRef.update(key, value);
  }
  delete(key: string): Promise<void> {
    return this.usersRef.remove(key);
  }
  deleteAll(): Promise<void> {
    return this.usersRef.remove();
  }
  replaceAll(users: any) {
    return this.usersRef.set('sheets', users);
  }
}
