
# Angular Ngrx Socket.IO Example Backend Service


### Models

#### Note
```
interface Note {
    id: string;
    username: string;
    body: string;
}
```

### Incoming event list (from client to server):
- `'join'`: 
        * payload: {room: string}
        
- `'[Notes] Add'`
        *  payload: `Note` object
        
- `'[Notes] List'`
        *  payload: `none`
        
        
- `'[Notes] Update'`

        *  payload: `Note` object
        
- `'[Notes] Delete'`

        *  payload: `Note` object

### Outgoing event list (from server to client):

- `'[Notes] Added'`
        *  payload: `Note` object
        *  scope: all clients in `notes` room
        
- `'[Notes] Listed'`
        *  payload: Map of `Note` objects with id as key
        *  scope: single client 
        
        
- `'[Notes] Updated'`

        *  payload: `Note` object
        *  scope: all clients in `notes` room
        
- `'[Notes] Deleted'`

        *  payload: `Note` object
        *  scope: all clients in `notes` room



        