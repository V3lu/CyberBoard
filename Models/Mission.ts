import { Agent } from "./Agent";

export interface Mission{
    Id: number;
    Name: String;
    AgentsAssigned?: Agent[];
}