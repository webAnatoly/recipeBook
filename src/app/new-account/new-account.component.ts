import { Component, EventEmitter, Output } from '@angular/core';
import { LoggingService } from '../logging.service';

@Component({
  selector: 'app-new-account',
  templateUrl: './new-account.component.html',
  styleUrls: ['./new-account.component.scss'],
  providers: [LoggingService],
})
export class NewAccountComponent {
  @Output() accountAdded = new EventEmitter<{name: string, status: string}>();

  constructor(private loggingService: LoggingService) {}
  /*
  Не забываем что запись вида constructor(private anyProperty: any) {}
  Это короткий вариант записи
  constructor(private anyProperty: any) {
    this.anyProperty = anyProperty;
  }
  Но в случае с инжектированием сервисов, ангуляр, как я понял сразу создает инстанс инжектируемого класса и записывает
  его в свойство. То есть запись
    constructor(private loggingService: LoggingService) {}
  Видимо oзначает
    constructor(private loggingService: LoggingService) {
      this.loggingService = new LoggingService();
    }
    И теперь, после инжектирования, в классе нашего компонента будет доступен инстанс класса LoggingService в свойстве
    loggingService;

    ==========

  Написав в конструкторе constructor(private loggingService: LoggingService) {}
  Мы информируем ангуляр, что нам нужен в этом компоненте инстанс класса LoggingService, но на этом этапе ангуляр еще
  не знает каким образом дать нам этот инстанс.

  Следующий шаг это provide a service to angular. Т.е. мы сказали ангуляру, что нам нужен этот сервис и теперь нужно
  сказать как его создавать. Provide simply means we tell Angular how to create it
  and that sounds very complicated and it is very simple,
  all we have to do is add one extra property to the @Component decorator, the provider property here.

  Now with that, Angular when analyzing the component, recognizes that it should be able to give us such a loggingService
  and it will itself up to be able to do so and when it then actually builds the component, constructs it,
  it sees that we want to have such an instance and it will know how to give us such instance.

  */

  onCreateAccount(accountName: string, accountStatus: string): void {
    this.accountAdded.emit({
      name: accountName,
      status: accountStatus
    });
    // console.log('A server status changed, new status: ' + accountStatus);
    this.loggingService.logStatusChange(accountStatus);
  }
}
