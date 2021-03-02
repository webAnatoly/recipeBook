import { Component } from '@angular/core';
import { LoggingService } from '../logging.service';
import { AccountsService } from '../accounts.service';

@Component({
  selector: 'app-new-account',
  templateUrl: './new-account.component.html',
  styleUrls: ['./new-account.component.scss'],
  // providers: [LoggingService],
})
export class NewAccountComponent {

  constructor(private loggingService: LoggingService, private accountsService: AccountsService) {
    this.accountsService.statusUpdated.subscribe(
      (status: string) => alert(`New Status ${status}`)
    );
    /* подписываюсь на событие, которое срабатывает в компоненте account.component
    вообще не важно где оно срабатывает, оно может срабатывать в нескольких компонентах
    Цель этого примера показать, что можно обмениваться данными между соседними компонентами через общий сервис,
    с помощью EventEmitter.
     */

  }
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
    this.accountsService.addAccount(accountName, accountStatus);
    // this.loggingService.logStatusChange(accountStatus);
  }
}

/*

В этом примере мы создали сервис accounts и здесь используем этот сервис для добавления новых аккаунтов в массив.
Всё работает, но не так как надо. Загвоздка в том, что новые аккаунта добавляются в массив this.accountsService.accounts
но этот массив ндоступен из вне потому что ангуляровский инжектор использует hierarchical injector
и при инжектировании в компонент сервиса он создает отдельный инстанс этого сервия для данного компонента и всех сложенных
компонентов.

В нашем же здесь случае мы в каждый компонет и в <new-account> и в <account> заинжектировали один и тот же сервис, но
ангуляр для каждого компонента создал свой инстанс со своим объектом this.accountsService.accounts и поэтому при обновлении
объекта из одного компонента, он остается нетронутым в другом.

Чтобы был один инстанс сервиса для всех компонентов, нужно его инжектировать на уровень выше. Если нужно чтобы инстанс
сервиса был доступен по всему приложению, то сервис нужно провайдить на самом верхнем уровне в иерархии компонетов(модулей)

Самый верхний уровень это AppModule

--

Вот еще на английском пояснение из курса
The Angular dependency injector actually is a hierarchical injector, that means that if we provide a service in some place of our app,
let's say on one component, the Angular framework knows how to create an instance of that service for this component and important,
all its child components and actually this component and all its child components and the child of the child components will receive
the same instance of the service.

 */
