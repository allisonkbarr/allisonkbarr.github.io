---
layout: post
title:  "A Kata Revisited"
date:   2016-02-20 18:00:00 +0100
categories:
---

Back in September, [I wrote a post](http://allisonkbarr.github.io/2015/09/29/digging-in-with-codewars.html) about trying to solve this particular kata on Codewars related to binomial coefficients, and yesterday I finally revisited that problem to see if I could find a better solution and resolve the time out issue.

As a refresher, the problem asks you to solve for x in the equation m = n choose x. For instance, you need to create 6 posters and you have 4 paint colors - how many colors can you use per poster to create 6 unique combos (i.e, 6 = 4 choose x)? The answer would be 2 colors per poster.

I found a couple ways to make it more efficient. First, in my function for finding a factorial, I was unnecessarily pushing multipliers into an array, then doing the multiplication, instead of combining these actions into one step.

Second, in no case would the result of the problem be greater than the given arguments, so in my for loop in the checkchoose function, I was unnecessarily going all the way up to i <= factorial(n), when it could just be n.

These changes, and especially the latter, gave the improvement in performance needed, but now I was failing a couple of the tests somehow. To figure out the issue, I narrowed the tests down to just one of the ones that was failing: {% highlight javascript %}Test.assertEquals(checkchoose(155117520, 30), 15){% endhighlight %} ...and added in a console.log line in the for loop of checkchoose:

{% highlight javascript %}
for (var i = 1; i <= n; i++) {
  console.log(m, n, i, computeBiCo(n, i))
  if (m === computeBiCo(n, i)) {
    return result = i
  }
{% endhighlight %}

Ah ha! This quickly revealed the issue - not a problem in my logic, but rather an underlying issue with binary. The calculated binomial coefficients were losing precision! So at the correct i value of 15, instead of getting a calculated binomial coefficient of 155117520, I was getting 155117519.99999997.

So with a simple addition of Math.round to my computeBiCo function, I finally had a solution that passed all tests and didn't time out.

Here's my final answer:

{% highlight javascript %}
function factorial(n) {
  var m = 1
  for (var i = 1; i <= n; i++) {
    m = m * i
  }
  return m
}

var computeBiCo = (n, x) => Math.round(factorial(n) / (factorial(x) * factorial(n-x)))

function checkchoose(m, n) {
  if (n <= 0 || m <= 0) return -1
  var result = -1
  for (var i = 1; i <= n; i++) {
    if (m === computeBiCo(n, i)) {
      return result = i
    }
  }
  return result
}
{% endhighlight %}
