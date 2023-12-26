# Umob assignment

A screen record of some of functionalities and screens

![](https://github.com/abolfazlyounesi/umob-assignment/blob/main/giphy.mp4)

## How to Run

```bash
# Navigate to the project directory
cd [project directory] #umob-assignment or umob-be

# Install dependencies
yarn install

# Run the application

for backend => yarn develop
for mobile app => yarn start
```
for running the project locally, its needed to add the runner computer's local ip to the:
```
umob-assignment/src/api/api.service.ts
line: 4
```
I have used strapi for the backend development, so it needs some more steps to make it ready to use:

1- run the project<br/>
2- open http:localhost:1337/ on your browser<br/>
3- create an accout<br/>
4- go to setting from left side menu<br/>
5- select Roles from USERS & PERMISSIONS PLUGIN
section<br/>
6- click on public<br/>
7- expand the item for game<br/>
8- click on the checkboxes below it<br/>
9- click on save

also if you want to test the app on your phone you need have expo go installed on your phone and scan the given QR code in console

## How to Run automated tests

```
cd umob-assignment
yarn test
```
## Folder structure

umob-assignment <br/>
    /api       # contains needed api functions and configs of application  <br/>
    /common    # contains components which they have been used in mutilple places of app <br/>
    /hook      # contains custom hooks for the app<br/>
    /navigation# contains routing configs for the app <br/>
    /redux     # contains redux configs slices, reducers and store <br/>
    /screens   # each screen of app is been placed in this folder<br/>

## Desing pattern and Tech stack
the design patter used for this app is a mixture of Component Composition and Container/Presentational Components<br/>
I have used Expo framework for mobile app and strapi for backend also language for mobile app is TypeScript and for backend is NodeJs

## Things I would like to do if I had more time

1- adding refresh token logic<br/>
2- adding more question<br/>
3- making the logic more random than what it is now<br/>
4- better apis and return data types<br/>
5- making it more fancy