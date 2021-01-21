import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { RelationalWithoutTenantidEntity } from './metadata/RelationalWithoutTenantidEntity';

@Entity('user')
export default class User extends RelationalWithoutTenantidEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    moviment_id: string;

    @Column()
    description: string;

    @Column()
    oi: string;

    @Column()
    code: number;

    @Column()
    test: number;

    @Column()
    menor: number;

}
