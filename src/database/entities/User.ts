import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { RelationalTenantidEntity } from './metadata/RelationalTenantidEntity';

@Entity('user')
export default class User extends RelationalTenantidEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    code: number;
}