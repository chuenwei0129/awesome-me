class Lookout {
  private observers: Student[] = [];

  // 订阅一个学生
  subscribe(student: Student) {
    this.observers.push(student);
  }

  // 退订一个学生
  unsubscribe(student: Student) {
    this.observers = this.observers.filter((obs) => obs !== student);
  }

  // 通知所有订阅的学生
  notify(message: string) {
    this.observers.forEach((observer) => {
      observer.update(message);
    });
  }
}

class Student {
  private name: string;

  constructor(name: string) {
    this.name = name;
  }

  // 更新消息
  update(message: string) {
    console.log(`${this.name} 收到信息: ${message}`);
  }
}

// 创建一个“放风”同学
const lookoutStudent = new Lookout();

// 创建三个学生
const studentA = new Student('小明');
const studentB = new Student('小红');
const studentC = new Student('小刚');

// 小明和小红订阅“放风”同学的通知
lookoutStudent.subscribe(studentA);
lookoutStudent.subscribe(studentB);

// “放风”同学通知大家老师来了
lookoutStudent.notify('老师来了');

// 小刚也订阅了通知
lookoutStudent.subscribe(studentC);

// “放风”同学再次通知大家老师来了
lookoutStudent.notify('老师来了');

// 小明取消订阅
lookoutStudent.unsubscribe(studentA);

// “放风”同学再次通知大家老师来了
lookoutStudent.notify('老师来了');
