# fun-with-passportjs
Exploring passportjs sessions & API auth.

## Why ?

Sometimes your app needs to offer _two_ authentication methods, one for
_humans_ and one for _machines_. You can leverage OAuth to do that, but it is
very heavyweight. You can achieve the same with passportjs by mixing and
matching a session-based strategy (e.g. "local") and an HTTP bearer stragegy.


This examples shows exactly this, with a login form for humans, and a Bearer
token for machines.
