import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  create(@Body() createUserDto: CreateTaskDto): Promise<Task> {
    return this.tasksService.create(createUserDto);
  }

  @Get()
  findAll(@Query() filterDto: GetTasksFilterDto): Promise<Task[]> {
    return this.tasksService.findAll(filterDto);
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string): Promise<Task> {
    return this.tasksService.findOne(id);
  }

  @Patch('/:id/status')
  updateTaskStatus(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateTaskStatusDto: UpdateTaskStatusDto,
  ): Promise<Task> {
    return this.tasksService.updateTaskStatus(id, updateTaskStatusDto.status);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.tasksService.remove(id);
  }
}
