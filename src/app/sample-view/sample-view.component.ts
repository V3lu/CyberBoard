import { Component } from '@angular/core';
import { Mission } from '../../../Models/Mission';

@Component({
    selector: 'app-sample-view',
    templateUrl: './sample-view.component.html',
    styleUrl: './sample-view.component.css',
})
export class SampleViewComponent {
    missions!: Mission[];

    constructor(){
        this.missions = [
            {Id: 1, Name: "Mission 1"},
            {Id: 2, Name: "Mission 2"},
            {Id: 3, Name: "Mission 3"},
            {Id: 4, Name: "Mission 4"},
            {Id: 5, Name: "Mission 5"},
            {Id: 6, Name: "Mission 6"},
            {Id: 7, Name: "Mission 7"},
            {Id: 8, Name: "Mission 8"},
            {Id: 9, Name: "Mission 9"},
            {Id: 10, Name: "Mission 10"},
        ]
        
    }
}
