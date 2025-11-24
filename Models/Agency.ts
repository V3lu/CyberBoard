import { Agent } from "./Agent";

export interface Agency{
    Id: String;
    Name: string;
    StartingDate: Date;
    AgentsComprised?: Agent[]
}