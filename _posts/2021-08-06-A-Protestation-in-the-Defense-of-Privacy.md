---
layout: posts
title:  "A Prostestation in the Defense of Privacy"
classes: wide
tags:   [apple, privacy, iOS]
---

### Thoughts I've had after reading the news about Apple's new policies that support "Expanded Protections for Children".

Last night I read an article on [Ars Technica](https://arstechnica.com/tech-policy/2021/08/apple-explains-how-iphones-will-scan-photos-for-child-sexual-abuse-images/) that explained how Apple will install software onto American iPhones that will scan users phones for child sex images through a hashing technology called **NeuralHash**. I posted a link to the Ars Technica article onto my Instagram story, and asked my friends for their thoughts on the topic. The insightful replies that I received inspired me to do some more research on the topic, and also to categorize my own thoughts with this blog post.

Since I've been an adult, the majority of my electronic products have been purchased from Apple. I've owned almost every iteration of the iPhone, and currently own an Apple Watch, a MacBook Pro, a MacBook Air, AirPods, and an Apple TV. In addition to this, I've championed the iPhone's privacy benefits to my friends and colleagues, with the crux of my arguments relying on Apple's ardent policy of data living *on-device*. As a direct result of this, I wish to be clear up front; if Apple implements this forcefully onto its consumers, **then I will sell all of my Apple products and move my business elsewhere.**

The [Apple Privacy Letter](https://appleprivacyletter.com/) provides a layman's overview of how the proposed software will work:
>"Apple's proposed technology works by continuously monitoring photos saved or shared on the user's iPhone, iPad, or Mac. One system detects if a certain number of objectionable photos is detected in iCloud storage and alerts the authorities. Another notifies a child's parents if iMessage is used to send or receive photos that a machine learning algorithm considers to contain nudity. Because both checks are performed on the user's device, they have the potential to bypass any end-to-end encryption that would otherwise safeguard the user's privacy."

After the news concerning this new feature broke, Apple itself followed through with a [technical explanation.](https://www.apple.com/child-safety/pdf/CSAM_Detection_Technical_Summary.pdf)

The technical explanation of how the software will function is as follows:
>"The hashing technology, called NeuralHash, analyzes an image and converts it to a unique number specific to that image. Only another image that appears nearly identical can produce the same number; for example, images that differ in size or transcoded quality will still have the same NeuralHash value.

In the explanation above, Apple itself uses the term "nearly identical". This is because NeuralHash is based on a *perceptual hashing function*. A perceptual hashing function is a fingerprint of a multimedia file derived from various features from its content. Unlike cryptographic hash functions which rely on the avalanche effect of small changes in input leading to drastic changes in the output, perceptual hashes are "close" to one another if the features are similar.

The reason I make this distinction is because perceptual hashing algorithms are notoriously vulnerable to [adversarial attacks](https://ieeexplore.ieee.org/abstract/document/8294186) [[1]](https://arxiv.org/abs/2011.09473) [[2]](https://towardsdatascience.com/black-box-attacks-on-perceptual-image-hashes-with-gans-cc1be11f277).

Apple, hypocritcally, tries to frame this egregious invasion of privacy in the first section of their **System Overview** by stating:
>"Apple’s method of detecting known CSAM is designed with user privacy in mind. Instead of scanning images in the cloud, the system performs on-device matching using a database of known CSAM image hashes provided by NCMEC and other child-safety organizations. Apple further transforms this database into an unreadable set of hashes, which is securely stored on users’ devices."

The wording of this statement is a direct example of [doublethink](https://en.wikipedia.org/wiki/Doublethink), a term coined by [George Orwell](https://en.wikipedia.org/wiki/George_Orwell) in his increasingly prognistic book [Nineteen Eighty-Four](https://en.wikipedia.org/wiki/George_Orwell). Apple is stating that will focus on consumer privacy by manipulating more of your data than it ever has before. Quite [Orwellian](https://en.wikipedia.org/wiki/Orwellian), indeed.

Truthfully, in effect, Apple is introducing a backdoor that completely thwarts all the goodwill that they've built with their, now obvious, PR-framed privacy commercials [[1]](https://www.youtube.com/watch?v=gVtjp6JXWa4) [[2]](https://www.youtube.com/watch?v=FbRUQRmvC4U). 

I understand the need to reduce the amount of child abuse and child sex images that are shared online. I agree that we, as a society, *should*. I don't agree, however, with the forfeiture of one's own privacy to do so; especially when it's coming from a company that holds privacy as [a fundamental human right.](https://www.apple.com/privacy/)

I urge others to get and stay informed on this topic, and any other that threatens digital privacy. A good resource is the [Electronic Frontier Foundation](https://www.eff.org/), which characterizes itself as the leading nonprofit defending digital privacy, free speech, and innovation.

You can [sign an open letter](https://appleprivacyletter.com/) (I did) that protests against Apple's development and forceful implementation of this feature onto the consumers of its devices. The general mission statement of the letter is as follows:
>**Our Request**

>We, the undersigned, ask that:

>>1. Apple Inc.'s' deployment of its proposed content monitoring technology is halted immediately.\
>>2. Apple Inc. issue a statement reaffirming their commitment to end-to-end encryption and to user privacy.

>Apple's current path threatens to undermine decades of work by technologists, academics and policy advocates towards strong privacy-preserving measures being the norm across a majority of consumer electronic devices and use cases. We ask that Apple reconsider its technology rollout, lest it undo that important work. 

You can find out how to sign the letter in the link provided above, or directly [sign the letter via GitHub.](https://github.com/nadimkobeissi/appleprivacyletter/issues/new?assignees=nadimkobeissi&labels=signature&template=sign-letter.yml&title=%5BSIGN%5D+Your+Name+Here)
