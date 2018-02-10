= Components

:numbered:


== File: **

=== If

Component that wraps other components and conditionally displays them.   



[options="header"]
|===
|Property | Type | Required | Default value | Description
|className|string|no|&lt;See the source code&gt;|Outer world class to modify internal styles when it is provided
a children as string.
|children|node|yes||Node conditionally rendered. Note: this node is wrapped into
a span when a string is provided.
|expression|bool|yes||The flag that show/hide the children.

|===


