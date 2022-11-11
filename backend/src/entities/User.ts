import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';
import * as bcrypt from 'bcryptjs';

@Entity("User")
export class User extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column() firstname: string;
    @Column() lastname: string;
    @Column() email: string;
    @Column() username: string;
    @Column() profile_img: string;
    @Column() password: string;
    hashPassword() {
        this.password = bcrypt.hashSync(this.password, 10);
    }

    checkIfUnencryptedPasswordIsValid(unencryptedPassword: string) {
        return bcrypt.compareSync(unencryptedPassword, this.password);
    }
}

