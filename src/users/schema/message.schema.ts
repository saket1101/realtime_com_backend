import { Schema,Prop, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type MessageType = HydratedDocument<Message>

@Schema({timestamps:true})
export class Message{
    @Prop({type:String})
    messageId:string;

    @Prop({type:String})
    SenderId:string;

    @Prop({type:String})
    ReceiverId:string;

    @Prop({type:String})
    Message:string;

    @Prop({type:String})
    MessageType:string
}

export const messageSchema = SchemaFactory.createForClass(Message)