// src/services/signalRService.js
import Config from "./../services/config";
import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";



const createSignalRConnection = () => {
    debugger;
    const chatUrl = Config.chatUrl;
    const connection = new HubConnectionBuilder()
        .withUrl(chatUrl) // URL to your SignalR hub
        .configureLogging(LogLevel.Information)
        .build();

    return connection;
};

export default createSignalRConnection;
