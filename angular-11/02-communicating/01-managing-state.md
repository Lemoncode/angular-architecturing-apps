# Managing state

What is state in this context? Well, it can be information about the view, such as whether to display images or the user entered filter string. It can be user information such as the user's name and roles that is used to tailor the application for the user. State can be entity data, such as our product information that is displayed a manipulated by the application, but originally retrieved from and stored on a back end server somewhere. It can be user selection and input, such as the currently selected product or edited product name or any other information or data that the application tracks. 

* View State
* User Information
* Entity Data
* User selection and Input

There are many techniques available for managing state in an application. 

## Property bag

At the low end of the complexity scale is a property bag. We define a service that exposes simple properties that are components used to communicate state amongst themselves. We can think of services such as these as property bags as they are just bags of properties with no real logic or state management.

## Basic state management

Moving up the complexity scale. We define a basic state management service that retrieves, manipulates, inserts, deletes and stores application state, our components, use this service to share entity, state and communicate state changes, using angular is built in change detection. 

## State Management with Notifications

Taking it up another notch on the complexity scale. We add notifications using subject behavior, subject or similar. We can think of them as a way to provide notifications when we can't leverage Angular is built in change detection to communicate state changes. 

## NGRX

At the top of the scale is NGRX, which is a powerful state management library inspired by Redux. It is based on four core tenants. 

* State: Immutable

* Actions: State Changes

* Reducers: State + Action = New State

* Store:
    - Observable of state
    - Observer of Actions

State is a single immutable data structure. Actions describe state changes, pure functions or reducers. Take the current state and next action to produce a new state and state is accessed with a store, which is an observable of the state and an observer of all actions.

NGRX provides a well defined pattern and techniques for handling complex state throughout an application. But it requires a lot of configuration and plumbing, which can result in a large amount of additional code to create and maintain. 
