import { Injectable } from '@nestjs/common';

@Injectable()
export class TasksService {
  //
  // findAll(): Task[] {
  //   return this.tasks;
  // }
  //
  // findAllWithFilter(filterDto: GetTasksFilterDto): Task[] {
  //   const { status, search } = filterDto;
  //   return this.tasks.filter((task) => {
  //     if (status && task.status !== status) {
  //       return false;
  //     }
  //     return (
  //       search &&
  //       (task.title.toLowerCase().includes(search.toLowerCase()) ||
  //         task.description.toLowerCase().includes(search.toLowerCase()))
  //     );
  //   });
  // }
  //
  // findOne(id: string): Task {
  //   const found = this.tasks.find((task) => task.id === id);
  //   if (!found) {
  //     throw new NotFoundException(`Task with ID "${id}" not found`);
  //   }
  //   return found;
  // }
  //
  // create(createTaskDto: CreateTaskDto): Task {
  //   const task: Task = {
  //     id: uuidv4(),
  //     title: createTaskDto.title,
  //     description: createTaskDto.description,
  //     status: TaskStatus.OPEN,
  //   };
  //   this.tasks.push(task);
  //   return task;
  // }
  //
  // updateTaskStatus(id: string, status: TaskStatus): Task {
  //   const task = this.findOne(id);
  //   task.status = status;
  //   return task;
  // }
  //
  // remove(id: string): void {
  //   const found = this.findOne(id);
  //   this.tasks = this.tasks.filter((task) => task.id !== found.id);
  // }
}
