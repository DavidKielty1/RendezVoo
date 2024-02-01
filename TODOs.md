## Comments

- Navigation route of reply when clicked is incorrect - make routing per reply.
- Styling should affect only one reply on hover.
- Enter should trigger commentCreate route in comment editor component.
- Original comment must cascade delete on all comments with originalCommentId as parentId.
- Add user's profile pic thumbnail alongside their name.
- Implement edit functionality.
- First reply should expand disclosure and show.
- Implement toast in editor for success/error for commentCreate route.
- Likes should appear pink if userId is in the liked DB table.
- Clicking reply should auto-focus on input field within expanded element.
- Implement reply to replies (reply button on lastChild of reply tree).
- Fix cascading effect of liking a comment/reply.

## CI/CD

- Implement automated lighthouse, lint, formatting, pa11y, testing.
- Parallelize CI process with build job.
- Dockerize and push to Vercel.

## Styles & HTML

- Add Aria Labels for accessibility.
- Implement an ease-out-in transition time for sparklyGradient.
- Resolve ProfileComments background color scroll height issue.
- Set scrollbar opacity to 0 with transition ease-in-out upon scroll/hover.

## Mapbox

- Conditional spawn markers only within red step. Otherwise, zoom.
- Implement Mapbox geolocation data within New Meetup page for location input field information.
- Evaluate the necessity of Edit page. Consider editing within meetupInformation component.
- Sort location reorients map after a delay. Use sorted input to geocode and reorient the map.

## MeetupsList

- Implement pagination navigation to specific pages instantly.
- For phone browsers, add a button to scroll to the top of the page.
- Ensure clicking the next page reorients the scrollbar to the top of the MeetupList component.

## Refactor

- Reduce duplication in pagination buttons across various components.
- Update Next/Head Favicon and descriptions.
- Refactor showDetails button to a separate component.
- Separate Transitions headlessUI into its own component.
- Implement type-guarding in [MeetupId]Index component and create a props type file.
- Refactor and simplify state in Edit and NewMeetup forms.
- Review NextImage information and SVG in Navbar.
- Consider merging comments and replies with conditional logic.
- Standardize date formatting logic in ProfileCommentsList.
- Organize API route actions.

## Admin Page

- Display latest image uploads, profile changes, meetups, and comments.

## NavBar

- Increase contrast in the mobile phone menu.

## FilterComponent

- Change sort to a dropdown.
- Implement dynamic feedback based on search inputs.
- Enable predictive text.

## Meetup Details

- Adjust date format to be less specific.
- Add user/author name linking to their profile.
- Address the issue of comment toast freezing.
- Expand line clamping in the meetups details.
- Redirect SaveMeetup button to login if no session is found.
- Implement an 'attending' element for meetups.

## Profile Page

- Implement overflow-hidden or clamp solution for user information.
- Update user information page including profile picture and banner.
- Randomize color banner in profile overview as default.
- Allow profile page image and title to be dynamic.
- Implement selective anonymity in user info.
- Add functionality for profile image upload and editing.
- Hook up the contact list and consider schema and route implications.

## Buttons

- Align text to the real center and consider adding padding.

## Profile Comments

- Position icon absolutely.
- Make icon navigate to the corresponding place in the MeetupDetail component.

## DateTime

- Show relative time for submitted comments and meetups, with objective time on hover.
- Display dates relative to the user's timezone.

## New Meetup

- Implement single image upload with Cloudinary.
- Navigate to the new meetup page upon submission.
- Explore form location intellisense solutions.
- Implement toast notifications for successful meetup submission.
- Validate to prevent submission of dates earlier than the current date.

## Edit

- Refactor the Edit page into parent and child components.
- Persist dateTime information.
- Block unauthorized routing in session data mismatch.

## SavedMeetupsList

- Add a delete route.

## APIs

- Develop 'Getting there' and 'Flights' tabs.
- Fix MeetupDelete route for meetups with comments.

## Privacy Policy

- Discuss the use of Google and Docker in the BFG.

## App-wide

- Implement a skeleton page for initial server fetch.
- Develop a notification system for various user actions.

## Auth0

- Address the error in Auth0 login.

## Testing

- Add tests for all components, considering potential refactoring.

## Future Considerations

- Move TODOs (this doc) to Trello.

.

- Cloud.
- Scaling.
- AWS, lambdas.

- A/B testing?

- Localization.
