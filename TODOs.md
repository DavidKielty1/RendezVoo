_Comments_
Enter should complete commentCreate.
Original comment must cascade delete on all comments with originalcommentId as parentId.
Profile pic thumbnail by name.
Edit functionality.
First reply should expand disclosure and show.
Toast in editor. Success/fail.
Likes should appear pink if userId is in liked table.
Replies auto focus on expand element.
Reply to replies (reply button on each reply comment).
Liking comment is cascading to all comments underneath

_Styles & Html_
Aria Labels
sparklyGradient needs an ease-out-in transition time.
ProfileComments background colour scroll height issue.

_Mapbox_
**Conditional spawn markers only within red step. Otherwise zoom.**
New Meetup page.
Edit page. -> Is editPage necessary? Can I edit in meetupInformatin component? Perhaps hide editPage and try this option (Do not delete edit page).
Sort location reorients map? After 1 second of blur perhaps? etc.

_MeetupsList_
Pagination navigation. How to get to page3 instantly?
On phone - button to scroll on top of page.
Take users to top of meetupLists component upon next page click.

_Refactor_
Pagination buttons @MeetupsList, @SubmittedMeetups, @SavedMeetups.
Next/Head Favicon, description.
Try to refactor showDetails button (search find bg-green-200) to separate component. Used in @Meetuplist, @SubmittedMeetups.
Transitions headlessUI components.
Type-guarding in [MeetupId]Index component.
Edit form at some point.
NewMeetup GeoData logic.
Both -^ forms. State is verbose, lengthy.
Can the NextImages be refactored?
Svg in navbar?
Desktop Navbar.
Comments and replies? - Can both be merged with a conditional?
Date formatting logic in profileCommentsList.
API routers?

_Admin Page_
Show latest image uploads,
Profile changes,
Meetups,
Comments

_NavBar_
Higher contrast needed in mobile phone menu

_FilterComponent_
Sort must be a dropdown. meetups.FindManyWhereLocation => searchInput = allMeetupsFiltered.location. Make input dropdown, map through returned values as options.
Above inputs set dynamic. if(no searchTerm) {Please enter search term} else {Searching for 'searchTerm'}. Same for sort. Sorting by: . .
Turn on predictive text.
Feedback in filter component showing results for searchTerm, showing results for location, showing results for both. Can I change the label value?

_Meetup Details_
Date format of seed is too specific with seconds.
Add user.name/author name to meetup details. - Link to their profile page. => Find user.name from meetup.userId.
Comment toast is freezing?
Line clamping in the information could probably change, be expanded.
SaveMeetup button should redirect to login if no session.
Needs an 'attending' element which pulls savedMeetupData (users shown by profilePics as links).

_ProfilePage_
UserInformation in profileOverview needs overall overflow-hidden or clamp solution.
Update User info page - incl. prof picture, banner
Randomize colour banner in profile overview.
Profile page image can be changed to user.image || default image. src="{{ member.photoUrl || './assets/user.png' }}"
Same with title
Profile related info - number of posts etc, last seen, last post when etc. Use/update schema.
Anonymity - user info selectively hidden unless in 'close contact list'.
Place-holder profile image, add, edit profile image (upload) functionality. - should pull from an array upon userCreation. Many random possible profilepics.
Access to other members that are attending same meetup. Routing, schema, seeding considerations. ([x] is attending [y-meetup] too!)
Add to contacts button.
Contact list.

_Styles_
Scrollbar opacity 0, transition ease-in-out upon scroll/hover.

_Buttons_
Why isn't the text aligned real center? add padding? Ask Chatpgt.

_ProfileComments_
Icon could be absolutely positioned.
Icon should navigate to place in page where comment is, may need to expand comments to find place in thread.

_Datetime_
Relative time (2 weeks ago), hover-over show absolute time.
Timezones. UTC at end of all timezones? Display date relative to time-zone.

_New Meetup_
Image Cloudinary upload x1.
Upon submitting, navigate to the new meetup page (How can I get ID if not already made)?
Form location intellisense? Mapbox? Find solution. HeadlessUI Combobox for searching? Dynamically link to array/object holding up-to-date location information.
Need to prompt toast in redirected page after new meetup submission => Require change from router to Next/redirect? (Full page refresh cancels toast).Portals. See headlessUI Dialog (Modal).
Validation - should not be a date less than DateNow().
New Meetup is submitted/rendered in wrong date-time. Check seed. Look for datetime without seconds.

_Edit_
Refactor Edit. Editpage Parent Index Component -> Edit child component.
Persisting dateTime
HeadlessUI Combobox for searching? Dynamically link to array/objet holding up-to-date location information.
If sessionData userId =/= meetupuserId block routing. Authorization 405?

_SavedMeetupsList_
Needs delete route.

_APIs_
Getting there tab.
Flights tab.
MeetupDelete route does not work with meetups that have comments.

_PrivacyPolicy_
Using google.
BFG - Docker

_App-wide_
Skeleton page upon initial server fetch.
Notifications. -> If someone comments on your submission., friend request, friend added etc.

_Auth0_
Error on Auth0 login

.

.

.

Move TODOs (this doc) to Trello.

Tests.

CircleCI.
Lighthouse.

Scaling.
AWS, lambdas, etc.

A/B testing?
Localization.

Database migration techniques - expand/contract.
Dev, Staging, Prod deployment processes?.
How to update project with no downtime.
