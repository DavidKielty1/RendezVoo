_Search & Filter_
Expandable searchtools Component
Sorting and filtering by date/proximity **/country/city**.
**Search words.**
HeadlessUI Combobox for searching? Dynamically link to array/objet holding up-to-date location information.
Turn off spellcheck
Turn on predictive text
{Extra}
_Comments_
Change comment title to user. Link to profile.
Profile pic thumbnail by name.
Comment threads - every comment can have multiple repliesMake reply schemaSort replies by time.
Thumbs up/reactions schema.
Routing to delete/edit only your own comments.
Feedback on comment fail if not logged in. => Only show commentEditor if signed in.

_Mapbox_
Look in to rendering multiple overlapping coords at the same time.
Skeletal template upon page load.
Only resize after render, not when clicking on browser again. Double refresh.
New Meetup page.
Edit page.

_Datetime_
Relative time (2 weeks ago), hover-over show absolute time.
Timezones. UTC at end of all timezones?
Display date relative to time-zone.
Localization.

_FavIcon_
Can I set the favicon somewhere globally? Top level index/app component?

_Refactor_
Categories array within ProfileTabs component.
Pagination buttons @MeetupsList, @SubmittedMeetups, @SavedMeetups, @FilteredMeetupsList
Can useSession be set globally? - globalStateManagement?
Next/Head Favicon, description.
Try to refactor showDetails (search find bg-green-200) to separate component. Used in @FilteredMeetups, @Meetuplist, @SubmittedMeetups
Transitions components.
Can I refactor the type-guarding in [MeetupId]Index component? Ask Chatgpt for this one.
Edit form at some point.
NewMeetup GeoData logic.
Both -^ forms. State is verbose, lengthy.
Can the NextImages be refactored?
Re-use the sparklyGradient elsewhere throughout site.
Svg in navbar?
Desktop Navbar.
API routers?
.
_NavBar_
Clicking on profile picture does nothing.

_APIs_
Getting there tab.
Flights tab.

_PrivacyPolicy_
Using google.
BFG - Docker

_Meetup Details_
Date format of seed is too specific with seconds.
Add user.name/author name to meetup details. - Link to their profile page. => Find user.name from meetup.userId.
Should not show save/attend button for own meetup.
Comment toast is freezing?
Who is attending. SavedMeetups.
Line clamping in the information could probably change, be expanded.
Title could be more obvious on phone screen resolution (bold).

_ProfilePage_
UserInformation in profileOverview needs overall overflow-hidden or clap solution.
Update User info page - incl. prof picture, banner
Randomize colour banner in profile overview.
Profile page image can be changed to user.image || default image. Same with title
Profile related info - number of posts etc, last seen, last post when etc. Use/update schema.
Anonymity - user info selectively hidden unless in 'close contact list'.
Notifications if someone comments on your submission.
Place-holder profile image, add, edit profile image (upload) functionality.
Comment info needed, Contact list.
Access to other members that are attending same meetup. Routing, schema, seeding considerations.
Add to contacts button.

_Buttons_
Why isn't the text aligned real center? add padding? Ask Chatpgt.

_MeetupsList_
Add loding div.
On phone - button to scroll on top of page.
Take users to top of meetupLists component upon next page click.

_SubmittedMeetupsList_
In profile tab, needs dynamic routing. If your meetups 'Check out your saved meetups here'; otherwise 'Check out ${userId}'s meetups here'. Check session.
Only show delete button here and in details, rather than meetupsList.

_New Meetup_
Image Cloudinary upload x1.
Upon submitting, navigate to the new meetup page (How can I get ID if not already made)?
Form location intellisense? Mapbox? Find solution. HeadlessUI Combobox for searching? Dynamically link to array/objet holding up-to-date location information.
Need to prompt toast in redirected page after new meetup submission => Require change from router to Next/redirect? (Full page refresh cancels toast).Portals. See headlessUI Dialog (Modal).

_Edit_
Refactor Edit. Editpage Parent Index Component -> Edit child component.
Persisting dateTime
HeadlessUI Combobox for searching? Dynamically link to array/objet holding up-to-date location information.

_SaveMeetupsList_
Needs delete route.

_App-wide_
Skeleton page upon initial server fetch.

_Auth0_
Error on Auth0 login

_Seed_
Different street names within cities (if can't find multiple mapbox popup solution).
For search functionality: "Add 50 more cities from UK, 50 more cities world-wide. Create 400 seeds.
Change it so along with the comment, the user will add that meetup to their saved meetup also.
Perhaps members could also @ other people who have commented on the post.

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

Database migration techniques - expand/contract.
Dev, Staging, Prod deployment processes?.
How to update project with no downtime.
