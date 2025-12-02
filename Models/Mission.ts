import { Agent } from "./Agent";

export interface Mission{
    Id: number;
    Name?: String;
    Priority?: Number;
    CreationDate?: Date;
    Description?: String;
    Tags?: String[];
    Comments?: String[];
    Attachments?: String[];
    AgentsAssigned?: Agent[];
}


