import {Injectable} from "@angular/core";
import {Subject} from "rxjs";


@Injectable()
export class MessageService{

    subject = new Subject();

    sendMsg(searchText: any){
      this.subject.next(searchText);
    }

    getMsg(){
      return this.subject.asObservable();
    }
}
