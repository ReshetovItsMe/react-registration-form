# Registration from ReactJS

Develop a step-by-step registration form in ReactJS, using third-party libraries is allowed. Each next step becomes available when all required fields are filled in.

## General structure

1. The page contains a menu listing the steps
2. Active step is highlighted
3. Available step is highlighted
4. On each page there is a "next" button, active after filling in all the required fields
5. For the fields Email, Date of birth, validation is required
6. Navigation, routing
7. Displaying error messages

## Step 1. Auth

Fields

* Email (required) (validation);
* Password (required);
* Password confirmation (mandatory).

## Step 2. Personal data

* Name (required);
* Birth day (validation):
  * Day (registration);
  * Month (required);
  * Year (required);
* Additional Information

## Step 3. Checking and submitting data

Confirmation of the entered data and completion of registration.
The page displays all previously entered information.

### Note

1. You can use a third-party widget to select a date.
2. Additional information - maximum 512 characters, it is necessary to display the number of remaining characters.
