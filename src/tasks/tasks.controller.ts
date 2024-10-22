import { Controller, Get, Param } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task.entity';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  //
  // @Post()
  // create(@Body() createUserDto: CreateTaskDto) {
  //   return this.tasksService.create(createUserDto);
  // }
  //
  // @Get()
  // findAll(@Query() filterDto: GetTasksFilterDto): Task[] {
  //   if (Object.keys(filterDto).length > 0) {
  //     return this.tasksService.findAllWithFilter(filterDto);
  //   } else {
  //     return this.tasksService.findAll();
  //   }
  // }
  //
  @Get(':id')
  findOne(@Param('id') id: string): Promise<Task> {
    return this.tasksService.findOne(id);
  }

  //
  // @Patch('/:id/status')
  // updateTaskStatus(
  //   @Param('id') id: string,
  //   @Body() updateTaskStatusDto: UpdateTaskStatusDto,
  // ): Task {
  //   return this.tasksService.updateTaskStatus(id, updateTaskStatusDto.status);
  // }
  //
  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.tasksService.remove(id);
  // }
}
