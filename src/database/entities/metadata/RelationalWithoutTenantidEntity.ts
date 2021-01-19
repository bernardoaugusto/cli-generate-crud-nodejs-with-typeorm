import { Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export class RelationalWithoutTenantidEntity {
    @Column({ default: true })
    active: boolean;

    @Column({ nullable: true })
    inactivation_date: Date;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @Column()
    created_by_name: string;

    @Column()
    created_by_email: string;

    @Column()
    updated_by_name: string;

    @Column()
    updated_by_email: string;
}
