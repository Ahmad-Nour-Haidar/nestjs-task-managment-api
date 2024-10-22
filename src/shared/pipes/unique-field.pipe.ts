import {
  ArgumentMetadata,
  ConflictException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { Repository } from 'typeorm';

@Injectable()
export class UniqueFieldPipe implements PipeTransform {
  constructor(
    private readonly repository: Repository<any>, // Inject repository dynamically
    private readonly field: string, // Field to check for uniqueness
    private readonly message?: string, // Optional custom error message
  ) {}

  async transform(value: any, metadata: ArgumentMetadata) {
    // Query the database to check if the value exists
    const entity = await this.repository.findOne({
      where: { [this.field]: value },
    });

    if (entity) {
      // Throw a ConflictException if the value is not unique
      throw new ConflictException(
        this.message || `${this.field} already exists.`,
      );
    }

    // Return the value if it's unique
    return value;
  }
}

/*
* @Module({
  imports: [TypeOrmModule.forFeature([])],  // Add your entities here
  providers: [UniqueFieldPipe],  // Add the pipe as a provider
  exports: [UniqueFieldPipe],  // Export it to make it available to other modules
})
export class AppModule {}
* */

/*
@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
  ) {}

  @Post()
  async create(@Body(new UniqueFieldPipe(User, 'email', 'Email already exists.')) createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }
}*/
