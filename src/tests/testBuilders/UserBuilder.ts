import { UserInterface } from '../../interfaces/user';

export default class UserBuilder {
    user: UserInterface;

    constructor() {
        this.user = {} as UserInterface;
    }

    
    public withTenantId(tenantid: string): UserBuilder {
        this.user.tenantid = tenantid;
        return this;
    }
    

    public withId(id: string): UserBuilder {
        this.user.id = id;
        return this;
    }

    
    public withNameId(name_id: string): UserBuilder {
        this.user.name_id = name_id;
        return this;
    }
    
    public withDescription(description: string): UserBuilder {
        this.user.description = description;
        return this;
    }
    
    public withOi(oi: string): UserBuilder {
        this.user.oi = oi;
        return this;
    }
    

    
    public withCode(code: number): UserBuilder {
        this.user.code = code;
        return this;
    }
    
    public withTest(test: number): UserBuilder {
        this.user.test = test;
        return this;
    }
    
    public withMenor(menor: number): UserBuilder {
        this.user.menor = menor;
        return this;
    }
    

    public withActive(active: boolean): UserBuilder {
        this.user.active = active;
        return this;
    }

    public withInactivationDate(inactivationDate: Date | null): UserBuilder {
        this.user.inactivation_date = <any>inactivationDate;
        return this;
    }

    public withCreatedAt(created_at: Date): UserBuilder {
        this.user.created_at = created_at;
        return this;
    }

    public withUpdatedAt(updated_at: Date): UserBuilder {
        this.user.updated_at = updated_at;
        return this;
    }

    public withCreatedByName(createdByName: string): UserBuilder {
        this.user.created_by_name = createdByName;
        return this;
    }

    public withCreatedByEmail(createdByEmail: string): UserBuilder {
        this.user.created_by_email = createdByEmail;
        return this;
    }

    public withUpdatedByName(updatedByName: string): UserBuilder {
        this.user.updated_by_name = updatedByName;
        return this;
    }

    public withUpdatedByEmail(updatedByEmail: string): UserBuilder {
        this.user.updated_by_email = updatedByEmail;
        return this;
    }

    public build(): UserInterface {
        return this.user;
    }
}
