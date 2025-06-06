// signalRConnection.js
import * as signalR from "@microsoft/signalr";
import Config from "./../services/config";
let connection = null;

export function getSignalRConnection() {
    if (!connection) {
        const chatUrl = Config.chatUrl;
        connection = new signalR.HubConnectionBuilder()
            .withUrl(chatUrl)
            .withAutomaticReconnect()
            .build();
    }
    return connection;
}