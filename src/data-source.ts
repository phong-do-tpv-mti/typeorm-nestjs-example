import { DataSource, DataSourceOptions } from 'typeorm';

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'modelshare',
  password: 'EHnRtM387FlHdwTY_local',
  database: 'nest-pg-01',
  entities: ['src/entities/*.ts'],
  migrations: ['src/migrations/*.ts'],
  synchronize: false,
};

export const AppDataSource = new DataSource(dataSourceOptions);
