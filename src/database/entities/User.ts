import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { RelationalWithoutTenantidEntity } from './metadata/RelationalWithoutTenantidEntity';

@Entity('user')
export default class User extends RelationalWithoutTenantidEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    bernardo_augusto: string;

    @Column()
    alice_betania: string;

    @Column()
    teste: number;
}
