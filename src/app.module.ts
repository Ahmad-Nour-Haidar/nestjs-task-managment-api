import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

// const STAGE = process.env.STAGE || 'dev';
//
// const path = !STAGE ? '.env' : `.env.${STAGE}`;
//
// console.log(path);

// @Module({
//   imports: [
//     ConfigModule.forRoot({
//       envFilePath: path,
//       ignoreEnvFile: true,
//       isGlobal: true,
//     }),
//     TypeOrmModule.forRootAsync({
//       imports: [ConfigModule],
//       inject: [ConfigService],
//       useFactory: async (configService: ConfigService) => {
//         // Create a logger instance
//         const logger = new Logger('TypeOrmModule');
//
//         logger.debug(`STAGE: ${process.env.STAGE}`); // Be careful with passwords!
//
//         // Log environment variables (be cautious with sensitive info)
//         logger.log(`Database Host: ${configService.get('DB_HOST')}`);
//         logger.log(`Database Port: ${configService.get('DB_PORT')}`);
//         logger.log(`Database Username: ${configService.get('DB_USERNAME')}`);
//         logger.log(`Database Name: ${configService.get('DB_DATABASE')}`);
//         logger.debug(`Database Password: ${configService.get('DB_PASSWORD')}`); // Be careful with passwords!
//
//         return {
//           type: 'postgres',
//           host: configService.get<string>('DB_HOST'),
//           port: configService.get<number>('DB_PORT'),
//           username: configService.get<string>('DB_USERNAME'),
//           password: configService.get<string>('DB_PASSWORD'),
//           database: configService.get<string>('DB_DATABASE'),
//           autoLoadEntities: true,
//           synchronize: true,
//         };
//       },
//     }),
//     TasksModule,
//     AuthModule,
//   ],
// })
// path: ,
//
// const logger = new Logger('AppModule');
// logger.debug(`Current Working Directory: ${process.cwd()}`);
// const envFilePath = path.resolve(
//   process.cwd(),
//   !process.env.STAGE ? '.env' : `.env.stage.${process.env.STAGE}`,
// );
// logger.debug(`envFilePath: ${envFilePath}`);

@Module({
  imports: [
    ConfigModule.forRoot({
      // envFilePath: `.env.stage.dev`,
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        // Create a logger instance
        // const logger = new Logger('TypeOrmModule');

        // logger.debug(`STAGE: ${process.env.STAGE}`);

        // Log environment variables (be cautious with sensitive info)
        // logger.log(`Database Host: ${configService.get('DB_HOST')}`);
        // logger.log(`Database Port: ${configService.get('DB_PORT')}`);
        // logger.log(`Database Username: ${configService.get('DB_USERNAME')}`);
        // logger.log(`Database Name: ${configService.get('DB_DATABASE')}`);
        // logger.debug(`Database Password: ${configService.get('DB_PASSWORD')}`); // Be careful with passwords!

        return {
          type: 'postgres',
          host: configService.get<string>('DB_HOST'),
          port: configService.get<number>('DB_PORT'),
          username: configService.get<string>('DB_USERNAME'),
          password: configService.get<string>('DB_PASSWORD'),
          database: configService.get<string>('DB_DATABASE'),
          autoLoadEntities: true,
          synchronize: true,
        };
      },
    }),
    TasksModule,
    AuthModule,
  ],
})
export class AppModule {}
