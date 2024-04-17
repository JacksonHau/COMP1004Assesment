# COMP1004Assesment

Project Name: Speedy Sprint: Retro Road

Description:
Speedy Sprint: Retro Road is a retro-style endless racing game built using HTML, CSS, and JavaScript. Players control a car and navigate it through an endless road while avoiding collisions with other cars. The game features dynamic background music, high score tracking, and the ability to save and load high scores.

Project Structure:

index.html: Contains the structure of the game interface, including buttons, score display, game area, and audio elements.
style.css: Defines the styles for various elements of the game interface, such as fonts, colors, and layout.
script.js: Implements the game logic, including player movement, enemy car movement, collision detection, score tracking, and high score management.
background_music.mp3: Background music file played during gameplay.
car_crash.mp3: Sound effect played upon collision with other cars.
playercar.png, f1car.png, greencar.png, whitecar.png: Image assets for player car and different types of enemy cars.
background.png: Background image for the game.

Features:

Gameplay: Players control a car using arrow keys or WASD keys to navigate through an endless road.
High Score Tracking: The game keeps track of the player's current score and highest achieved score.
High Score Display: Displays the top 5 high scores achieved by players.
Audio: Background music plays continuously during gameplay, and a crash sound effect is played upon collision.
Save and Load: Allows players to save their high scores as a JSON file and load them back into the game.

How to Play:

Use arrow keys or WASD keys to control the car's movement.
Avoid collisions with other cars on the road.
Try to achieve the highest score possible.
Click on "PLAY" to start the game
Once there is cocollision with the enemy car, a "RESTART" button will appear. Click this button to restart the game from scratch

Additional Notes:

The game utilizes HTML5 audio elements for background music and sound effects.
Collision detection is implemented using bounding box detection between the player's car and enemy cars.
High scores are stored locally and can be saved to or loaded from a JSON file.