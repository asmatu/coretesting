import { Action, Reducer } from 'redux';
import { AppThunkAction } from 'ClientApp/store';
import { fetch } from 'domain-task/fetch';
import { addTask } from 'domain-task/main';


// -----------------
// STATE - This defines the type of data maintained in the Redux store.

export interface DevSkillState {
    isLoading: boolean;
    devSkills: DevSkill[];
}

export interface DevSkill {
    name: string;
    devSkillLevel: number;
}

// -----------------
// ACTIONS - These are serializable (hence replayable) descriptions of state transitions.
// They do not themselves have any side-effects; they just describe something that is going to happen.
// Use @typeName and isActionType for type detection that works even after serialization/deserialization.

interface RequestDevSkillsAction { 
    type: 'REQUEST_MOTIVATIONS'
}

interface ReceiveDevSkillsAction {
    type: 'RECEIVE_MOTIVATIONS';
    devSkills: DevSkill[];
}

// Declare a 'discriminated union' type. This guarantees that all references to 'type' properties contain one of the
// declared type strings (and not any other arbitrary string).

type KnownAction = RequestDevSkillsAction | ReceiveDevSkillsAction;

// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).

export const actionCreators = {
    requestDevSkills: (): AppThunkAction<KnownAction> => (dispatch, getState) => {
        let fetchTask = fetch('api/DevSkill/GetDevSkills')
        .then((response: Response) => response.json())
        .then(data => {
            dispatch({type: 'RECEIVE_MOTIVATIONS', devSkills: data});
        });

        addTask(fetchTask);
        dispatch({type: 'REQUEST_MOTIVATIONS'});
    }
};

// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.

const unloadedState: DevSkillState = { isLoading: false, devSkills: [] };

export const reducer: Reducer<DevSkillState> = (state: DevSkillState, incomingAction: Action) => {
    const action = incomingAction as KnownAction;
    switch (action.type) {
        case 'REQUEST_MOTIVATIONS':
            return { isLoading: true, devSkills: state.devSkills };
        case 'RECEIVE_MOTIVATIONS':
            return { isLoading: false, devSkills: action.devSkills };
        default:
            const exhaustiveCheck: never = action;
    }

    return state || unloadedState;
}