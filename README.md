# Lego APP
LEGO store application, the user can authenticate and buy the LEGO figurines they like the most.

## Installation

> Install node modules using `yarn install`

> Run expo using `yarn start`

## About the project

### Authentication
The project uses Firebase to handle authentication, you can either create an account or access the store using an existing one. The session will stay open after closing the app. You can terminate the session using Firebase Console

### Shop
The state of the Shop is maintained across the whole application (like redux, I decided not to use Redux since it was so little information. I considered it uncesessary).

The user may add items to their shopping cart by clicking the orange button the home/detail screens. The items will be added as long as there is enough stock available.

At the top of the screen appears the `buy` button. After pressing the button it will appear a confirmation message, if the user confirms it will send the request `POST /buy` and update the shop based on the response.

### Screens

There are two important screens: 

The **home** screen that displays a list of items obtained from the request `GET /all-products`. This is stored globally and will me called only once on the application. It will not be called again even if the user navigates to other screens. 

The **detail** screen displays a description of the item the user selected. It will play a smooth transitions between screens, using the same image on the *home* screen. The description is obtained using the service `GET /detail/:id` which will be called on first load. Since the request is made asynchronously the description object will appear using an opacity animation. In this screen will also appear a button that allows the user to add that item to their shopping cart.

## Notes:

- The mock service from *Postman* stopped working due to a limit on the number of requests, so I made a mock service that returns the same objects and used that instead.
- Since some of the images are pretty big and would not work properly on mobile devices I made a service[^1] that proxies, resize, and cache the images. This service is used across all the images in the application.

[^1]: What this service does is: downloads the image from the provided url, scales it down, adds a white background and returns the new image. The result images are then chached in memory for future retrievals.