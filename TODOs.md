_Comments_
Profile pic thumbnail by name.
Edit functionality.
Toast in editor. Success/fail.

_Mapbox_
**Mapbox popUpMarkup styling** TODO:
Look in to rendering multiple overlapping coords at the same time.
Only resize after render, not when clicking on browser again. Double refresh.
New Meetup page.
Edit page. -> Is editPage necessary? Can I edit in meetupInformatin component? Perhaps hide editPage and try this option (Do not delete edit page).

_MeetupsList_
Add loading div.
On phone - button to scroll on top of page.
Take users to top of meetupLists component upon next page click.
Pagination buttons should not show unless meetups.length >= 1

_SubmittedMeetupsList_
In profile tab, needs dynamic routing. If your meetups 'Check out your saved meetups here'; otherwise 'Check out ${userId}'s meetups here'. Check session.
Only show delete button here and in details, rather than meetupsList (maybe).

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
API routers?

_NavBar_
Higher contrast needed in mobile phone menu

_FilterComponent_
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
Profile page image can be changed to user.image || default image. Same with title
Profile related info - number of posts etc, last seen, last post when etc. Use/update schema.
Anonymity - user info selectively hidden unless in 'close contact list'.
Place-holder profile image, add, edit profile image (upload) functionality. - should pull from an array upon userCreation. Many random possible profilepics.
Comment info needed, Contact list.
Access to other members that are attending same meetup. Routing, schema, seeding considerations. ([x] is attending [ymeetup] too!)
Add to contacts button.

_Styles_
Scrollbar opacity 0, transition ease-in-out upon scroll/hover.

_Buttons_
Why isn't the text aligned real center? add padding? Ask Chatpgt.

_Datetime_
Relative time (2 weeks ago), hover-over show absolute time.
Timezones. UTC at end of all timezones? Display date relative to time-zone.

_New Meetup_
Image Cloudinary upload x1.
Upon submitting, navigate to the new meetup page (How can I get ID if not already made)?
Form location intellisense? Mapbox? Find solution. HeadlessUI Combobox for searching? Dynamically link to array/objet holding up-to-date location information.
Need to prompt toast in redirected page after new meetup submission => Require change from router to Next/redirect? (Full page refresh cancels toast).Portals. See headlessUI Dialog (Modal).
Validation - should not be a date less than DateNow().
New Meetup is submitted/rendered in wrong date-time. Check seed. Look for datetime without seconds.

_Edit_
Refactor Edit. Editpage Parent Index Component -> Edit child component.
Persisting dateTime
HeadlessUI Combobox for searching? Dynamically link to array/objet holding up-to-date location information.
If sessionData userId =/= meetupuserId block routing. Authorization 405?

_SaveMeetupsList_
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
