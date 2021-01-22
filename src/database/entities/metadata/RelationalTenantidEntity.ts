import { Column } from 'typeorm';
import { error as libError } from '@seidor-cloud-produtos/lib-seidor-common';
import { RelationalWithoutTenantidEntity } from './RelationalWithoutTenantidEntity';

type Relation = { tenantid: string } & unknown;

type EntityRelation = {
    relation: Relation;
    name: string;
};

export class RelationalTenantidEntity extends RelationalWithoutTenantidEntity {
    @Column('uuid')
    tenantid: string;

    private isTenantEquals(relation?: Relation) {
        return relation?.tenantid === this.tenantid;
    }

    private static existsRelation(relation?: Relation): boolean {
        return relation !== undefined;
    }

    private static checkRelationsExists(relation: Relation, name: string): boolean {
        if (!this.existsRelation(relation)) {
            throw new libError.HttpError(
                400,
                `Doesnt exists a ${name} with this id`,
            );
        }

        return true;
    }

    private checkTenantConsistence(relation: Relation, name: string): boolean {
        if (!this.isTenantEquals(relation)) {
            throw new libError.HttpError(400, `Different tenantid between ${name}`);
        }

        return true;
    }

    protected checkRelationsConsistency(relation: EntityRelation): boolean {
        RelationalTenantidEntity.checkRelationsExists(
            relation.relation,
            relation.name,
        );

        this.checkTenantConsistence(relation.relation, relation.name);

        return true;
    }
}
