import { Mission } from "./Mission";

export interface Agent{
    Id: String;
    Rank: String;
    Password: String;
    Name: String;
    Experience: Number;
    ProfilePhotoPath: String;
    AgencyId: String;
    MissionsAssigned?: Mission[]
}