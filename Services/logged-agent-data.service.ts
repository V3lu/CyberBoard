import { Injectable } from '@angular/core';
import { Agent } from '../Models/Agent';

@Injectable({
  providedIn: 'root'
})
export class LoggedAgentDataService {

  constructor() { }

  loggedAgent!: Agent

  /**
   * Sets the logged agent object -> typeof(Agent)
   */
  setLoggedAgent(agent: Agent) {
    this.loggedAgent = agent;
  }

  /**
   * Gets the logged agent object -> typeof(Agent)
   */
  getLoggedAgent() {
    return this.loggedAgent;
  }
}
