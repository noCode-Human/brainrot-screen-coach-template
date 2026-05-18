# MISSING

## Needed for real version

| Missing thing | Why needed | V0 mock used | Real setup needed | Estimated cost |
|---|---|---|---|---|
| iOS Screen Time / DeviceActivity integration | Automatically read app usage and enforce limits | Manual sliders in `app/app.js` | Native iOS app with FamilyControls, DeviceActivity, ManagedSettings permissions | Apple Developer $99/year |
| Mobile subscriptions | Charge for blocking, widgets, challenges, and premium avatars | Static upgrade card in `app/index.html` | StoreKit / Superwall / RevenueCat setup | Free tier + platform fees |
| User accounts / sync | Keep history across devices | Browser localStorage | Supabase/Clerk/Firebase auth and database | $0–$25/month to start |
| Push notifications / widgets | Remind users when the brain is decaying | In-page recovery timer | iOS notifications and widgets or PWA notifications | $0 plus dev time |
| Share image export | Viral “brain status” cards | Copyable text summary | Canvas/HTML-to-image export and native share sheet | $0 |

## Notes
- V0 is a browser mock of the core emotional loop, not a real screen-time blocker.
- The riskiest real dependency is Apple Screen Time permission UX and App Store review.
