import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'
import { RelationalWithoutTenantidEntity } from './metadata/RelationalWithoutTenantidEntity'

@Entity('legacy-system')
export default class LegacySystem extends RelationalWithoutTenantidEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    description: string
}