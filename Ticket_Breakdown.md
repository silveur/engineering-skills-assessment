# Ticket Breakdown
We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**


Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".


You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here


# Backend - Model update
To improve readability throughout the reporting process, it would be useful to add an extra custom id field that facilities can understand and remember. Having a human-readable custom id is much more convenient to manage compliance and track Shifts efficiently.

Redefine the Agent database model to incorporate a unique String field: `customId`.
This field must be at least 6 characters long and should be unique throughout the collection.
On save the field's content should be be trimmed and free of special characters.
This new field should also be added to the GraphQL model and be added to any Search string for indexed lookups.

Time estimate: 2 hours

# Backend - Agent update route
Update the GraphQL update route to allow this new field to be sent in the payload and saved into the database.
The field type is String and is optional in the GraphQL model.
Validation of the field's content must also apply at Service level from the model specifications.

Different backend tests should error on bad input and verify data integrity.

Time estimate: 4 hours

# Backend - generateReport update

The method generateReport should be modified to use the new Agent's custom id field.
Modify the GraphQL resolver to take customId as an input field.
When a customId is supplied to the resolver, find the corresponding Agent and filter the Shifts by Agent reference.

Write corresponding tests.

Time estimate: 6 hours

# Frontend - Saving custom ids
The Facilities's admin panel should present the new custom id field for each Agent.
It is an optional field but should also follow the model specifications such:

- 6 characters minimum
- no special characters
- trimmed on update

Figma prototype link: https://figma.com

The input field should follow the global UI chart and should be labelled "Agent custom id"
After editing the Agent's information, navigating back to their profile should then display the custom id next to the name in the format: #id / #customId - #firstName #lastName

Time estimate: 4 hours

# Frontend - Filter report per Agent custom id
Reports are generated in PDF format and lists all shifts sorted by Agent.

The Report generator component must include a custom id input dropdown selector with a list of Agent custom ids.

The PDF generator method must be modified to highlight the Agent's custom id.
It should not replace the existing id and is shown following this prototype:

https://figma.com

Time estimate: 3 hours


