---
layout: post
title:  "Trying Out Some Alternatives: Redux and Deku"
date:   2016-02-18 18:00:33 +0100
categories:
---
For a recent gig, I took on rebuilding a website that had originally been built using React, and I took the opportunity to try out some "alternative" libraries - namely [Redux](http://redux.js.org/) and [Deku](https://github.com/dekujs/deku). The project is [Andrew Barr Photography](http://www.abarrphoto.com) - a professional photography site featuring an About page, Gallery, and Projects pages.

<h3>Redux</h3>

It's funny for me to refer to Redux as an alternative because, in fact, I have never used any of the more common solutions for state management myself. I have heard a bit about Flux from other developers - primarily talking about its issues. Stepping further back (since [Facebook created Flux](http://www.infoq.com/news/2014/05/facebook-mvc-flux) back in 2014 as an alternative to MVC for large applications), I have not really had the opportunity to work on an MVC project, either. That said, with the recent buzz around Redux, it seemed to me there is no good reason to treat these systems as something that must be tackled in order. Perhaps I won't appreciate the wonder of Redux as much having not first dealt with Flux, but I'm happy to save myself the headache for now.

So, comparing my use of Redux to the experience of building a web app without any such tool, I would say that I found it very satisfying and easy enough to learn. The creator of Redux has put out a series of very helpful [tutorial videos](https://egghead.io/series/getting-started-with-redux), walking you through how the code works and how to implement it. It is all simple and straight-forward enough that you can easily recreate the codebase yourself, as I did.

I call it satisfying because it creates a very neat, well-organized pattern for you to follow. For example - a user clicks a button to show a side-nav, the action creator function you've tied to that click event sends an action to your reducer, which checks the action type and payload and dispatches the appropriate state update to the store. Using store.subscribe, you trigger a re-render each time store is updated. And voilà!

As a way to deal with events that need to trigger multiple actions, you can add redux-thunk middleware to the picture. With that in place, you can return a function from your action creator that calls dispatch with each of these actions, comme ça:

{% highlight javascript %}
export const submitPendingBeta = (rawEmail) => {
  if (rawEmail) {
    const email = rawEmail.trim()
    betas.push({ email: email, time: Date.now() })
  }

  return (dispatch) => {
    dispatch({ type: 'UPDATE_BETA', payload: '' })
    dispatch({ type: 'SET_THANKS_VISIBILITY', payload: true })
  }
}
{% endhighlight %}

This example is from another project I'm working on - [Finlit.io](http://finlit.io) - for which we have just a landing page live so far. This code handles the submission of an email address to our Beta testers sign-up form - creating both an action for submitting the email address and one for displaying a thank you message.

I definitely foresee using Redux on future projects, and continuing to look for ways to make my implementation of it more streamlined. For instance, are separate actions and reducers really necessary for actions that share a certain signature (e.g. update, push), or could you create a generic action and reducer to capture them? I started to implement this on Finlit, but found I was tripping over it a bit. For now, I think I like the simplicity of the set pattern.

<h3>Deku</h3>

Working with Deku was also a fun experience, though overall, I would say that it is a less thoroughly developed library, which caused some frustrations in debugging.

The primary issue I ran into, and which was actually resolved by an update to the Deku codebase during the time I was working on this project, was that they did not support null rendering. That is to say, a ternary like the below, which I would commonly use in React, would break the app:

{% highlight javascript %}
{ context.view.page === 'about' ? <About /> : null}
{ context.view.page === 'gallery' ? <Gallery /> : null}
{ context.view.page === 'projects' ? <Projects /> : null}
{% endhighlight %}

So if you're interested in trying out Deku and want support for null rendering, make sure to grab version 2.0.0-rc14.

It is a bit unclear to me how much further attention Deku will receive. The team that developed it, Segment, published [a blog post](https://segment.com/blog/deku-our-functional-alternative-to-react/) on its release in May 2015, and they mention there that in their next blog post on Deku, they'll go into more detail on "how we structure our components and how we deal with CSS." But I can't find any more posts dealing with Deku on their site -- 10 months later! The last update to the repo was 15 days ago, though, so it would seem it's still receiving some attention.

What I loved about working with Deku, though, was how it simplifies the way state is passed to the app components. For reusable components, you can still pass info through props, but the rest of the time you can just use the context, which is accessible to all app components. No more of this repetitive, object-oriented scheisse, where you have to pass props down through every parent component. You want to grab the gallery images? With Deku it's as simple as:

{% highlight javascript %}
const images = context.galleryImages
{% endhighlight %}

I'll be interested to see where Deku goes, if it does keep going, but I think for now I'll move back to React. As one example of how it's still just easier to work with React to build out the functionality you want, I can't find any documentation currently for capturing keypress or keydown events with Deku. So that enhancement I wanted to add, allowing the user to change images in the gallery overlay using their arrow keys? No can do. (Though I'm sure a hacky solution exists). With React? [You betcha](https://facebook.github.io/react/docs/events.html).
