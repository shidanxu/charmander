=======
proj3
=====

Project 3: MyWay

Members: Donglai Wei, Neil Gurram, Shidan Xu

Part 1: Design Documentation
-------------------------------------------------------
team:           

                part1/team_design_part1.pdf

individual:     

                part1/team_design_alex_zoe.pdf  (Donglai Wei)

                part1/team_design_ngurram.pdf   (Neil Gurram)

                part1/team_design_shidanxu.pdf  (Shidan Xu)

docx/: 

                part1/docx/ source files

Part 2: API
--------------------------------------------------------
team:
	team_design_part2.pdf

The code is in api/, testing is in /test, and preprocessing of data files are in /preprocess
The distribution of work is 

Donglai Wei: 	Code framework, model classes and utility functions
Shidan Xu:  	API design and controller functions
Neil Gurram:    Test cases and data crawling


To access our tests, please go to myway-myway6170.rhcloud.com/test_{artwork, gallery, way}.html

Grading directions:
API Documentation: we list all implemented APIs with description at the end of the report and we also add the description before each API call function in the code
API Deployment: (Qunit on rhc)

Part 3: Client-Side
--------------------------------------------------------
team:
	team_design_part3_combined.pdf	

We have written the author on the individual files.

We first would like to tell a story to help you guide through our app.  After all this, we summarize the main links and information pertaining to the links after that story for your information.

A Day of MFA Admin
----------------------

Hi, I’m a MFA admin. One day, I woke up and found that our awesome “MyWay” app is hacked: only the third floor map survived and most of the artworks got deleted and the rest were renamed into “a,b,c…” Below is the log of what I did to rescue them:

***User mode:*** 
I first check if our app is functional. I go to http://myway-alexzoe.rhcloud.com/

*Task 1: Search a way* 

 - **Search Validation**: I entered some random words: hello and pikachu, which won’t be recognized by the search bar.
 - **Search by artist**: I entered my favorite artists in the input box : monet, picasso, van gogh , and hit the search button. The page scrolls down and displays a path.
 - **Search by artwork name**: I entered my favorite artworks in the input box : a, b, c , and hit the search button. The page scrolls down and displays a path.
 - **Search by gallery**: I entered my favorite gallery room numbers : 326, 324, 333, and hit the search button. The page scrolls down and displays a path.
 - **Search by combination above**: I entered some combination of the query above: 326, a, monet, and hit the search button.  The page scrolls down and displays a path.
-**Searching after already making a search**: I now am eager to try another path so soon after typing the first one.  So, I use the search bar on the map page and I search: a, b, c van gogh, g, and hit the search button and see a path displayed.

*Task 2: Display the recommendations*

 - **Display Recommendation**: I click on the “feeling lucky” button, because I just want to see if our recommended ways are still there.  Indeed, after the page scrolls down, I see that two ways are drawn out, and their paths are described to the left.

***Admin mode:*** 
Then I Login from the Login link on the search page, and entered my username (6170) and password (awesome).  

*Task 3: Manipulate artwork*
 - **List existing artworks**: I want to see all the artworks in my database.  I then click Display All Artworks, and see all the artworks.
 - **Delete an artwork**: Then, I choose an ID of an artwork that I want to delete, from the list that is displayed, and click Delete, and realize after hitting display all artworks, I can see the artwork deleted.
 - **Add an artwork**: Then, I realized that I need to add an artwork.  After listing all the fields (access number, name, gallery name, author), I can click Add, and realize after hitting display all artworks, I can see the artwork added.
 - **Update an artwork**: I want to change an attribute of an artwork.  I do this by typing in the Art ID, and updating any of New Name, New Gallery Name, and New Author, and click Update, and I see after hitting List Existing Artworks, I get the updated artwork is displayed.
- ** Find an artwork**: I now want to check if an artwork exists in the database, and I type in the art ID that I found from display all artworks.  I see after clicking Find an Art, I get the work is displayed.

*Task 4: Manipulate gallery*
 - **List existing galleries**: I now want to be sure that I can see my galleries.  I then click Display All Galleries, and see all the galleries.
 - **Delete a gallery**: Then, I choose an ID of a gallery that I want to delete, from the list that is displayed, and click Delete, and realize after hitting display all galleries, I can see the gallery deleted.
 - **Add an recommended gallery**: Then, I realized that I need to add a gallery.  After listing all the fields (Gallery Name, X Coordinate, Y Coordinate, list of Artworks), I can click Add, and realize after hitting display all galleries, I can see the gallery added.
 - **Update a gallery**: I want to change an attribute of a gallery.  I do this by typing in the Gallery ID, and updating any of New Name, New X Coordinate, New Y Coordinate, and click Update, and I see after hitting List Existing Galleries, I get the updated gallery is displayed.
- ** Find a specific gallery**: I now want to check if a gallery exists in the database, and I type in the gallery ID that I found from display all galleries.  I see after clicking Find a Gallery, I get the gallery is displayed.


*Task 5: Manipulate way*
 - **List existing ways**: I now want to be sure that I can see my ways.  I then click Display All Ways, and see all the ways.
 - **Delete a way**: Then, I choose an ID of a way that I want to delete, from the list that is displayed, and click Delete, and realize after hitting display all ways, I can see the way deleted.
 - **Add an recommended way**: Then, I realized that I need to add a way.  After listing all the fields (New Name, Descriptions, list of Galleries), I can click Add, and realize after hitting display allways, I can see the way added.
 - **Update a way**: I want to change an attribute of a way.  I do this by typing in the Way ID, and updating any of New Name, New Descriptions, New Galleries, and click Update, and I see after hitting List Existing Ways, I get the updated way is displayed.
 - **Find a specific way**: I now want to check if a way exists in the database, and I type in the way ID that I found from display all ways.  I see after clicking Find a Way, I get the way is displayed.

--**Log Out**: Finally, I feel satisfied with all my features, and I decide to call it a day.  I click the Log Out Button and I get to the Login Screen.


Part 3.2 test cases:
	
	- http://myway-alexzoe.rhcloud.com/test/test_way.html

	- http://myway-alexzoe.rhcloud.com/test/test_artwork.html

	- http://myway-alexzoe.rhcloud.com/test/test_gallery.html


Part 3.3 MyWay App:

User Mode: 
	
	- http://myway-alexzoe.rhcloud.com/

	- [Input Field]: Users can input and select a gallery by a gallery name, the name or the author of an artwork that is in the gallery. Below is our preloaded database:  
		
		* (full match) seven artworks with the name {a,b,...,g}

		* (partial match for first/last name, case incensitive) seven artworks associated with different authors {pablo picasso; leonardo da vinci; claude monet; vvincent van gogh; raphael;rembrandt van rijn; caravaggio}
		
		* (full match) seven gallery names: {326,327,328,332,334,335,336}
	
	- ["Search" Button] Given the selected gallery names, we display the shortest path result on the scrolled-down page

	- ["Feeling Lucky" Button] Display two saved ways in the database that are recommended by the MFA.

	- ["Login" Link] Switch to Admin mode to edit the database


Admin Mode: 

	- http://myway-alexzoe.rhcloud.com/admin: direct access or redirect from the "Login" in above

	- [Login Page] We provide the preloaded MFA user info:
		* username: 6170
		* password: awesome

	- [Management Page] We implement the forms to call our API calls to add/update/delete objects in the database
