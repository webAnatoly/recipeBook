/* Файл описывающий структуру данных.
Конкретно в этом файле описываем структуру данных для отдельно взятого рецепта.

Слово model в имени не имеет специального назначения
оно просто означает, что файл относиться к Модели в парадигме MVC.
*/
export class Recipe {
  name: string;
  description: string;
  imagePath: string;

  constructor(name: string, desc: string, imagePath: string) {
    this.name = name;
    this.description = desc;
    this.imagePath = imagePath;
  }
}


