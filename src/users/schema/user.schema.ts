import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
export type UserType = HydratedDocument<UserTest>

@Schema()
export class UserTest {
    @Prop({type:String})
    id:String;

    @Prop({type:String})
    Name:String;

    @Prop({type:String})
    Email:String;

    @Prop({type:String})
    Password:String;
}


export const userSchema = SchemaFactory.createForClass(UserTest)
