_Relational Databases_
Contact list. Expand user model.
All users need a join with savedContacts. Id from user, foreignkey Id from other user? Each link will also have an id?

_Schema_
User: savedContact column/join.
Thread: ParentId (if comment has no parent, is original post),

_API RPC_
Contacts - add, delete, get.
UserProfile - edit data -> name, password(?), description. Update, get, delete. How will delete work? commentThumbsUp?
Comments - edit, user.profilePic, thumbs up, edit, add, delete.
sub-comments,
SavedMeetups - delete.

_Views_
Contacts: addContact button, contacts list (button profileOverview, list ProfileTabs)
Comments: reply button, edit button, thumbs up, expand comments(?).

_Filter/Sort_
Predictive text for FilterComponent

_Routing_
Test logout not pushing to '/'. Think about new meetup, edit etc. considerations. Route lockout with no sessionData.

_SeedImplement_
Each user should only have max 1 comment per meetupId.
Rectify savedMeetup logic. Each user should submit 10 meetups, have should have 5 'saved meetups'.
Replies - please change events, places, and cities to savedMeetup event, place, city, as I need the replies to be relevant to the meetup post they are posting on.

Separate seedHelperComments function. Each user should have atleast 5 comments. These should be on the same meetups which they have attended.
Some of these comments should @the original poster, and @other people attending the meetup.
They should have random textbody's such as 'Can't wait to get out there. Can't wait to do [x]. Can't wait to see you guys again!'.
Users should also random like 5 other comments.

Contacts - Users should all have at least 5 other contacts.

Seed 5 random PMs to my own sessionData.user.id for testing.

_SeedFutureConsiderations_
Different street names within cities (if can't find multiple mapbox popup solution).
For search functionality: "Add 50 more cities from UK, 50 more cities world-wide. Create 400 seeds.
Change it so along with the comment, the user will add that meetup to their saved meetup also.
Perhaps members could also @ other people who have commented on the post.

_Future Considerations_
Notifcations,
Messages from contacts. Get, reply, like, edit.
