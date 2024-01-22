import { useState, useEffect } from "react";
import Select from 'react-select'
import CreateEventModal from "../Modal/CreateEventModal";
import CreateTaskModal from "../Modal/CreateTaskModal";
import CreateJournalModal from "../Modal/CreateJournalModal";

export default function CreateButton(){
    //https://www.npmjs.com/package/react-dropdown
    const dropdownOptions = [
        { value: 'Event', label: 'Event' },
        { value: 'Journal', label: 'Journal' },
        { value: 'Task', label: 'Task' }
    ];
    const [dropdownValue, setDropdownValue ] = useState(null); //static value
    const [showCreateEvent, setShowCreateEvent] = useState(false);
    const [showCreateJournal, setShowCreateJournal] = useState(false);
    const [showCreateTask, setShowCreateTask] = useState(false);

    const onDropdownChange = (event) => {
        switch (event.value){
            case "Event":
                setShowCreateEvent(true);
                break;
            case "Task":
                setShowCreateTask(true);
                break;
            default:
                setShowCreateJournal(true);
                break;
        }
        setDropdownValue(null);
    }
    
    return (
        <div>
            <Select options={dropdownOptions} value={dropdownValue} onChange={onDropdownChange} placeholder="Create Item" />
            <CreateEventModal showCreateEvent={showCreateEvent} setShowCreateEvent={setShowCreateEvent}/>
            <CreateTaskModal showCreateTask={showCreateTask} setShowCreateTask={setShowCreateTask}/>
            <CreateJournalModal showCreateJournal={showCreateJournal} setShowCreateJournal={setShowCreateJournal}/>
        </div>
    );
};