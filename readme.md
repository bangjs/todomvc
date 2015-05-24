# BangJS • [TodoMVC](http://todomvc.com)

> BangJS is Bacon-flavored Angular. Program watertight web app user interface behavior with [AngularJS](https://angularjs.org) and [Bacon.js](https://baconjs.github.io).

> Enjoy everything that’s good about [functional reactive programming](https://gist.github.com/staltz/868e7e9bc2a7b8c1f754) with all the benefits of a mature and vibrant front-end framework ecosystem.

> _[BangJS - bangjs.org](http://bangjs.org)_


## Resources

- [Website](http://bangjs.org)
- [GitHub](https://github.com/bangjs/bangjs/)
- [API docs](https://github.com/bangjs/bangjs/blob/master/doc/build/bang/index.md)
- Used in production by [Nouncy](http://nouncy.com)

*Let us [know](https://github.com/tastejs/todomvc/issues) if you discover anything worth sharing.*


## Implementation

This little app showcases much of what's good about BangJS.

* **Makes support for asynchronous logic the default**

  Notice how the storage provider has been setup to support real-time client-server interaction out of the box. This is the _obvious_ approach as opposed to something you need to get out of your way for.

* **Allows you to focus on business logic instead of managing state**

  Notice how there is virtually *no mutable state*, which means less bookkeeping and less superficial bugs to waste time on. Instead work on uncovering your application logic and expressing it in the concisest possible way. Notice how few lines of code our implementation needs in comparison to many others.

* **Keeps your code maintainable and scalable due to inherent composability**

  Notice how most of the implementation is basically a collection of observables, composed using FRP principles. Because every observable defines its own behavior and its own behavior only, we insulate ourselves from spaghetti smell.


## Credit

Created by [Tim Molendijk](http://twitter.com/timmolendijk/).
