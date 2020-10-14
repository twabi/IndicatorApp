## NAMIS INDICATOR APP

### Intro
This is an app that was made to manipulate the indicators for the NAMIS dhis2 platform. <br >
The main components include : DisplayName, CustomReports, Analysis and Time Periods.

### Components

#### DisplayName
Basically, what this component does is give the user the ability to change the long displayNames the NAMIS indicators usually have.<br >
In a table, the can edit the displayName to what ever they see fit

#### Custom Reports
This component gives the user the ability to create a custom report based on the indicators of their choosing, to suit their daily reporting needs<br >
The user can both create a report and edit an existing report. When creating a report the user chooses the number of rows and columns for the table.
The user also chooses the indicators to be placed on each cell at the same time having the ability of changing the column headers and rows as well as the report title and description.

#### Analysis
In this component, the user triggers an analysis operation on the custom report they created in the CustomReports section by choosing the time period(s) and organizational unit(s) of their choice.
The data is placed on the cell each respective indicator that was placed in the custom reports.


#### Time Periods
This component is an altered version of the Analysis component. The user, with one indicator of their choice, can choose multiple organizational units, but the time period they can choose is a dynamic current period e.g. this_year.
And when they trigger analysis, the analysis that is given in this component is a comparison with a similar time period of the previous year e.g. last_year. <br >

This component, in the future can be expanded to include analysing two time periods of both the user's choosing.

### Project By
This project was done by the computer science department (University of Malawi, Chancellor College) sanctioned by the ministry of Agriculture.
